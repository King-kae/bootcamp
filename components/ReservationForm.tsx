// components/ReservationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import type { Option } from "@/libs/apiCalls";
import axios from "axios";
import { CONFIG } from "@/app/page";
import { useState, useEffect } from "react";

type FormData = {
  name: string;
  email: string;
  tier: string; // tier name or id
  amount: number; // actual price
  paid: boolean;
};

export default function ReservationForm({ options }: { options: Option[] }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

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


  const onSubmit = async (data: FormData) => {
    try {
      const [tier, amountStr] = data.tier.split("|");
      const amount = Number(amountStr);

      // save lead (unpaid by default)
      const response = await axios.post("/api/users", {
        name: data.name,
        email: data.email,
        tier,
        amount,
        cohort: CONFIG.cohortDates,
        paid: false,
      });

      console.log("Saved lead:", response);

      // ✅ Get PaystackPop object safely
      const paystack = (window as any).PaystackPop;
      if (!paystack) {
        alert("Paystack SDK not loaded. Please refresh and try again.");
        return;
      }

      // ✅ Initialize Paystack popup only on button click
      const handler = paystack.setup({
        key: process.env.TEST_PAYSTACK_PUBLIC_KEY, // pk_test_xxx or pk_live_xxx
        email: data.email,
        amount: amount * 100, // Paystack uses kobo
        currency: "NGN",
        ref: `LA-BC-${Date.now()}`,
        callback: async function (response: any) {
          try {
            // Verify & update payment
            await axios.post("/api/users/confirm", {
              email: data.email,
              ref: response.reference,
            });

            alert("Payment successful! We'll email next steps.");
          } catch (err) {
            console.error(err);
            alert(
              "We received your payment, but verification failed. Please contact support."
            );
          }
        },
        onClose: function () {
          console.log("Paystack modal closed");
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-10 rounded-3xl border border-gray-200 p-6 text-center">
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
