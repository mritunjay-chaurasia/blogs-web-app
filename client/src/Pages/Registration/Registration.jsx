import React, { useState, useId, useEffect } from "react";
import "./style.css";
import BasicButtons from "../../components/Button/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {Link, useNavigate } from "react-router-dom";
import { Divider,Button} from "@mui/material";
import PasswordValidation from "../../components/PasswordValidation/PasswordValidation";
import PasswordModal from '../../components/PasswordModal/PasswordModal'
import NotificationIcons from '../../components/Notification'
import {
    Form,
    Container,
    Row,
    Col,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import InputField from "../../components/InputField/InputField";
import Select from "../../components/Select";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import * as AuthApi from '../../api/auth.api';
import FileUpload from "../../components/FileUpload/FileUpload";
const Registration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
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
        genderErrMess: "",
        isEmailExist: false,
    })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleFileChange = (event) => {
        
        setSelectedFile(event.target.files[0]);
      };

    const checkExistEmail = async (email) => {
        if (email) {
            const res = await AuthApi.findExistUser({ email })
            if (res && !res.success) {
                setNotificationMessage(res.message)
                setShowNotification(true)
                setUserDetails({ ...userDetails, emailErrMess: "Already Email exist" })
                return true
            }
        }
    }

    const handleChange = async (e) => {
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
        else if (name === "password") {
            const password = value;
            const validations = {
                isSixCharacters: password.length >= 6,
                hasSmallLetter: /[a-z]/.test(password),
                hasCapitalLetter: /[A-Z]/.test(password),
                hasSpecialCharacter: /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password),
                hasNumber: /[0-9]/.test(password),
            };

            const { isSixCharacters, hasSmallLetter, hasCapitalLetter, hasSpecialCharacter, hasNumber } = validations;

            if (isSixCharacters && hasSmallLetter && hasCapitalLetter && hasSpecialCharacter && hasNumber) {
                setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: true })
            } else {
                setUserDetails({ ...userDetails, [name]: value, [`${name}ErrMess`]: "Enter valid Password" })
            }
        }
    }

    const registerBtn = async () => {
        setIsLoader(true)
        if (userDetails.fName === "" && userDetails.lName === "" && userDetails.password === "" && userDetails.email === "" && userDetails.phoneNo < 10 && userDetails.gender === "") {
            setIsLoader(false)
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

        const { fName, lName, email, password, phoneNo, gender } = userDetails
        const temp = {
            fName,
            lName,
            email,
            password,
            phoneNo,
            gender,
        };
        const response = await AuthApi.register(temp);
        if (response && response.success) {
            localStorage.setItem("access_token", response.token)
            navigate("/dashboard");
            setUserDetails({
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
            });
        }
        setNotificationMessage(response.message)
        setShowNotification(true)
        setIsLoader(false)
    }

    return (
        <Container>
            <NotificationIcons showNotification={showNotification} setShowNotification={setShowNotification} notificationMessage={notificationMessage} />
            <Row className="my-3 h-100 w-100">
                <Col xs={2} md={2} lg={2}></Col>
                <Col xs={8} md={8} lg={8} className="body-container">
                    <Row className="form-field-container m-5">
                        <Divider className="mb-4">
                            <h5>Registration</h5>
                        </Divider>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="fName">
                                        <InputField
                                            label={"First Name"}
                                            placeholder={"First Name"}
                                            type={"text"}
                                            lineHeight={"2"}
                                            boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                                            border={"1px solid rgb(220, 230, 237)"}
                                            fontWeight={"400"}
                                            fontSize={"13px"}
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
                                            lineHeight={"2"}
                                            boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                                            border={"1px solid rgb(220, 230, 237)"}
                                            fontWeight={"400"}
                                            fontSize={"13px"}
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
                                        lineHeight={"2"}
                                        boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                                        border={"1px solid rgb(220, 230, 237)"}
                                        fontWeight={"400"}
                                        fontSize={"13px"}
                                        color={"rgb(112, 131, 144)"}
                                        value={userDetails.email}
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                        onBlur={(e) => checkExistEmail(e.target.value)}
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
                                            onBlur={() => setShowPasswordModal(false)}
                                            onFocus={() => setShowPasswordModal(true)}
                                            style={{
                                                border: "1px solid rgb(220, 230, 237)",
                                                lineHeight: "2",
                                                boxShadow: "rgb(238, 245, 250) 0px 6px 8px inset",
                                                fontWeight: "400",
                                                fontSize: "13px",
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
                                    <PasswordModal visible={showPasswordModal} >
                                        <PasswordValidation value={userDetails.password} />
                                    </PasswordModal>
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
                                        countryCodeEditable={true}
                                    />
                                    <label className="err-message">{userDetails.phoneNoErrMess}</label>
                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group>
                                    <Form.Label style={{ color: "rgb(112, 131, 144)" }}>
                                        Upload Image
                                    </Form.Label>
                                  <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} handleFileChange={handleFileChange} />
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
                                        lineHeight={"2"}
                                        boxShadow={"rgb(238, 245, 250) 0px 6px 8px inset"}
                                        border={"1px solid rgb(220, 230, 237)"}
                                        fontWeight={"400"}
                                        fontSize={"13px"}
                                        color={"rgb(112, 131, 144)"}
                                    />
                                    <label className="err-message">{userDetails.genderErrMess}</label>
                                </Form.Group>
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
                                        loader={isLoader}
                                        background={"rgb(135 135 135)"}
                                        btnName={"Create Account"}
                                        disabled={isLoader}
                                        onClick={registerBtn}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Col>
                <Col xs={2} md={2} lg={2}></Col>
            </Row>
        </Container>
    );
};
export default Registration;
