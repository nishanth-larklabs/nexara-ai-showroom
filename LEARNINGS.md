# What I Learned Building This Project

This challenge was a huge learning experience for me. Building a normal website is one thing, but making an AI actually "drive" the interface forced me to learn a lot of new concepts. Here are my biggest takeaways:

### 1. Global State Management with Zustand

Before this, passing data between components was always a bit messy for me. Because the AI chat panel sits completely separate from the rest of the website, I needed a way for the AI to change things anywhere on the page instantly. I learned how to use Zustand to create a global "Store." When the AI decides to change the currency or filter the cars, it just updates the Zustand store, and all the React components instantly react to it. It made the code so much cleaner.

### 2. Real AI Integration (Tool Calling)

I realized that connecting an AI to a website isn't just about getting text back. I learned how to use the Vercel AI SDK to force the LLM to use a "tool". Instead of giving me a paragraph of text, I taught the AI to return a strict JSON object with a `type` (like "change_currency") and a `payload`. Learning how to intercept that JSON on the frontend and turn it into actual UI changes was a major "aha" moment for me.

### 3. Preventing AI Hallucinations

This was the hardest part. At one point, I asked the AI to "Compare your flagship model with your cheapest model." The app crashed because the AI just guessed random car names that didn't match my database IDs. I learned the hard way that an LLM is "blind" unless you give it context.

To fix this, I learned how to inject my actual database (the car names, IDs, exact prices, and available features) directly into the AI's System Prompt. Once I gave the AI that "cheat sheet," it stopped guessing and started matching user requests to my exact code variables perfectly. I also learned a lot about strict schema validation using Zod, and how to write defensive code so the app doesn't break if the AI makes a slight typo.

### Resources I Used

To figure all this out, I spent a lot of time reading the official **Vercel AI SDK documentation** (specifically the sections on Tool Calling)
