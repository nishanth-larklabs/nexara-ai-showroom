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
    <section id="booking" className="section-container relative z-10 py-24">
      <div className="max-w-4xl mx-auto glass border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        {/* Subtle background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Context panel */}
        <div className="w-full md:w-5/12 bg-black/40 p-10 md:p-12 flex flex-col justify-between relative border-r border-white/5">
          <div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Book your Test Drive
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Feel the surge of instant torque, experience the comfort of the
              Lounge cabin, and let our ADAS level 2 guide your journey.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-muted-foreground group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                <CarIcon size={18} />
              </div>
              <span className="text-sm font-medium">
                Choose from 6 distinct models
              </span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                <MapPin size={18} />
              </div>
              <span className="text-sm font-medium">
                Available in 10 major cities across India
              </span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                <Calendar size={18} />
              </div>
              <span className="text-sm font-medium">
                Flexible slots based on your schedule
              </span>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="w-full md:w-7/12 p-10 md:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-black/60 backdrop-blur-md z-20"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 border border-green-500/30 flex items-center justify-center mb-6">
                  <CheckIcon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Request Received
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm text-balance">
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
                className="flex flex-col gap-6"
                aria-label="Test drive booking form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="fullName"
                      className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      placeholder="John Doe"
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/30"
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
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/30"
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      {...register("phone", { required: "Phone is required" })}
                    />
                    {errors.phone && (
                      <span
                        id="phone-error"
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/30"
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
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="model"
                      className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
                    >
                      Select Model
                    </label>
                    <select
                      id="model"
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                      aria-invalid={errors.model ? "true" : "false"}
                      aria-describedby={
                        errors.model ? "model-error" : undefined
                      }
                      {...register("model", { required: "Model is required" })}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-background text-muted-foreground"
                      >
                        Select a vehicle...
                      </option>
                      {cars.map((c) => (
                        <option
                          key={c.id}
                          value={c.id}
                          className="bg-background"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.model && (
                      <span
                        id="model-error"
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.model.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="city"
                      className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                      aria-invalid={errors.city ? "true" : "false"}
                      aria-describedby={errors.city ? "city-error" : undefined}
                      {...register("city", { required: "City is required" })}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-background text-muted-foreground"
                      >
                        Select your city...
                      </option>
                      {testDriveCities.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="bg-background"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <span
                        id="city-error"
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <label
                    htmlFor="date"
                    className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer inline-block appearance-none min-h-12"
                    aria-invalid={errors.date ? "true" : "false"}
                    aria-describedby={errors.date ? "date-error" : undefined}
                    {...register("date", { required: "Date is required" })}
                    style={{ colorScheme: "dark" }}
                  />
                  {errors.date && (
                    <span id="date-error" className="text-red-400 text-xs mt-1">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
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
      strokeWidth={2}
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
