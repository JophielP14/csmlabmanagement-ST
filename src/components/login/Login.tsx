import { useState } from "react";
import headerLogo from "../../assets/headerlogo.png"
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI } from "../API/API";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
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
      <Link to={"/forgot-password"} >
        <div className="forgotPassword">Forgot Password?</div>
      </Link>
    </div>
  );
}
export default Login;
