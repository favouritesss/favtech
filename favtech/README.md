# FavTech SMM Platform ✨

A premium, full-stack Social Media Marketing (SMM) platform built with top-tier aesthetics, glassmorphism UI, real-time interactions, and scalable backend integrations.

## 🚀 Teck Stack overview
- **Frontend**: React.js 18, Vite, Tailwind CSS, Framer Motion, Lucide React Icons.
- **Backend**: Node.js, Express.js, MySQL.
- **Integrations**: Paystack API (Wallet Funding), Voke API (SMM Orders).
- **Security**: JWT, Bcrypt, Helmet, Rate Limiting.

## 📁 Project Structure

\`\`\`text
favtech/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── layouts/          # AuthLayout and DashboardLayout
│   │   ├── pages/            # DashboardHome, NewOrder, Login, Register
│   │   ├── App.jsx           # Routing & Dark Mode logic
│   │   ├── index.css         # Tailwind & Glassmorphism theme configs
│   │   └── main.jsx          # Entry point
│   ├── tailwind.config.js    # Theme customizing (Navy, Teal, Typography)
│   └── package.json
│
└── backend/                  # Node.js + Express API
    ├── server.js             # Core Server, DB setup, Auth & Order routes
    ├── .env                  # API keys and DB credentials
    └── package.json
\`\`\`

## 🛠️ Step-by-Step Setup Instructions

### 1. Database Setup
You need a running MySQL server. 
1. Open your MySQL client (e.g., PHPMyAdmin or MySQL Workbench).
2. Create a new database named \`favtech\`.
   \`\`\`sql
   CREATE DATABASE favtech;
   \`\`\`

### 2. Backend Initialization
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Verify your \`.env\` file. Ensure the \`DB_USER\` and \`DB_PASSWORD\` match your MySQL credentials.
4. Auto-generate the tables by running the setup endpoint:
   Start the server: \`npm run start\`
   Visit this in your browser simply to create the tables: \`http://localhost:5000/api/setup-db\`
5. Keep the server running!

### 3. Frontend Initialization
1. Open a new terminal and navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   
This will give you a local host URL (typically \`http://localhost:5173\` or similar). Open it in your browser.

## 🌟 Demo Features
- **Design Aesthetic**: Experience the `Deep Navy Blue` and `Seafoam Green` interface directly based on the design tokens. Fluid dark/light mode integration.
- **Live Order System**: The `NewOrder` page actively simulates calculating live pricing and interacting with a mock setup for the Voke API.
- **State-of-the-art UI**: Go from Login straight to Dashboard without page reloads, accompanied by Framer Motion smooth UI translations and `glass-panel` overlays.
- **Security Check**: Implemented JWT authorization check patterns directly at the \`server.js\` structure.

> **Note**: For production, be sure to update the \`.env\` file inside the backend to contain your LIVE Paystack Key and Voke API Key.
