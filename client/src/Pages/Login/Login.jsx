import React, { useState } from "react";
import BasicButtons from "../../components/Button/Button";
import { Divider} from "@mui/material";
import {Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import * as AuthApi from '../../api/auth.api';
import NotificationIcons from '../../components/Notification'
const LoginPage = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [isLoader, setIsLoader] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false)
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    emailErrMess: "",
    passwordErrMess: "",
  });

  const handleLogin = async () => {
    setIsLoader(true)
    if (userDetails.email === "" && userDetails.password === "") {
      setUserDetails({ ...userDetails, emailErrMess: "Please input your E-mail.", passwordErrMess: "Please input your Password!" });
      setIsLoader(false)
      return
    } else if (userDetails.email === "") {
      setUserDetails({ ...userDetails, emailErrMess: "Please input your E-mail." });
      setIsLoader(false)
      return
    } else if (userDetails.password === "") {
      setUserDetails({ ...userDetails, passwordErrMess: "Please input your Password!" });
      setIsLoader(false)
      return
    } else {
      setUserDetails({ ...userDetails, emailErrMess: true, passwordErrMess: true });
    }


    const data = {
      email: userDetails.email,
      password: userDetails.password
    }
    const response = await AuthApi.login(data)
    if (response && response.success) {
      localStorage.setItem("access_token", response.token)
      navigate("/dashboard");
    }
    setNotificationMessage(response.message)
    setShowNotification(true)
    setIsLoader(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: true })
  }



  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <>
      <NotificationIcons showNotification={showNotification} setShowNotification={setShowNotification} notificationMessage={notificationMessage} />
      <div className="login-div-form my-4">
        <h1>Logo</h1>
        <Divider className="my-4">
          <h5>Login</h5>
        </Divider>
        <div className="login-form">
          <form>
            <div className="input-field mb-3">
              <input
                type="email"
                name="email"
                value={userDetails.email}
                placeholder="Email"
                onChange={(e) => handleChange(e)}
                className="input-no-outline input-no-input-field"
              />
              <label className="err-message">{userDetails.emailErrMess}</label>
            </div>
            <div className="input-field">
              <div className="password-section">
                <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={userDetails.password}
                  onChange={(e) => handleChange(e)}
                  className="input-no-outline"
                />
                <label onClick={handleToggle} style={{ cursor: "pointer" }}>
                  <Icon icon={icon} size={15} />
                </label>
              </div>
              <label className="err-message">{userDetails.passwordErrMess}</label>
            </div>
            <div className="d-flex flex-column align-items-center text-center gap-3 mt-4">
              <BasicButtons
                width={"265px"}
                color={"white"}
                height={"60px"}
                borderRadius={"12px"}
                fontWeight={"700"}
                loader={isLoader}
                background={"rgb(135 135 135)"}
                btnName={"Log In"}
                disabled={isLoader}
                onClick={handleLogin}
              />
              <BasicButtons
                width={"265px"}
                color={"black"}
                height={"60px"}
                borderRadius={"12px"}
                loader={false}
                borderColor={"rgb(135 135 135)"}
                fontWeight={"700"}
                variant={"outlined"}
                btnName={"Continue with Google"}
                disabled={false}
              />
            </div>
          </form>
        </div>
        <div className="d-flex flex-wrap flex-row justify-content-center align-items-center gap-2 py-3">
          <span>Need an Account?</span>
          <Link to={"/register"} style={{ cursor: "pointer" }}> Register here</Link>
        </div>
        <Link
          to="/forget-password"
          state={{ some: "value" }}
          style={{ cursor: "pointer" }}
        >
          Forgot password
        </Link>
      </div>
    </>
  )
}
export default LoginPage