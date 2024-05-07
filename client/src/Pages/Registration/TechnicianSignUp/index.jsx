import React, { useState, useId, useEffect } from "react";
import "./style.css";
import BasicButtons from "../../../components/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Regx } from "../../../constants";
import PasswordValidation from "../../../components/PasswordValidation/PasswordValidation";
import {
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import InputField from "../../../components/InputField/InputField";
import Select from "../../../components/Select";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
const TechnicianSignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validationModal, setValidationModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    phoneNo: "",
    gender: "",
    fNameErrMess: "",
    lNameErrMess: "",
    emailErrMess: "",
    passwordErrMess: "",
    phoneNoErrMess: "",
    genderErrMess: ""
  })
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const registerBtn = () => {
    if (userDetails.fName === "" && userDetails.lName === "" && userDetails.password === "" && userDetails.email === "" && userDetails.phoneNo < 10 && userDetails.gender === "") {
      setUserDetails({ ...userDetails, fNameErrMess: "First name is mandatory.", lNameErrMess: "Last name is mandatory.", emailErrMess: "Email is mandatory.", passwordErrMess: "Password is mandatory.", phoneNoErrMess: "Phone is mandatory.", genderErrMess: "Gender is mandatory." })
      return
    } else if (userDetails.fName === "") {
      setUserDetails({ ...userDetails, fNameErrMess: "First name is mandatory." })
      return
    } else if (userDetails.lName === "") {
      setUserDetails({ ...userDetails, lNameErrMess: "Last name is mandatory." })
      return
    } else if (userDetails.email === "") {
      setUserDetails({ ...userDetails, emailErrMess: "Email is mandatory." })
      return
    } else if (userDetails.password === "") {
      setUserDetails({ ...userDetails, passwordErrMess: "Password is mandatory." })
      return
    } else if (userDetails.phoneNo.length < 1) {
      setUserDetails({ ...userDetails, phoneNoErrMess: "Phone Number is mandatory." })
      return
    } else if (userDetails.phoneNo.length < 12) {
      setUserDetails({ ...userDetails, phoneNoErrMess: "Phone number must be 10 digit" })
    } else if (userDetails.gender === "") {
      setUserDetails({ ...userDetails, genderErrMess: "Gender is mandatory." })
      return
    } else {
      setUserDetails({ ...userDetails, fNameErrMess: true, lNameErrMess: true, emailErrMess: true, phoneNoErrMess: true, genderErrMess: true })
    }
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z]+$/
    setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: true })
    if (name === "fName" || name === "lName") {
      if (value.match(regex)) {
        setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: true })
      } else {
        setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: "Only string allowed" })
      }
    } else if (name === "email") {
      const emailValid = validateEmail(value)

      if (emailValid) {
        setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: true })
      } else {
        setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: "Enter valid email" })
      }
    }
    else if(name === "password"){
      console.log(value)
      setValidationModal(true)
    }
  }

  return (
    <Container>
      <Row className="my-3 h-100 w-100">
        <Col xs={2} md={2} lg={2}></Col>
        <Col xs={8} md={8} lg={8} className="body-container">
          <div className="body-inner-container h-100 w-100 p-4">
            <Row className="d-flex align-center">
              <header className="heading-h1 text-center">
                Apply to be a Geek!
              </header>
              <span className="sub-heading my-3 w-100">
                Imagine using your tech smarts to make a great salary, on your
                own terms. You’ll be your own boss, and work from wherever you
                are, whenever you want. At Geeker, we’re looking for talented
                technicians like you, to help you make this into your reality
                (while helping others too!)
              </span>
            </Row>
            <Row className="form-field-container">
              <div className="form-field-div">
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="fName">
                        <InputField
                          label={"First Name"}
                          placeholder={"First Name"}
                          type={"text"}
                          lineHeight={"3.5"}
                          boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                          border={"1px solid rgb(220, 230, 237)"}
                          fontWeight={"700"}
                          fontSize={"17px"}
                          color={"rgb(112, 131, 144)"}
                          name="fName"
                          value={userDetails.fName}
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="err-message">{userDetails.fNameErrMess}</label>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="lName">
                        <InputField
                          label={"Last Name"}
                          placeholder={"Last Name"}
                          type={"text"}
                          lineHeight={"3.5"}
                          boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                          border={"1px solid rgb(220, 230, 237)"}
                          fontWeight={"700"}
                          fontSize={"17px"}
                          color={"rgb(112, 131, 144)"}
                          value={userDetails.lName}
                          name="lName"
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="err-message">{userDetails.lNameErrMess}</label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="email">
                      <InputField
                        label={"Email"}
                        placeholder={"Email"}
                        type={"email"}
                        lineHeight={"3.5"}
                        boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                        border={"1px solid rgb(220, 230, 237)"}
                        fontWeight={"700"}
                        fontSize={"17px"}
                        color={"rgb(112, 131, 144)"}
                        value={userDetails.email}
                        name="email"
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="err-message">{userDetails.emailErrMess}</label>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3 password-div" controlId="password">
                      <Form.Label style={{ color: "rgb(112, 131, 144)" }}>
                        Password
                      </Form.Label>
                      <InputGroup>
                        <FormControl
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={userDetails.password}
                          name="password"
                          autoComplete="new-password"
                          
                          onChange={(e) => handleChange(e)}
                          style={{
                            border: "1px solid rgb(220, 230, 237)",
                            lineHeight: "3.5",
                            boxShadow: "rgb(238, 245, 250) 0px 6px 8px inset",
                            fontWeight: "700",
                            fontSize: "17px",
                            color: "rgb(112, 131, 144)",
                          }}
                        />
                        <InputGroup.Text
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          <Icon icon={showPassword ? eye : eyeOff} />
                        </InputGroup.Text>
                      </InputGroup>
                      <label className="err-message">{userDetails.passwordErrMess}</label>
                    <PasswordValidation value={userDetails.password} passwordErrMess={userDetails.passwordErrMess} setUserDetails={setUserDetails} validationModal={validationModal} setValidationModal={setValidationModal} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="phoneNo">
                      <Form.Label style={{ color: "rgb(112, 131, 144)" }}>
                        Phone Number
                      </Form.Label>
                      <PhoneInput
                        inputClass="phoneNumber-field"
                        country={"in"}
                        value={userDetails.phoneNo}
                        onChange={(phone) => setUserDetails({ ...userDetails, phoneNo: phone, phoneNoErrMess: true })}
                        onlyCountries={['us', 'in', 'cu', 'gr', 'fr',]}
                        // enableSearch={true}
                        countryCodeEditable={true}
                      />
                      <label className="err-message">{userDetails.phoneNoErrMess}</label>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label style={{ color: "rgb(112, 131, 144)" }}>
                        Gender
                      </Form.Label>
                      <Select
                        value={userDetails.gender}
                        name="gender"
                        onChange={(e) => handleChange(e)}
                        lineHeight={"3.5"}
                        boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                        border={"1px solid rgb(220, 230, 237)"}
                        fontWeight={"700"}
                        fontSize={"17px"}
                        color={"rgb(112, 131, 144)"}
                      />
                      <label className="err-message">{userDetails.genderErrMess}</label>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label=" Were you introduced to our services through a referral?"
                      />
                    </Form.Group>
                  </Row>
                  <Row className="text-center">
                    <span className="terms-condition">
                      By Signing up I agree to{" "}
                      <label className="terms-policy">Terms & Condtions Privacy Policy</label> &
                      <label className="terms-policy">Cookies Policy</label>
                    </span>
                  </Row>
                  <Row className="d-flex my-5 align-items-center">
                    <Col>
                      <span className="terms-condition">Already have an account</span>{" "}
                      <Link to={"/"} className="terms-policy">Sign In</Link>
                    </Col>
                    <Col>
                      <BasicButtons
                        width={"200px"}
                        color={"white"}
                        height={"60px"}
                        borderRadius={"12px"}
                        fontWeight={"700"}
                        loader={false}
                        background={"rgb(1, 212, 213)"}
                        btnName={"Create Account"}
                        disabled={false}
                        onClick={registerBtn}
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
            </Row>
          </div>
        </Col>
        <Col xs={2} md={2} lg={2}></Col>
      </Row>
    </Container>
  );
};
export default TechnicianSignUp;
