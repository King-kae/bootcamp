// components/ReservationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import type { Option } from "@/libs/apiCalls";
import axios from "axios";
import { CONFIG } from "@/app/page";
import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";

type FormData = {
  name: string;
  email: string;
  tier: string; // tier name or id
  amount: number; // actual price
  paid: boolean;
};

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY;

function ReservationForm({ options }: { options: Option[] }) {
  const [showModal, setShowModal] = useState(false);
  // Load Paystack inline script (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!(window as any).PaystackPop) {
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v1/inline.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // 1) Send lead to your CRM (fire-and-forget)
      const [tier, amountStr] = data.tier.split("|");
      const amount = Number(amountStr);
      const response = await axios.post("/api/users", {
        name: data.name,
        email: data.email,
        tier,
        amount,
        paid: false,
      });

      console.log("Saved lead:", response);
      const userId = response?.data?._id || response?.data?.id;
      // 2) Trigger Paystack Inline if key & script are present
      const paystack =
        (typeof window !== "undefined" && (window as any).PaystackPop) || null;
      if (paystack && PAYSTACK_PUBLIC_KEY) {
        const handler = paystack.setup({
          key: PAYSTACK_PUBLIC_KEY!,
          email: data.email,
          amount: amount * 100, // kobo
          currency: "NGN",
          ref: `LA-BC-${Date.now()}`,
          callback: function (response: any) {
            // wrap async logic inside an IIFE
            (async () => {
              try {
                await axios.post("/api/users/confirm", {
                  userId,
                  ref: response.reference,
                });
                setShowModal(true);
                // alert("Payment successful! We'll email next steps.");
                reset(); // clear form
              } catch (err) {
                console.error(err);
                alert(
                  "We received your payment, but verification failed. Please contact support."
                );
              }
            })();
          },
          onClose: function () {
            console.log("Paystack modal closed");
            console.log(handler, "handler");
          },
        });

        handler.openIframe();
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-10 rounded-3xl border border-gray-200 p-6 text-center">
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <h3 className="text-xl font-semibold">Reserve your seat</h3>
      <p className="mt-1 text-slate-600 text-sm">
        We’ll reach out within one business day with next steps.
      </p>

      <form
        className="mt-4 grid gap-3"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Full name */}
        <div>
          <input
            aria-label="Full name"
            placeholder="Full name"
            className="h-12 w-full rounded-xl border border-gray-200 px-3"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-left text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            aria-label="Email address"
            placeholder="Email address"
            className="h-12 w-full rounded-xl border border-gray-200 px-3"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-left text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Tier select */}
        <div>
          <select
            aria-label="Select tier"
            className="h-12 w-full rounded-xl border border-gray-200 px-3"
            {...register("tier", { required: "Please select a tier" })}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select a tier --
            </option>
            {options.map((option) => (
              <option
                key={option._id}
                value={`${option.name}|${option.amount}`}
                disabled={!option.available}
              >
                {option.name} — ₦{Number(option.amount).toLocaleString()}
                {!option.available ? " (Sold out)" : ""}
              </option>
            ))}
          </select>
          {errors.tier && (
            <p className="mt-1 text-left text-sm text-red-600">
              {errors.tier.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          className="bg-[#CCA435] hover:bg-[#E5E5E5] hover:text-[#CCA435] text-white h-12 rounded-xl transition"
          type="submit"
          disabled={isSubmitting}
          aria-live="polite"
        >
          {isSubmitting ? "Processing…" : "Reserve & Pay"}
        </button>
      </form>
      <p className="mt-2 text-xs text-slate-500">
        By submitting, you agree to our Terms and acknowledge our Privacy
        Policy.
      </p>
    </div>
  );
}
export default ReservationForm;
