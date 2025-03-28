# Predictive Internal Frontend

This is the frontend application for Predictive Internal, a platform for fund managers to manage their investments and limited partners.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── AppCard.tsx
│   ├── DashboardLayout.tsx
│   ├── DashboardNavigation.tsx
│   ├── DocumentCard.tsx
│   ├── FundListCard.tsx
│   ├── FundManagerLayout.tsx
│   ├── FundManagerNavigation.tsx
│   ├── InvestmentCard.tsx
│   ├── LimitedPartnerListCard.tsx
│   ├── Navigation.tsx
│   ├── UpdateListCard.tsx
│   └── UploadDocumentModal.tsx
│
├── pages/             # Page components
│   ├── fundManagers/  # Fund manager specific pages
│   │   ├── AddFundView.tsx
│   │   ├── AddLimitedPartnerView.tsx
│   │   ├── DocumentsListView.tsx
│   │   ├── FundManagerPage.tsx
│   │   ├── FundUpdatesListView.tsx
│   │   ├── FundsListView.tsx
│   │   ├── IndividualFundView.tsx
│   │   ├── IndividualLPView.tsx
│   │   ├── InvestmentView.tsx
│   │   ├── InvestmentsListView.tsx
│   │   ├── LimitedPartnersListView.tsx
│   │   └── NewInvestment.tsx
│   │
│   ├── AppsDashboard.tsx
│   ├── Home.tsx
│   ├── LoginPage.tsx
│   └── SettingsPage.tsx
│
├── services/          # API and service integrations
│   └── api.ts
│
├── utils/            # Utility functions and helpers
│   ├── constants.ts
│   ├── dateUtils.ts
│   ├── formUtils.ts
│   ├── investmentUtils.ts
│   ├── uiUtils.ts
│   └── validationUtils.ts
│
├── types.ts          # TypeScript type definitions
├── App.tsx           # Main application component
└── index.tsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/predictive-internal.git
cd predictive-internal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:3001
```

### Development

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Testing

To run the test suite:

```bash
npm test
```

### Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Organization

### Components

The `components` directory contains reusable UI components that are used across different pages. Each component is self-contained and follows a consistent pattern:

- Functional components using TypeScript
- Props interface definitions
- Styled using Material-UI components
- Error handling and loading states

### Pages

The `pages` directory contains the main page components that represent different routes in the application. The `fundManagers` subdirectory contains all pages specific to fund manager functionality.

### Utils

The `utils` directory contains various utility functions:

- `formUtils.ts` - Form handling and validation
- `dateUtils.ts` - Date formatting and manipulation
- `investmentUtils.ts` - Investment-specific calculations
- `uiUtils.ts` - UI-related helper functions
- `validationUtils.ts` - Form validation utilities

### Services

The `services` directory contains API integration code and other external service connections. The main `api.ts` file handles all API calls to the backend.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.
