import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src="/images/octofitapp-small.png" alt="OctoFit" className="app-logo" />
              OctoFit Tracker
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/activities">Activities</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/teams">Teams</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Profile</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container py-4">
          <h1>Welcome to OctoFit Tracker</h1>
          <p className="lead">Track your fitness journey with our comprehensive fitness tracking platform.</p>
        </main>
      </div>
    </Router>
  );
}

export default App;
