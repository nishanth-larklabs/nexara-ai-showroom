"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { cars } from "@/data/cars";
import { testDriveCities } from "@/data/brand";
import { useAssistantStore } from "@/store/useAssistantStore";
import { Calendar, MapPin, Car as CarIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  model: string;
  date: string;
};

export default function BookingSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const bookingPrefill = useAssistantStore((state) => state.bookingPrefill);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // Respond to AI pushing pre-fill data with normalization
  useEffect(() => {
    if (bookingPrefill && Object.keys(bookingPrefill).length > 0) {
      // Normalize model ID to lowercase (e.g. 'Volt' -> 'volt')
      if (bookingPrefill.modelId) {
        setValue("model", bookingPrefill.modelId.toLowerCase());
      }

      // Normalize city capitalization to match the exact <option> value
      if (bookingPrefill.city) {
        const matchedCity = testDriveCities.find(
          (city) => city.toLowerCase() === bookingPrefill.city.toLowerCase(),
        );
        if (matchedCity) setValue("city", matchedCity);
      }

      if (bookingPrefill.date) setValue("date", bookingPrefill.date);
      if (bookingPrefill.name) setValue("fullName", bookingPrefill.name);
      if (bookingPrefill.phone) setValue("phone", bookingPrefill.phone);
      if (bookingPrefill.email) setValue("email", bookingPrefill.email);
    }
  }, [bookingPrefill, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Test drive booked:", data);
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 5000);
  };

  return (
    <section id="booking" className="py-32 px-6 bg-[#f3f3f3]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden border border-[#e5e5e5]">
        {/* Context panel */}
        <div className="w-full lg:w-5/12 bg-[#1c1b1b] p-12 md:p-16 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
              Book your Test Drive
            </h2>
            <p className="text-[#f3f3f3]/70 mb-16 text-lg leading-relaxed font-medium">
              Feel the surge of instant torque, experience the comfort of the
              Lounge cabin, and let our ADAS level 2 guide your journey.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#1c1b1b]">
                <CarIcon size={24} />
              </div>
              <span className="text-base font-semibold tracking-wide">
                Choose from 6 distinct models
              </span>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#1c1b1b]">
                <MapPin size={24} />
              </div>
              <span className="text-base font-semibold tracking-wide">
                Available in 10 major cities
              </span>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#1c1b1b]">
                <Calendar size={24} />
              </div>
              <span className="text-base font-semibold tracking-wide">
                Flexible slots based on your schedule
              </span>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="w-full lg:w-7/12 p-12 md:p-16 relative bg-white">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-white z-20"
              >
                <div className="w-24 h-24 rounded-full bg-[#f3f3f3] text-[#1c1b1b] flex items-center justify-center mb-8">
                  <CheckIcon className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-heading font-bold text-[#1c1b1b] mb-4 tracking-tight">
                  Request Received
                </h3>
                <p className="text-[#474545] text-lg leading-relaxed max-w-sm font-medium">
                  Your test drive has been requested. Our concierge team will
                  contact you shortly to confirm the appointment.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
                aria-label="Test drive booking form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-bold text-[#474545]"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      placeholder="John Doe"
                      className="bg-[#f3f3f3] rounded-full px-6 py-4 text-[#1c1b1b] font-medium focus:ring-2 focus:ring-[#1c1b1b] outline-none transition-all placeholder:text-[#474545]/50 border-none"
                      aria-invalid={errors.fullName ? "true" : "false"}
                      aria-describedby={
                        errors.fullName ? "fullName-error" : undefined
                      }
                      {...register("fullName", {
                        required: "Name is required",
                      })}
                    />
                    {errors.fullName && (
                      <span
                        id="fullName-error"
                        className="text-red-500 text-sm mt-1 font-semibold ml-4"
                      >
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="phone"
                      className="text-sm font-bold text-[#474545]"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-[#f3f3f3] rounded-full px-6 py-4 text-[#1c1b1b] font-medium focus:ring-2 focus:ring-[#1c1b1b] outline-none transition-all placeholder:text-[#474545]/50 border-none"
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      {...register("phone", { required: "Phone is required" })}
                    />
                    {errors.phone && (
                      <span
                        id="phone-error"
                        className="text-red-500 text-sm mt-1 font-semibold ml-4"
                      >
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-[#474545]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-[#f3f3f3] rounded-full px-6 py-4 text-[#1c1b1b] font-medium focus:ring-2 focus:ring-[#1c1b1b] outline-none transition-all placeholder:text-[#474545]/50 border-none"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span
                      id="email-error"
                      className="text-red-500 text-sm mt-1 font-semibold ml-4"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="model"
                      className="text-sm font-bold text-[#474545]"
                    >
                      Select Model
                    </label>
                    <select
                      id="model"
                      className="bg-[#f3f3f3] rounded-full px-6 py-4 text-[#1c1b1b] font-medium focus:ring-2 focus:ring-[#1c1b1b] outline-none transition-all appearance-none border-none"
                      aria-invalid={errors.model ? "true" : "false"}
                      aria-describedby={
                        errors.model ? "model-error" : undefined
                      }
                      {...register("model", { required: "Model is required" })}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-white text-[#474545]"
                      >
                        Select a vehicle...
                      </option>
                      {cars.map((c) => (
                        <option key={c.id} value={c.id} className="bg-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.model && (
                      <span
                        id="model-error"
                        className="text-red-500 text-sm mt-1 font-semibold ml-4"
                      >
                        {errors.model.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="city"
                      className="text-sm font-bold text-[#474545]"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      className="bg-[#f3f3f3] rounded-full px-6 py-4 text-[#1c1b1b] font-medium focus:ring-2 focus:ring-[#1c1b1b] outline-none transition-all appearance-none border-none"
                      aria-invalid={errors.city ? "true" : "false"}
                      aria-describedby={errors.city ? "city-error" : undefined}
                      {...register("city", { required: "City is required" })}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-white text-[#474545]"
                      >
                        Select your city...
                      </option>
                      {testDriveCities.map((city) => (
                        <option key={city} value={city} className="bg-white">
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <span
                        id="city-error"
                        className="text-red-500 text-sm mt-1 font-semibold ml-4"
                      >
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <label
                    htmlFor="date"
                    className="text-sm font-bold text-[#474545]"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-[#f3f3f3] rounded-full px-6 py-4 text-[#1c1b1b] font-medium focus:ring-2 focus:ring-[#1c1b1b] outline-none transition-all cursor-pointer inline-block appearance-none min-h-12 border-none"
                    aria-invalid={errors.date ? "true" : "false"}
                    aria-describedby={errors.date ? "date-error" : undefined}
                    {...register("date", { required: "Date is required" })}
                  />
                  {errors.date && (
                    <span
                      id="date-error"
                      className="text-red-500 text-sm mt-1 font-semibold ml-4"
                    >
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1c1b1b] text-white py-5 rounded-full font-bold text-lg hover:bg-[#333] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
