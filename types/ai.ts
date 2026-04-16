import type { Currency } from './car';

/** Page sections the AI can navigate to */
export type PageSection =
  | 'hero'
  | 'models'
  | 'features'
  | 'comparison'
  | 'pricing'
  | 'booking'
  | 'contact';

/** Mutation types the AI can trigger on the page */
export type MutationType =
  | 'filter_models'
  | 'compare_models'
  | 'prefill_booking'
  | 'highlight_model'
  | 'change_currency'
  | 'show_feature'
  | 'reset';

/** Payload for filter_models mutation */
export interface FilterModelsPayload {
  types?: string[];
  maxPrice?: number;
  minPrice?: number;
  fuelTypes?: string[];
  minSeating?: number;
}

/** Payload for compare_models mutation */
export interface CompareModelsPayload {
  modelIds: string[];
}

/** Payload for prefill_booking mutation */
export interface PrefillBookingPayload {
  modelId?: string;
  city?: string;
  date?: string;
  name?: string;
  phone?: string;
  email?: string;
}

/** Payload for highlight_model mutation */
export interface HighlightModelPayload {
  modelId: string;
  reason?: string;
}

/** Payload for change_currency mutation */
export interface ChangeCurrencyPayload {
  currency: Currency;
}

/** Payload for show_feature mutation */
export interface ShowFeaturePayload {
  featureCategory?: string;
  featureId?: string;
}

/** Union of all mutation payloads */
export type MutationPayload =
  | FilterModelsPayload
  | CompareModelsPayload
  | PrefillBookingPayload
  | HighlightModelPayload
  | ChangeCurrencyPayload
  | ShowFeaturePayload
  | Record<string, never>; // for 'reset'

/** The mutation object returned by the LLM */
export interface AIMutation {
  type: MutationType;
  payload?: MutationPayload;
}

/**
 * Structured response from the Groq LLM.
 * Matches the navigate_and_mutate tool-call schema
 * defined in INSTRUCTIONS.md §3.
 */
export interface AINavigateAndMutate {
  section: PageSection;
  mutation: AIMutation;
  reply: string;
}

/** Role in a chat conversation */
export type ChatRole = 'user' | 'assistant' | 'system';

/** A single message in the chat history */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  /** If assistant, the mutation that was applied */
  mutation?: AIMutation;
  /** If assistant, the section that was scrolled to */
  section?: PageSection;
}

/** State of the AI assistant */
export interface AssistantState {
  isOpen: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  /** Currently active mutation (null = default state) */
  activeMutation: AIMutation | null;
  /** Currently highlighted section */
  activeSection: PageSection | null;
}
