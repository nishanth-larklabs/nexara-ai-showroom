# DriveAI — NEXARA Motors

NEXARA Motors is a fictional premium electric vehicle dealership featuring an AI assistant that actually controls the website. Instead of just chatting, the AI navigates the page, filters cars, updates pricing, and pre-fills forms based on what you ask it.

## Setup Instructions

If you want to run this project locally, follow these steps:

1. Clone this repository.
2. Open your terminal and run `npm install` to install all dependencies.
3. Create a `.env.local` file in the root folder.
4. Add your Groq API key to the file like this: `GROQ_API_KEY=your_key_here`
5. Run `npm run dev` and open `http://localhost:3000` in your browser.

## Tech Stack & Why I Chose It

- **Next.js & React:** Used for the core framework. It makes building single-page scrolling applications really smooth.
- **Tailwind CSS & Framer Motion:** Used for styling and animations. Framer Motion is great for smoothly re-arranging the car grid when the AI filters it.
- **Zustand:** Picked for global state management. Because the AI chat panel needs to talk to completely different sections of the page (like the Pricing section or the Models grid), Zustand allowed me to update the UI instantly without messy prop-drilling.
- **Vercel AI SDK & Groq (Llama 3):** Used for the AI integration. Groq is incredibly fast, which makes the AI feel like a snappy, real-time website controller rather than a slow chatbot.

## What the AI Can Do

The assistant handles 6 distinct types of queries. Here are examples you can try:

1. **Filter Models:** "Show me SUVs under 35 lakhs" or "I need a 7-seater."
2. **Compare Cars:** "Compare the Volt and the Titan side by side."
3. **Pre-fill Booking:** "I want to book a test drive for the Zenith in Bangalore next Monday. My name is Alex and my number is 9876543210."
4. **Highlight Cars:** "What is your absolute cheapest car?"
5. **Change Currency:** "Show me all the prices in US Dollars."
6. **Show Features:** "Tell me about your safety features and cameras."

_(You can also ask it to "clear filters" to reset the page!)_

## What I Would Build Next

If I had another week, I would build a voice system.
