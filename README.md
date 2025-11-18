# Healthcare Management System (HMS) Frontend

A modern, professional healthcare management system built with React, TypeScript, and Vite.

## Environment Setup

### Required Environment Variables

**IMPORTANT:** You must create `.env.development` and `.env.production` files in the project root before running the application.

#### Step 1: Create Environment Files

Create `.env.development` file:
```env
VITE_BACKEND_URL=http://localhost:8000/api
```

Create `.env.production` file:
```env
VITE_BACKEND_URL=https://api.yourhms.com/api
```

**Note:** Replace the URLs with your actual backend API URLs.

#### Step 2: Setup Process

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment files** (see Step 1 above)

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Features

- 🏥 Professional Healthcare Management Interface
- 🔐 Secure Authentication (Login & Registration)
- 📱 Responsive Design
- 🎨 Modern UI/UX with Tailwind CSS
- ⚡ Fast Performance with Vite
- 🔄 State Management with Redux Toolkit
- 🌐 API Integration with Axios

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- shadcn/ui Components

## Project Structure

```
hmsFrontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── redux/          # Redux store and slices
│   ├── utils/          # Utility functions
│   ├── lib/            # Library configurations
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
└── .env.*             # Environment variables
```

## Security Notes

⚠️ **Important**: Never commit `.env` files to version control. They are already in `.gitignore`.

- Keep API URLs secure
- Use different URLs for development and production
- Monitor API usage

