'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { AIMutation, MutationPayload, PageSection } from '@/types/ai';
import type { Currency } from '@/types/car';

interface AssistantContextType {
  // Global State Values
  targetCurrency: Currency;
  modelFilters: any;
  comparisonSelection: [string, string];
  bookingPrefill: any;
  highlightedModelId: string | null;
  activeFeatureId: string | null;

  // Actions
  dispatchMutation: (mutation: AIMutation) => void;
  setTargetCurrency: (c: Currency) => void;
  setModelFilters: (f: any) => void;
  setComparisonSelection: (s: [string, string]) => void;
  setBookingPrefill: (data: any) => void;
  setHighlightedModelId: (id: string | null) => void;
  setActiveFeatureId: (id: string | null) => void;
}

const defaultContext: AssistantContextType = {
  targetCurrency: 'INR',
  modelFilters: {},
  comparisonSelection: ['zenith', 'volt'],
  bookingPrefill: {},
  highlightedModelId: null,
  activeFeatureId: 'safety', // From data/features.ts
  dispatchMutation: () => {},
  setTargetCurrency: () => {},
  setModelFilters: () => {},
  setComparisonSelection: () => {},
  setBookingPrefill: () => {},
  setHighlightedModelId: () => {},
  setActiveFeatureId: () => {},
};

const AssistantContext = createContext<AssistantContextType>(defaultContext);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [targetCurrency, setTargetCurrency] = useState<Currency>('INR');
  const [modelFilters, setModelFilters] = useState({});
  const [comparisonSelection, setComparisonSelection] = useState<[string, string]>(['zenith', 'volt']);
  const [bookingPrefill, setBookingPrefill] = useState({});
  const [highlightedModelId, setHighlightedModelId] = useState<string | null>(null);
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>('safety');

  const dispatchMutation = useCallback((mutation: AIMutation) => {
    console.log("Dispatching AI Mutation:", mutation);

    if (!mutation.type) return;

    switch (mutation.type) {
      case 'change_currency':
        if (mutation.payload && 'currency' in mutation.payload) {
          setTargetCurrency(mutation.payload.currency as Currency);
        }
        break;

      case 'filter_models':
        if (mutation.payload) {
          setModelFilters(mutation.payload);
        }
        break;

      case 'compare_models':
        if (mutation.payload && 'modelIds' in mutation.payload) {
          const ids = mutation.payload.modelIds as string[];
          if (ids.length >= 2) {
            setComparisonSelection([ids[0], ids[1]]);
          } else if (ids.length === 1) {
            setComparisonSelection([ids[0], comparisonSelection[1]]);
          }
        }
        break;

      case 'prefill_booking':
        if (mutation.payload) {
          setBookingPrefill(mutation.payload);
        }
        break;

      case 'highlight_model':
        if (mutation.payload && 'modelId' in mutation.payload) {
          setHighlightedModelId(mutation.payload.modelId as string);
        }
        break;

      case 'show_feature':
        if (mutation.payload && 'featureId' in mutation.payload) {
          if (mutation.payload.featureId) {
             setActiveFeatureId(mutation.payload.featureId as string);
          }
        }
        break;

      case 'reset':
        setTargetCurrency('INR');
        setModelFilters({});
        setComparisonSelection(['zenith', 'volt']);
        setBookingPrefill({});
        setHighlightedModelId(null);
        setActiveFeatureId('safety');
        break;

      default:
        console.warn('Unhandled mutation type:', mutation.type);
    }
  }, [comparisonSelection]);

  return (
    <AssistantContext.Provider
      value={{
        targetCurrency,
        setTargetCurrency,
        modelFilters,
        setModelFilters,
        comparisonSelection,
        setComparisonSelection,
        bookingPrefill,
        setBookingPrefill,
        highlightedModelId,
        setHighlightedModelId,
        activeFeatureId,
        setActiveFeatureId,
        dispatchMutation,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  return useContext(AssistantContext);
}
