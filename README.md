
# AI Scripto Website

A premium marketing and product website for AIScripto, built with React, Vite, Tailwind CSS, and a lightweight Express backend for local development and API integration.

## Overview

This repository delivers a polished enterprise website experience focused on:

- AI Agent orchestration and autonomous automation services
- Third-party API integration and enterprise systems connectivity
- Contact and lead capture workflows with email submission support
- Content-rich pages for services, case studies, industries, leadership, and legal compliance

## Key Capabilities

- **AI Voice Chat Widget**: a client-side embedded AI agent experience through `src/components/ChatWidget.jsx`, connecting to an external AI support agent host.
- **Third-party API integration**: client-side service wrappers in `src/utils/service.ts` designed to interact with backend APIs and external system endpoints.
- **Email and contact workflows**: email send support via `sendEmail` and `sendQuote` service functions, intended for integration with a backend mail provider.
- **Modern frontend stack**: React + Vite + Tailwind CSS with modular page and component structure.
- **Production-ready build**: static site generation with a custom `generate:sitemap` script and build pipeline.

## Architecture

### Frontend

- `src/pages/` contains all routed page views
- `src/components/` contains reusable UI elements including the AI chat widget and footer forms
- `src/utils/service.ts` centralizes API requests using Axios
- `vite.config.ts` exposes runtime environment variables for client-side integration

### Backend

- `server.ts` starts an Express server during development and serves `dist` in production
- The server entrypoint is currently configured as middleware for Vite in development, making it a good base for adding API routes and email handlers

## AI Agent Integration

The site includes a voice-enabled AI chatbot widget:

- `src/components/ChatWidget.jsx` embeds an iframe to an external AI agent host
- Configuration is driven by environment variables:
  - `VITE_CHATBOT_ORIGIN`
  - `VITE_CHATBOT_TENANT`
  - `VITE_CHATBOT_TOKEN`
  - `VITE_CHATBOT_WIDTH`
  - `VITE_CHATBOT_HEIGHT`
- This pattern supports secure agent embedding and cross-domain messaging for open/close actions

## Third-Party API & Email Integration

The project is pre-wired to call backend API endpoints through `src/utils/service.ts`:

- `sendEmail(mailData)`
- `sendQuote(quoteData)`
- `InsertBlog(blogs)`
- `getBlogs(page, title)`
- `getBlogById(blogId)`
- `addComments(commentData)`
- `loginUser(email, password)`
- `getUsers()`

To enable backend calls, configure:

- `VITE_API_BASE_URL` — the base URL for API requests

The website is ready to integrate with any server-side mail provider or enterprise API gateway.

## Setup

### Prerequisites

- Node.js 18+
- npm 9+ (or Yarn / pnpm)

### Install dependencies

```bash
npm install
```

### Local development

```bash
npm run dev
```

The development workflow starts the Express server plus Vite middleware and opens the local app.

### Build for production

```bash
npm run build
```

This command also generates the sitemap and creates the optimized static output in `dist`.

### Preview production build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the project root or set env vars in your deployment platform.

Recommended variables:

- `VITE_API_BASE_URL` — backend API URL for contact, quotes, and service integrations
- `VITE_CHATBOT_ORIGIN` — AI agent iframe host
- `VITE_CHATBOT_TENANT` — AI chatbot tenant identifier
- `VITE_CHATBOT_TOKEN` — AI chatbot embed token

## Deployment

This website is deployable to static hosting providers like Vercel or Netlify, and can also be extended with a backend API host for form handling, email delivery, and enterprise integrations.

For server-backed deployments, use the generated `dist` output plus an Express host or serverless function layer to handle `/api/*` endpoints.

## Project Structure

- `src/` — React application source files
- `src/pages/` — page views and route content
- `src/components/` — reusable UI components
- `src/hooks/` — custom React hooks
- `src/utils/` — shared utilities and API service wrappers
- `server.ts` — local development backend entrypoint
- `vite.config.ts` — Vite build and environment configuration

## Notes

- The current implementation focuses on frontend experience and API integration wiring.
- Email sending and data submission require a backend API to be connected to `VITE_API_BASE_URL`.
- AI Agent embedding uses a configurable external origin for secure integration.

## License

Use this repository according to your project licensing requirements.
