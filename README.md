# NEXARA Motors

A premium, AI-driven fictional electric vehicle dealership landing page. Nexara combines luxury styling with a powerful Agentic UI driven by `llama-3.3-70b-versatile`.

## 🚀 Features

*   **Fictional Data Layer:** 6 meticulously detailed car models with complex specs and feature lists.
*   **Agentic UI (AI):** A persistent chat concierge built with Vercel AI SDK v6 that mutates the UI in real-time (filters models, drives the comparison engine, switches currency, and highlights features).
*   **Glassmorphic Design:** A custom design system reflecting a high-end luxury vehicle brand.
*   **Modern Stack:** Next.js App Router, Tailwind CSS, Motion (Framer Motion), Zustand/Context for global state, and Zod for rigid AI schema validation.

## 🛠 Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Variables:**
    Create a `.env.local` file and add your Groq API key:
    ```env
    GROQ_API_KEY=your_groq_key_here
    ```
3.  **Run Dev Server:**
    ```bash
    npm run dev
    ```

## 🧠 AI Capabilities 

The `AssistantContext` intercepts LLM tool calls to execute 7 unique mutations:
1.  `filter_models`: Dynamically filters car grid by type, fuel, price, and seating.
2.  `compare_models`: Instructs the Comparison section to lock onto two valid car IDs.
3.  `prefill_booking`: AI extracts details to pre-fill the Test Drive form.
4.  `highlight_model`: Highlights a specific recommended car.
5.  `change_currency`: Reactively switches the entire localized pricing UI (USD, EUR, GBP, INR, JPY).
6.  `show_feature`: Switches the active tab in the Features section (e.g., safety, tech).
7.  `reset`: Restores application to default state.
