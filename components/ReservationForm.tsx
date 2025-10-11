"use client";

import { useForm, Controller, UseFormSetValue } from "react-hook-form";
import type { Option } from "@/libs/apiCalls";
import axios from "axios";
import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";
import FailedModal from "./FailedModal";
import { useRouter } from "next/navigation";
import TierSelection from "./TierSelection";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  tier: string;
  agree: boolean;
};


const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY;

function ReservationForm({ options }: { options: Option[] }) {
  const [showModal, setShowModal] = useState<"success" | "failed" | null>(null);
  const [verify, setVerify] = useState(false);
  const router = useRouter();

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
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const [tierName, amountStr] = data.tier.split("|");
      const amount = Number(amountStr);

      const response = await axios.post("/api/users", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        location: data.location,
        tier: tierName,
        amount,
        paid: false,
      });

      const userId = response?.data?._id || response?.data?.id;

      // ✅ Ensure Paystack is available
      const paystack = (window as any)?.PaystackPop;
      if (!paystack) {
        alert("Payment system not loaded. Please refresh and try again.");
        return;
      }

      if (PAYSTACK_PUBLIC_KEY) {
        const handler = paystack.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: data.email,
          amount: amount * 100,
          currency: "NGN",
          ref: `LA-BC-${Date.now()}`,

          // ✅ use plain function, not async
          callback: function (response: any) {
            verifyPayment(userId, response.reference);
            sendConfirmationEmail(data.email, data.firstName);
          },

          onClose: function () {
            console.log("Paystack modal closed");
          },
        });

        handler.openIframe();
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  // ✅ Separate async handler for payment verification
  async function verifyPayment(userId: string, reference: string) {
    setVerify(true);
    try {
      await axios.post("/api/users/confirm", { userId, ref: reference });
      setShowModal("success");
      reset();
    } catch (err) {
      console.error(err);
      setShowModal("failed");
    }
    setVerify(false);
  }

  async function sendConfirmationEmail(email: string, name: string) {
    try {
      await axios.post("/api/send-email", {
        to: email,
        subject: "Payment Confirmation",
        name,
      });
    } catch (err) {
      console.error("Error sending confirmation email:", err);
    }
  }

  return (
    <div className="mt-10 md:max-w-[60rem] w-full bg-[#FFFFFF80] mx-auto rounded-3xl border border-gray-200 md:px-20 px-4 pt-8 pb-16">
      <SuccessModal
        isOpen={showModal === "success"}
        onClose={() => {
          router.push("/");
          setShowModal(null);
        }}
      />
      <FailedModal
        isOpen={showModal === "failed"}
        onClose={() => {
          router.push("/");
          setShowModal(null);
        }}
      />
      <form
        className="md:mt-8 grid gap-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* First + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#363636] text-sm font-medium mb-1">
              First name
            </label>
            <input
              placeholder="Enter your first name"
              className="h-12 w-full rounded-xl border bg-[#F9FAFB] border-gray-200 px-3"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-[#363636] text-sm font-medium mb-1">
              Last name
            </label>
            <input
              placeholder="Enter your last name"
              className="h-12 w-full rounded-xl border bg-[#F9FAFB] border-gray-200 px-3"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#363636] text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border bg-[#F9FAFB] border-gray-200 px-3"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-[#363636] text-sm font-medium mb-1">
              Phone number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="h-12 w-full rounded-xl border bg-[#F9FAFB] border-gray-200 px-3"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-[#363636] text-sm font-medium mb-1">
            Your location
          </label>
          <Controller
            control={control}
            name="location"
            rules={{ required: "Please select a location" }}
            render={({ field }) => (
              <select
                {...field}
                className="h-12 w-full  text-[#363636] rounded-xl border bg-[#F9FAFB] border-gray-200 px-3"
              >
                <option value="">Select option</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
              </select>
            )}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Tier Selection */}
        <TierSelection control={control} errors={errors} setValue={setValue} />

        {/* Terms */}
        <div className="flex items-start">
          <input
            type="checkbox"
            className="mt-1"
            {...register("agree", { required: "You must agree to continue" })}
          />
          <p className="ml-2 text-sm text-gray-600">
            By submitting, you agree to our Terms and acknowledge our Privacy
            Policy.
          </p>
        </div>
        {errors.agree && (
          <p className="mt-1 text-sm text-red-600">{errors.agree.message}</p>
        )}

        {/* Submit */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl font-medium transition"
          type="submit"
          disabled={isSubmitting || verify}
        >
          {isSubmitting || verify ? "Processing…" : "Reserve and pay"}
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
