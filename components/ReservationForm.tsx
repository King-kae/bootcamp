"use client";

import { useForm, Controller } from "react-hook-form";
import type { Option } from "@/libs/apiCalls";
import axios from "axios";
import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";
import Image from "next/image";
import Icon from "@/public/Icon.png";
import { useRouter } from "next/navigation";

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
  const [showModal, setShowModal] = useState(false);
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
    try {
      await axios.post("/api/users/confirm", { userId, ref: reference });
      setShowModal(true);
      reset();
    } catch (err) {
      console.error(err);
      alert("Payment verification failed. Please contact support.");
    }
  }

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     const [tierName, amountStr] = data.tier.split("|");
  //     const amount = Number(amountStr);

  //     const response = await axios.post("/api/users", {
  //       name: `${data.firstName} ${data.lastName}`,
  //       email: data.email,
  //       phone: data.phone,
  //       location: data.location,
  //       tier: tierName,
  //       amount,
  //       paid: false,
  //     });

  //     const userId = response?.data?._id || response?.data?.id;

  //     const paystack =
  //       (typeof window !== "undefined" && (window as any).PaystackPop) || null;

  //     if (paystack && PAYSTACK_PUBLIC_KEY) {
  //       const handler = paystack.setup({
  //         key: PAYSTACK_PUBLIC_KEY!,
  //         email: data.email,
  //         amount: amount * 100,
  //         currency: "NGN",
  //         ref: `LA-BC-${Date.now()}`,
  //         callback: async (response: any) => {
  //           try {
  //             await axios.post("/api/users/confirm", {
  //               userId,
  //               ref: response.reference,
  //             });
  //             setShowModal(true);
  //             reset();
  //           } catch (err) {
  //             console.error(err);
  //             alert("Payment verification failed, please contact support.");
  //           }
  //         },
  //         onClose: () => {
  //           console.log("Paystack modal closed");
  //         },
  //       });

  //       handler.openIframe();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };

  return (
    <div className="mt-10 md:w-[85%] w-full bg-[#FFFFFF80] mx-auto rounded-3xl border border-gray-200 p-6">
      <SuccessModal
        isOpen={showModal}
        onClose={() => {
          router.push("/");
          setShowModal(false);
        }}
      />
      <form
        className="mt-8 grid gap-6"
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
              className="h-12 w-full rounded-xl border border-gray-200 px-3"
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
              className="h-12 w-full rounded-xl border border-gray-200 px-3"
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
              className="h-12 w-full rounded-xl border border-gray-200 px-3"
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
              className="h-12 w-full rounded-xl border border-gray-200 px-3"
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
                className="h-12 w-full  text-[#363636] rounded-xl border border-gray-200 px-3"
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
        <div>
          <label className="block text-[#363636] text-sm font-medium mb-2">
            Select a tier
          </label>
          <Controller
            control={control}
            name="tier"
            rules={{ required: "Please select a tier" }}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option) => {
                  const val = `${option.name}|${option.amount}`;
                  const isActive = field.value === val;
                  return (
                    <div
                      key={option._id}
                      onClick={() => field.onChange(val)}
                      className={`cursor-pointer rounded-lg flex items-start border p-5 ${
                        isActive
                          ? "border-black bg-[#9097C01A] text-[#363636]"
                          : "border-gray-200"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-xl font-bold mt-1">
                          ₦{Number(option.amount).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {option.name === "Early Bird"
                            ? "Commit early and save 40%"
                            : "Get full access at the standard rate"}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {option.available ? "" : "Sold out"}
                        </p>
                      </div>
                      {isActive && (
                        <div className="ml-auto flex items-end justify-start">
                          <Image
                            src={Icon}
                            alt="Selected"
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          />
          {errors.tier && (
            <p className="mt-1 text-sm text-red-600">{errors.tier.message}</p>
          )}
        </div>

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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing…" : "Reserve and pay"}
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
