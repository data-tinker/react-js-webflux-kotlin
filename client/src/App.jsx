import { BrowserRouter as Router, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Customers from './components/Customers';
import Login from './components/Login';

const RequireAuth = ({children}) => {
  let location = useLocation();

  if (sessionStorage.getItem('token') == null) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div id="app">
        <nav id="nav">
          <Link to="/">Home</Link> |
          <Link to="/about">About</Link> |
          <Link to="/customers">Customers</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/customers" element={
            <RequireAuth>
              <Customers />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
