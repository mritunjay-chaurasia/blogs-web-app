import React, { useState } from "react";
import logo from "../../assets/Images/geeker_logo.png";
import BasicButtons from "../../components/Button";
import { Divider, Link } from "@mui/material";
import { Modal, ToggleButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import  * as AuthApi  from '../../api/auth.api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [radioValue, setRadioValue] = useState("customer");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    emailErrMess: "",
    passwordErrMess: "",
  });

  const handleLogin = async() => {
    if (userDetails.email === "" && userDetails.password === "") {
      setUserDetails({ ...userDetails, emailErrMess: "Please input your E-mail.", passwordErrMess: "Please input your Password!" });
      return
    } else if (userDetails.email === "") {
      setUserDetails({ ...userDetails, emailErrMess: "Please input your E-mail." });
      return
    } else if (userDetails.password === "") {
      setUserDetails({ ...userDetails, passwordErrMess: "Please input your Password!" });
      return
    } else {
      setUserDetails({ ...userDetails, emailErrMess: true, passwordErrMess: true });
    }
    console.log("submit data>>>>>>>>>>>>", userDetails)
    const respose = await AuthApi.login(userDetails)
    // you can call here api
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: true })
  }

  const register = () => {
    navigate("/register", { state: { data: radioValue } });
  };
  const radios = [
    { name: "Customer", value: "customer" },
    { name: "Technician", value: "technician" },
  ];
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <p>Pick Registration Type</p>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                className="px-5 py-3"
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                // variant="outline-info"
                variant={idx % 2 ? "outline-info" : "outline-info"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <BasicButtons
            onClick={() => setShow(false)}
            type={"button"}
            width={"85px"}
            color={"white"}
            height={"30px"}
            fontWeight={"600"}
            loader={false}
            background={"#97abb6"}
            btnName={"Close"}
            disabled={false}
          />
          <BasicButtons
            onClick={register}
            type={"button"}
            width={"85px"}
            color={"white"}
            height={"30px"}
            fontWeight={"600"}
            loader={false}
            background={"rgb(1, 212, 213)"}
            btnName={"Start"}
            disabled={false}
          />
        </Modal.Footer>
      </Modal>
      <div className="login-div-form my-4">
        <img src={logo} />
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
                loader={false}
                background={"rgb(1, 212, 213)"}
                btnName={"Log In"}
                disabled={false}
                onClick={handleLogin}
              />
              <BasicButtons
                width={"265px"}
                color={"black"}
                height={"60px"}
                borderRadius={"12px"}
                loader={false}
                borderColor={"rgb(1, 212, 213)"}
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
          <Link onClick={() => setShow(true)} style={{ cursor: "pointer" }}>
            Register here
          </Link>
        </div>
        <Link
          to="/register"
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