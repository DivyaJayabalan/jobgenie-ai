JobGenie AI – Smart Job Matching Platform
🧠 Architecture Overview
User → React Frontend
        ↓
   Node.js + Fastify Backend
        ↓
 LangChain Job Matching Engine
        ↓
 LangGraph AI Assistant Controller

⚙️ Setup Instructions
Prerequisites

Node.js 18+

npm

OpenAI API key

Local Setup
git clone <repo>
cd client
npm install
npm start

Backend
cd server
npm install
node index.js

🔗 LangChain Usage (Job Matching)

LangChain is used to:

Extract resume text

Compare with job skills

Generate similarity score (0–100%)

Provide explanation of matching skills

Prompt design focuses on:

Skill overlap

Keyword alignment

Experience relevance

🧩 LangGraph Usage (AI Assistant)

LangGraph controls:

Node	Function
Intent Detection	Understand user query
Filter Update	Modify UI filters
Search Tool	Find matching jobs
Response Node	Return structured answer

LangGraph maintains conversation state and routes actions dynamically.

📊 AI Matching Logic

Score calculation based on:

Skill match ratio

Keyword similarity

Experience relevance

Why it works:

Focuses on core job skills

Reduces noise

Fast performance for 100+ jobs

💬 Popup Flow Design

When user clicks Apply:

Job link opens in new tab

When user returns → popup asks
“Did you complete the application?”

Edge cases handled:

Tab closed early

Multiple applications

User abandons process

🤖 AI Assistant UI Choice

Chosen: Floating chat bubble

Reason:

Non-intrusive

Always accessible

Modern UX pattern

📈 Scalability
Scenario	Handling
100+ Jobs	Efficient scoring & filtering
10k Users	Stateless API design
AI calls	Async + rate control
⚖️ Tradeoffs
Limitation           ---Future Improvement
In-memory storage    ---Move to DB
Simple skill match   ---Semantic embedding
Basic filters        ---Advanced search engine
