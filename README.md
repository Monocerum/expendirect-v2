# Cashflow Tracker

A responsive personal finance tracking application built with **React** and **JavaScript**. It allows users to manage financial accounts, monitor income and expenses, organize transactions, create budget plans, and track payment activities through an interactive dashboard.

Deployed at Vercel: https://expendirect.vercel.app/

## Features

- **Dashboard** – View an overview of financial activities, account balances, savings, bills, and top expenses.
- **Account Management** – Create, edit, and manage multiple financial accounts.
- **Cashflow Tracking** – Monitor income and expenses across different accounts and time periods.
- **Transaction Management** – Add, edit, delete, and organize financial transactions.
- **Category Management** – Create custom categories, assign colors, and filter transactions.
- **Budget Planning** – Create and manage budget plans to monitor spending and savings goals.
- **Payment Tracking** – Record payments, monitor outstanding balances, and view payment statuses.
- **Data Visualization** – View spending breakdowns and financial summaries through charts.
- **Theme Customization** – Personalize the application using available themes and custom color settings.
- **Settings and Data Management** – Manage application preferences and reset stored data.
- **Responsive Design** – Adapted layouts for desktop, tablet, and mobile screens.

## Technologies Used

- **React** – Component-based frontend development.
- **JavaScript** – Application logic and interactivity.
- **HTML5** – Application structure.
- **CSS3** – Styling, responsive layouts, and theme customization.
- **Vite** – Development server and build tooling.
- **npm** – Package management.

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-folder>
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal. By default, Vite typically uses:

   ```text
   http://localhost:5173
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Installs the required project dependencies. |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Previews the production build locally. |

## Project Structure

```text
├── public/
│   ├── assets/                 # Images, icons, and visual assets
│   ├── fonts/                  # Custom typography
│   ├── favicon.ico
│   ├── manifest.json
│   └── site.webmanifest
│
├── src/
│   ├── components/
│   │   ├── accounts/           # Account cards, forms, and summaries
│   │   ├── budget/             # Budget plan components
│   │   ├── categories/         # Category management components
│   │   ├── charts/             # Financial charts and visualizations
│   │   ├── common/             # Reusable UI components
│   │   ├── home/               # Dashboard cards
│   │   ├── layout/             # Header, navigation, and app layout
│   │   ├── payments/           # Payment and billing components
│   │   ├── settings/           # Settings and theme components
│   │   ├── tracker/            # Cashflow tracking components
│   │   └── transactions/       # Transaction forms and entries
│   │
│   ├── constants/              # Application constants and configurations
│   ├── context/                # React context and store provider
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Application pages
│   ├── store/                  # State management, reducers, and persistence
│   ├── styles/                 # Global, component, and responsive stylesheets
│   ├── theme/                  # Theme definitions and application logic
│   ├── utils/                  # Reusable helper functions
│   │
│   ├── App.css                 # Main application styles
│   ├── App.jsx                 # Root application component
│   ├── App.test.jsx            # Application tests
│   ├── main.jsx                # Application entry point
│   ├── reportWebVitals.js      # Performance reporting
│   └── setupTests.js           # Test configuration
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── jsconfig.json
└── README.md
```

## Application Architecture

The application follows a modular, component-based structure:

- **Components:** Reusable interface elements organized by application feature.
- **Pages:** Individual views for the dashboard, accounts, budget plans, categories, payments, and other sections.
- **Context and Store:** Centralized application state using React Context, reducers, and state-related actions.
- **Hooks:** Custom hooks for accessing application state and managing themes.
- **Utilities:** Shared functions for financial calculations, date handling, formatting, and transaction operations.
- **Themes:** Theme configurations and customization logic.
- **Styles:** Separate stylesheets for application components, layouts, themes, and responsive behavior.

## Development

The application uses Vite for its development environment, providing Hot Module Replacement (HMR) for a faster development workflow.

Changes to the source files are automatically reflected in the browser while the development server is running.

---

**Project Type:** Personal Project  
**Frontend:** React, JavaScript, CSS3  
**Build Tool:** Vite
