# Streamify Analytics Dashboard

## Project Overview

Streamify Analytics Dashboard is a frontend application that displays key metrics and data visualizations for a fictional music streaming service called "Streamify". The dashboard provides insights into user activity, revenue, and content performance, allowing the service's management team to make data-driven decisions.

## Features

1. Key Metrics Display
   - Total Users
   - Active Users
   - Total Streams
   - Revenue
   - Top Artist

2. Data Visualizations
   - User Growth Chart
   - Revenue Distribution Chart
   - Top 5 Streamed Songs Chart

3. Interactive Streams Data Table
   - Sortable columns
   - Filtering by song name and artist
   - Load-more functionality with infinite scrolling

## Technology Stack

- React.js
- Tailwind CSS for styling
- Recharts for data visualization

## Installation and Setup

To install and run this application locally, follow these steps:


2. Clone the repository:
   ```
   git clone https://github.com/varun442/my-app.git
   cd my-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

The application should now be running locally on your machine.


## Project Structure

```
src/
  components/
    KeyMetrics.js
    UserGrowthChart.js
    RevenueDistributionChart.js
    TopStreamedSongsChart.js
    StreamsDataTable.js
    Navbar.js
  context/
    DashboardContext.js
  data/
    mockData.js
  pages/
    Dashboard.js
  App.js
  index.js
```

## Thought Process

1. Project Setup:
   - Started by setting up a new React project with Create React App and configuring Tailwind CSS for styling.

2. Component Development:
   - Developed individual components for each section of the dashboard (KeyMetrics, Charts, DataTable).
   - Each component was designed to be reusable.

3. State Management:
   - Implemented a DashboardContext to manage and distribute data across components.
   - This approach allows for easy data sharing without prop drilling.

4. Data Visualization:
   - Used Recharts library for creating interactive and responsive charts.

5. Streams Data Table:
   - Initially, implemented a simple table with pagination.
   - Later, eveolved it to use a custom infinite scroll implementation with a load-more functionality for better performance and user experience.

7. Performance Optimization:
   - Also, implemented memoization techniques (useMemo) to optimize rendering performance, especially for data processing in the StreamsDataTable component.

## Trade-offs and Decisions

1. Mock Data 
   - Used npm faker to generate fake data

2. Context API vs. Redux:
   - Used React's Context API for state management due to its simplicity and sufficiency for this project's scope but for larger applications, Redux might offer more robust state management features.

3. Chart Library Choice:
   - Chose Recharts for its ease of use and good integration with React.


## Submission Guidelines

This project has been submitted according to the following guidelines:

1. Code Repository:
   - The code is hosted on GitHub at: [https://github.com/varun442/my-app](https://github.com/varun442/my-app)

2. Local Deployment:
   - The application can be deployed locally using the following simple commands:
     ```
     npm install
     npm start
     ```
   - These commands will install all necessary dependencies and start the development server.
3. Vercel Deployement:
    - Find the deployement at: [https://speedy-brand-assignment-mu.vercel.app/](https://speedy-brand-assignment-mu.vercel.app/) 
