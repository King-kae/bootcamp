"use client";

import React, { useEffect, useState } from "react";
import {
  Controller,
  UseFormSetValue,
  Control,
  FieldErrors,
} from "react-hook-form";
import Image from "next/image";
import star from "@/public/stars-svgrepo-com 1.png";
import money from "@/public/Frame 1984078246.png";
import axios from "axios";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  tier: string;
  agree: boolean;
};

interface TierSelectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
}

/** Use UTC date parts so timezone offsets don't shift the calendar day. */
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const parseSettingsFromResponse = (resData: any) => {
  // Support multiple response shapes:
  // 1) { success: true, data: { offerDays, startDate } }
  // 2) { success: true, options: [ { offerDays, startDate } ] }
  // 3) direct doc { _id, offerDays, startDate }
  if (!resData) return null;
  if (resData.data) return resData.data;
  if (Array.isArray(resData.options) && resData.options.length > 0)
    return resData.options[0];
  // fallback: maybe resData is the doc itself
  if (resData.offerDays || resData.startDate) return resData;
  return null;
};

const getOfferStatus = (offerDays: number, offerStartDate: Date | string | null) => {
  if (!offerDays || !offerStartDate) {
    return { isEarlyBirdActive: false, remainingDays: 0, offerEndDate: null };
  }

  // Ensure we have a Date object
  const src =
    typeof offerStartDate === "string" ? new Date(offerStartDate) : new Date(offerStartDate);

  // Build start as a UTC midnight (use UTC parts to avoid timezone shifts)
  const startUTC = new Date(
    Date.UTC(src.getUTCFullYear(), src.getUTCMonth(), src.getUTCDate())
  );

  // End (inclusive) is start + offerDays - 1
  const endUTC = new Date(startUTC);
  endUTC.setUTCDate(startUTC.getUTCDate() + (offerDays - 1));

  // Today's UTC-midnight
  const now = new Date();
  const todayUTCmidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  const isEarlyBirdActive = todayUTCmidnight <= endUTC;

  const remainingDays = isEarlyBirdActive
    ? Math.floor((endUTC.getTime() - todayUTCmidnight.getTime()) / MS_PER_DAY) + 1
    : 0;

  return { isEarlyBirdActive, remainingDays, offerEndDate: endUTC };
};

const TierSelection = ({ control, errors, setValue }: TierSelectionProps) => {
  const [offerDays, setOfferDays] = useState<number | null>(null);
  const [offerStartDate, setOfferStartDate] = useState<Date | null>(null);
  const [isEarlyBirdActive, setIsEarlyBirdActive] = useState(false);
  const [remainingDays, setRemainingDays] = useState(0);
  const [defaultValue, setDefaultValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch admin settings (robust handling for different response shapes)
  useEffect(() => {
    const fetchAdminSettings = async () => {
      setLoading(true);
      try {
        // <-- Make sure this matches your app router path:
        const res = await axios.get("/api/offer-settings");
        const settings = parseSettingsFromResponse(res.data);

        console.log("RAW API response:", res.data);
        console.log("Parsed settings:", settings);

        if (settings?.offerDays != null) setOfferDays(Number(settings.offerDays));
        if (settings?.startDate) setOfferStartDate(new Date(settings.startDate));
      } catch (err) {
        console.warn("Failed to fetch offer settings, using defaults", err);
        // sensible fallback (start = 1st of current month)
        setOfferDays(10);
        setOfferStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
      } finally {
        setLoading(false);
      }
    };
    fetchAdminSettings();
  }, []);

  // Compute offer status AFTER we have the API values
  useEffect(() => {
    if (offerDays == null || offerStartDate == null) return;

    const { isEarlyBirdActive, remainingDays, offerEndDate } = getOfferStatus(
      offerDays,
      offerStartDate
    );

    // debug log - copy-paste in your console if you still see unexpected values
    console.log({
      offerDays,
      offerStartDate: offerStartDate?.toISOString?.() ?? offerStartDate,
      offerEndDate: offerEndDate?.toISOString?.() ?? offerEndDate,
      isEarlyBirdActive,
      remainingDays,
    });

    setIsEarlyBirdActive(isEarlyBirdActive);
    setRemainingDays(remainingDays);

    // recompute daily at UTC midnight (or every hour if you prefer)
    const timer = setInterval(() => {
      const s = getOfferStatus(offerDays!, offerStartDate!);
      setIsEarlyBirdActive(s.isEarlyBirdActive);
      setRemainingDays(s.remainingDays);
    }, 1000 * 60 * 60); // every hour is safer during testing

    return () => clearInterval(timer);
  }, [offerDays, offerStartDate]);

  // Auto-select tier after we have computed status
  useEffect(() => {
    if (loading || (offerDays == null && offerStartDate == null)) return;

    const availableTier = isEarlyBirdActive ? { name: "Early Bird", amount: 150000 } : { name: "Premium", amount: 250000 };
    const preselect = `${availableTier.name}|${availableTier.amount}`;
    setDefaultValue(preselect);
    setValue("tier", preselect);
  }, [loading, isEarlyBirdActive, setValue, offerDays, offerStartDate]);

  if (loading) {
    return (
      <div className="p-4 border border-gray-200 rounded-xl text-gray-500 text-center">
        Loading offer details…
      </div>
    );
  }

  const trial = { amount: 250000 };

  return (
    <div>
      <Controller
        control={control}
        name="tier"
        rules={{ required: "Please select a tier" }}
        defaultValue={defaultValue}
        render={() => (
          <div className="space-y-4 p-4 flex justify-between gap-2 border border-gray-200 rounded-xl">
            <div>
              {isEarlyBirdActive ? (
                <div className="flex md:flex-row flex-col gap-4">
                  <p className="font-semibold text-lg">Early Bird Offer</p>
                  <div className="flex flex-col items-start justify-center gap-4">
                    <div className="flex items-center gap-4">
                      <p className="line-through text-[#ADADAE] text-3xl font-bold">
                        ₦{trial.amount.toLocaleString()}
                      </p>
                      <p className="text-3xl font-bold">₦150,000</p>
                      <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        40% off
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Image width={20} height={20} src={star} alt="Star" />
                      <p className="text-sm text-gray-700">
                        Save ₦100,000 when you register early. Offer ends in{" "}
                        <strong>{remainingDays}</strong> day{remainingDays !== 1 ? "s" : ""}.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-semibold text-lg">Premium Offer</p>
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex md:flex-row flex-col items-start gap-2">
                      <p className="text-3xl font-bold text-gray-800">
                        ₦{trial.amount.toLocaleString()}
                      </p>
                      <p className="inline-block self-center bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        Early bird offer has ended
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Image width={20} height={20} src={star} alt="Star" />
                      <p className="text-sm text-gray-700">
                        Get full access at the standard rate.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="-mr-4 -mt-4 hidden md:block">
              <Image height={124} width={178} src={money} alt="money" />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default TierSelection;
