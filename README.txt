MUBI AI ULTRA - BACKEND STARTER

WHAT THIS DOES
- GET /api/health : confirms that the backend server is online.
- POST /api/chat : forwards chat messages to an OpenAI-compatible AI endpoint.
- POST /api/health-info : returns a health education disclaimer, not a diagnosis.

IMPORTANT
This is a backend starter, not a deployed public URL and not a working AI provider subscription.
The chat endpoint needs a provider that you are eligible to use, plus its base URL, API key,
and model name. Put those values privately in your hosting provider's Environment settings.
Never put API keys in the HTML file, GitHub repository, or public messages.

DEPLOY ON RENDER
1. Upload the contents of this folder to a GitHub repository (server.js and package.json
   must be in the repository root).
2. In Render, choose New -> Web Service and connect that repository.
3. Runtime: Node
4. Build command: npm install
5. Start command: npm start
6. Create the service. Render will show your real service URL after deployment.
7. Test: https://YOUR-REAL-SERVICE-URL/api/health

The example URL above is a placeholder. Do not paste it as if it were a real URL.

FRONTEND CONNECTION
If the HTML is served by this same Express server, use relative paths such as:
fetch("/api/chat", ...)
If the HTML is hosted separately, replace the frontend API base with your actual Render
service URL, for example: https://YOUR-REAL-SERVICE-URL (replace with the real URL).

HEALTH NOTE
The health route does not check a person's health. The health-info route is general
educational information only and cannot diagnose, test, or assess an individual.
