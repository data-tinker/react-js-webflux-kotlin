import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import the AuthContext or Store Context you've created

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {state, signIn} = useContext(AuthContext); // Use the AuthContext to access and dispatch state
  const navigate = useNavigate();

  const signInError = state.signInError;
  const signInErrorMsg = state.signInErrorMsg;

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(username, password)
    await signIn({username, password});
    if (state.token) {
      navigate('/home');
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSignIn}>
        <div className="form-row">
          <div className="col">
            <label htmlFor="usernameInput">Username</label>
            <input
              id="usernameInput"
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="passwordInput">Password</label>
            <input
              id="passwordInput"
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {signInError && (
          <div className="alert-danger">
            {signInErrorMsg}
          </div>
        )}
        <button type="submit" className="btn btn-success">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
