import { create } from "zustand";
import type { AIMutation } from "@/types/ai";
import type { Currency } from "@/types/car";
import { carMap } from "@/data/cars";

interface AssistantState {
  targetCurrency: Currency;
  modelFilters: any;
  comparisonSelection: [string, string];
  bookingPrefill: any;
  highlightedModelId: string | null;
  activeFeatureId: string | null;

  // Actions
  setTargetCurrency: (c: Currency) => void;
  setModelFilters: (f: any) => void;
  setComparisonSelection: (s: [string, string]) => void;
  setBookingPrefill: (data: any) => void;
  setHighlightedModelId: (id: string | null) => void;
  setActiveFeatureId: (id: string | null) => void;
  dispatchMutation: (mutation: AIMutation) => void;
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  targetCurrency: "INR",
  modelFilters: {},
  comparisonSelection: ["zenith", "volt"],
  bookingPrefill: {},
  highlightedModelId: null,
  activeFeatureId: "safety",

  setTargetCurrency: (c) => set({ targetCurrency: c }),
  setModelFilters: (f) => set({ modelFilters: f }),
  setComparisonSelection: (s) => set({ comparisonSelection: s }),
  setBookingPrefill: (data) => set({ bookingPrefill: data }),
  setHighlightedModelId: (id) => set({ highlightedModelId: id }),
  setActiveFeatureId: (id) => set({ activeFeatureId: id }),

  dispatchMutation: (mutation: AIMutation) => {
    if (!mutation.type) return;

    switch (mutation.type) {
      case "change_currency":
        if (mutation.payload && "currency" in mutation.payload) {
          set({ targetCurrency: mutation.payload.currency as Currency });
        }
        break;
      case "filter_models":
        if (mutation.payload) set({ modelFilters: mutation.payload });
        break;
      case "compare_models":
        if (mutation.payload && "modelIds" in mutation.payload) {
          const ids = mutation.payload.modelIds as string[];
          if (ids.length >= 2) {
            const idA = ids[0].toLowerCase();
            const idB = ids[1].toLowerCase();

            set((state) => ({
              comparisonSelection: [
                carMap.has(idA) ? idA : state.comparisonSelection[0],
                carMap.has(idB) ? idB : state.comparisonSelection[1],
              ],
            }));
          }
        }
        break;
      case "prefill_booking":
        if (mutation.payload) set({ bookingPrefill: mutation.payload });
        break;
      case "highlight_model":
        if (mutation.payload && "modelId" in mutation.payload) {
          set({ highlightedModelId: mutation.payload.modelId as string });
        }
        break;
      case "show_feature":
        if (mutation.payload && "featureId" in mutation.payload) {
          set({ activeFeatureId: mutation.payload.featureId as string });
        }
        break;
      case "reset":
        set({
          targetCurrency: "INR",
          modelFilters: {},
          comparisonSelection: ["zenith", "volt"],
          bookingPrefill: {},
          highlightedModelId: null,
          activeFeatureId: "safety",
        });
        break;
    }
  },
}));
