import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

const App = () => {
  const [user, setUser] = useState({ type: 'resource', name: 'Ayush' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leaves, setLeaves] = useState([]);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [currentView, setCurrentView] = useState('calendar');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const credentials = {
    'Ayush@pentair.com': { password: 'Pentair', name: 'Ayush', type: 'resource' },
    'Akshay@pentair.com': { password: 'Pentair', name: 'Akshay', type: 'resource' },
    'Ashish@pentair.com': { password: 'Pentair', name: 'Ashish', type: 'resource' },
    'rishabh.dhaka@pentair.com': { password: 'Password@123', name: 'Rishabh Dhaka', type: 'lead' }
  };

  const handleLogin = (email, password) => {
    if (credentials[email] && credentials[email].password === password) {
      setUser({ type: credentials[email].type, name: credentials[email].name });
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ type: 'resource', name: 'Ayush' });
    setCurrentView('calendar');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLeaveSubmit = (leaveData) => {
    const newLeave = {
      id: Date.now(),
      ...leaveData,
      status: 'pending',
      appliedBy: user.name,
      appliedDate: new Date()
    };
    setLeaves([...leaves, newLeave]);
    setShowLeaveForm(false);
  };

  const handleLeaveAction = (leaveId, action) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { ...leave, status: action } : leave
    ));
  };



  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Leave Management System</h1>
        <nav className="nav">
          <button 
            onClick={() => setCurrentView('calendar')} 
            className={currentView === 'calendar' ? 'nav-btn active' : 'nav-btn'}
          >
            Calendar
          </button>
          {user.type === 'resource' && (
            <button 
              onClick={() => setCurrentView('dashboard')} 
              className={currentView === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
            >
              My Dashboard
            </button>
          )}
        </nav>
        <div className="user-info">
          <span>User: {user.name} ({user.type})</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="main-content">
        {currentView === 'calendar' ? (
          <>
            <div className="calendar-section">
              <h2>Calendar</h2>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={({ date }) => {
                  if (user.type === 'resource') {
                    const userLeave = leaves.find(leave => 
                      leave.appliedBy === user.name &&
                      (new Date(leave.startDate).toDateString() === date.toDateString() ||
                       new Date(leave.endDate).toDateString() === date.toDateString())
                    );
                    if (userLeave) {
                      return `leave-${userLeave.status}`;
                    }
                  } else {
                    const hasLeave = leaves.some(leave => 
                      new Date(leave.startDate).toDateString() === date.toDateString() ||
                      new Date(leave.endDate).toDateString() === date.toDateString()
                    );
                    return hasLeave ? 'has-leave' : null;
                  }
                  return null;
                }}
              />
              
              <DateInfo selectedDate={selectedDate} leaves={leaves} userType={user.type} />
              
              {user.type === 'resource' && (
                <button 
                  onClick={() => setShowLeaveForm(true)}
                  className="apply-leave-btn"
                >
                  Apply Leave
                </button>
              )}
            </div>

            <div className="leaves-section">
              <h2>Leave Requests</h2>
              <div className="leaves-list">
                {(user.type === 'resource' 
                  ? leaves.filter(leave => leave.appliedBy === user.name)
                  : leaves
                ).map(leave => (
                  <LeaveCard 
                    key={leave.id}
                    leave={leave}
                    userType={user.type}
                    onAction={handleLeaveAction}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <Dashboard leaves={leaves} userName={user.name} />
        )}
      </div>

      {showLeaveForm && (
        <LeaveForm 
          onSubmit={handleLeaveSubmit}
          onClose={() => setShowLeaveForm(false)}
        />
      )}
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(email, password)) {
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Leave Management System</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

const DateInfo = ({ selectedDate, leaves, userType }) => {
  const dateString = selectedDate.toDateString();
  const leavesOnDate = leaves.filter(leave => 
    new Date(leave.startDate).toDateString() === dateString ||
    new Date(leave.endDate).toDateString() === dateString
  );

  if (leavesOnDate.length === 0) {
    return (
      <div className="date-info">
        <h4>Selected Date: {selectedDate.toLocaleDateString()}</h4>
        <p>No leaves on this date</p>
      </div>
    );
  }

  return (
    <div className="date-info">
      <h4>Selected Date: {selectedDate.toLocaleDateString()}</h4>
      <div className="leaves-on-date">
        <h5>Resources on leave:</h5>
        {leavesOnDate.map(leave => (
          <div key={leave.id} className={`date-leave-item ${userType === 'lead' ? leave.status : 'neutral'}`}>
            <div className="leave-item-main">
              <span className="resource-name">{leave.appliedBy}</span>
              {userType === 'lead' && (
                <span className={`leave-status ${leave.status}`}>{leave.status}</span>
              )}
              <span className="leave-type">({leave.type})</span>
            </div>
            {userType === 'lead' && (
              <div className="leave-item-details">
                <span className="applied-date">Applied: {new Date(leave.appliedDate).toLocaleDateString()}</span>
                <span className="leave-duration">{leave.startDate} to {leave.endDate}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const LeaveForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    type: 'casual',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Apply for Leave</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Leave Type:</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="casual">Casual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="planned">Planned Leave</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Start Date:</label>
            <input 
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>End Date:</label>
            <input 
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Reason:</label>
            <textarea 
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = ({ leaves, userName }) => {
  const userLeaves = leaves.filter(leave => leave.appliedBy === userName);
  const approvedLeaves = userLeaves.filter(leave => leave.status === 'approved');
  const rejectedLeaves = userLeaves.filter(leave => leave.status === 'rejected');

  return (
    <div className="dashboard">
      <h2>My Leave Dashboard</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card approved">
          <h3>Approved Leaves</h3>
          <span className="stat-number">{approvedLeaves.length}</span>
        </div>
        <div className="stat-card rejected">
          <h3>Rejected Leaves</h3>
          <span className="stat-number">{rejectedLeaves.length}</span>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>Approved Leaves</h3>
          <div className="leaves-list">
            {approvedLeaves.map(leave => (
              <LeaveCard key={leave.id} leave={leave} userType="resource" />
            ))}
            {approvedLeaves.length === 0 && <p>No approved leaves</p>}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Rejected Leaves</h3>
          <div className="leaves-list">
            {rejectedLeaves.map(leave => (
              <LeaveCard key={leave.id} leave={leave} userType="resource" />
            ))}
            {rejectedLeaves.length === 0 && <p>No rejected leaves</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaveCard = ({ leave, userType, onAction }) => {
  return (
    <div className={`leave-card ${leave.status}`}>
      <div className="leave-header">
        <span className="leave-type">{leave.type}</span>
        <span className={`status ${leave.status}`}>{leave.status}</span>
      </div>
      <div className="leave-details">
        <p><strong>Applied by:</strong> {leave.appliedBy}</p>
        <p><strong>Duration:</strong> {leave.startDate} to {leave.endDate}</p>
        <p><strong>Applied on:</strong> {new Date(leave.appliedDate).toLocaleDateString()}</p>
        <p><strong>Reason:</strong> {leave.reason}</p>
      </div>
      
      {userType === 'lead' && leave.status === 'pending' && (
        <div className="leave-actions">
          <button 
            onClick={() => onAction(leave.id, 'approved')}
            className="approve-btn"
          >
            Approve
          </button>
          <button 
            onClick={() => onAction(leave.id, 'rejected')}
            className="reject-btn"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default App;