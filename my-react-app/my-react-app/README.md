# My React App

This project is a simple React application that features an Analytics Dashboard for summarizing spending and a Journal page for entering spending records.

## Features

- **Analytics Dashboard**: 
  - Summarizes spending with options for daily, weekly, and monthly views.
  - Displays data using line and pie charts.

- **Journal Page**: 
  - Allows users to enter spending records with fields for date, category, and amount.
  - Displays a list of entered records.

## Project Structure

```
my-react-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── Chart
│   │   │   ├── LineChart.jsx
│   │   │   └── PieChart.jsx
│   │   └── JournalForm.jsx
│   ├── pages
│   │   ├── AnalyticsDashboard.jsx
│   │   └── Journal.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── assets
│       └── logo.svg
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-react-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server, run:
```
npm run dev
```

Open your browser and go to `http://localhost:3000` to view the application.

## License

This project is licensed under the MIT License.