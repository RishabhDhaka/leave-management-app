# Leave Management System

A comprehensive React.js web application for managing employee leave requests with calendar integration, user authentication, and role-based access control.

## 🚀 Live Demo

[View Live Application](https://rishabhdhaka.github.io/leave-management-app)

## ✨ Features

### 🔐 Authentication System
- **Secure Login**: Email and password authentication
- **Role-based Access**: Separate login for Resources and Leads
- **Session Management**: Logout functionality

### 👥 User Roles

#### **Resources (Employees)**
- Apply for leave with date range and reason
- View personal leave dashboard
- See color-coded calendar (Green: Approved, Red: Rejected, Yellow: Pending)
- View team availability without seeing approval status

#### **Lead (Manager)**
- Approve or reject leave requests
- View all team leave requests with full details
- See application dates and leave durations
- Complete team calendar overview

### 📅 Calendar Integration
- **Interactive Calendar**: Click dates to see who's on leave
- **Color Coding**: Visual status indicators
- **Team Visibility**: See resource availability

### 📊 Dashboard
- **Personal Dashboard**: Resources can track their leave history
- **Statistics**: Count of approved/rejected leaves
- **Leave History**: Detailed view of past requests

### 🎯 Leave Types
- Casual Leave
- Sick Leave
- Planned Leave

## 🔑 Demo Credentials

### Resources:
- **Ayush**: Ayush@pentair.com / Pentair
- **Akshay**: Akshay@pentair.com / Pentair
- **Ashish**: Ashish@pentair.com / Pentair

### Lead:
- **Rishabh Dhaka**: rishabh.dhaka@pentair.com / Password@123

## 🛠️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rishabhdhaka/leave-management-app.git
   cd leave-management-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

This app is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── App.js          # Main application component with routing
├── App.css         # Complete styling and responsive design
├── index.js        # Application entry point
└── components/
    ├── LoginPage   # Authentication component
    ├── Dashboard   # Resource dashboard
    ├── LeaveForm   # Leave application form
    ├── LeaveCard   # Leave request display
    └── DateInfo    # Calendar date information
```

## 🔧 Technologies Used

- **React 18.2.0** - Frontend framework
- **react-calendar 4.6.0** - Calendar component
- **date-fns 2.30.0** - Date manipulation
- **CSS3** - Styling and responsive design
- **GitHub Pages** - Deployment platform

## 🎨 Key Features Implementation

- **Responsive Design**: Works on desktop and mobile devices
- **Role-based UI**: Different interfaces for Resources and Leads
- **Privacy Controls**: Resources can't see approval status of others
- **Real-time Updates**: Immediate reflection of leave approvals/rejections
- **Intuitive UX**: Clean, professional interface

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rishabh Dhaka**
- Email: rishabh.dhaka2@gmail.com
- GitHub: [@rishabhdhaka](https://github.com/rishabhdhaka)

---

⭐ Star this repository if you found it helpful!