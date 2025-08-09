# Leave Management System

A React.js web application for managing employee leave requests with calendar integration.

## Features

1. **Calendar UI** - Interactive calendar showing leave dates
2. **Two User Types**:
   - **Resource**: Can apply for leave
   - **Lead**: Can approve/reject leave requests
3. **Leave Types**:
   - Casual Leave
   - Sick Leave
   - Planned Leave
4. **Leave Management**:
   - Apply for leave with date range and reason
   - Approve or reject leave requests (Lead only)
   - View all leave requests with status

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Switch User Types**: Use the "Switch to Lead/Resource" button to toggle between user roles
2. **Apply Leave** (Resource only): Click "Apply Leave" button, fill the form with leave type, dates, and reason
3. **Approve/Reject** (Lead only): View pending leave requests and use Approve/Reject buttons
4. **Calendar View**: Leave dates are highlighted in yellow on the calendar

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Styling
└── index.js        # Entry point
```

## Dependencies

- React 18.2.0
- react-calendar 4.6.0
- date-fns 2.30.0