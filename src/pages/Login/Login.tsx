import { useState } from "react";
import headerLogo from "../../assets/headerlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI, UserAPI } from "../../components/API/API";
import { useDispatch } from "react-redux";
import { setUser as setUserSlice } from "../../components/Redux/Slices/UserSlice/UserSlice";
import { auth_toggle } from "../../components/Redux/Slices/AuthSlice/AuthSlice";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  
  return (
    <div className="teacherContainer">
      <div className="logoDako">
        <img src={headerLogo} className="CSMLogo" />
      </div>

      <div className="UserPass">
        <div className="formContainer">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUser({ ...user, username: e.target.value });
              setError("");
            }}
            className="InputField"
            placeholder="Username"
          ></input>
        </div>

        <div className="formContainer">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUser({ ...user, password: e.target.value });
              setError("");
            }}
            className="InputField"
            placeholder="Password"
          ></input>
        </div>
      </div>

      <button
        onClick={async () => {
          const status = await LoginAPI(user);
          if (status === true) {
            const user_info = await UserAPI();
            if (user_info) {
              dispatch(setUserSlice(user_info));
            }

            dispatch(auth_toggle());
            navigate("/dashboard");
          } else {
            setError("Invalid login");
          }
        }}
        className="loginButton"
      >
        Login
      </button>

      <p>{error}</p>
      
      <div className="forgotPassword">Forgot Password?</div>
      <div className='toLoginPage'><p>Don't have an account? <span><Link to='/registration'><a className='toLogin'>Register</a></Link></span></p></div>
    </div>
  );
}
export default Login;