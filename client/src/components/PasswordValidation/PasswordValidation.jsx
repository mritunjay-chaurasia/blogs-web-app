import React, { useState, useEffect } from "react";
import './PasswordValidation.css'


const PasswordValidation = ({ validationModal, setValidationModal, value, passwordErrMess, setUserDetails }) => {
    useEffect(() => {
        console.log("value", validationModal)
    }, [validationModal])
    return (
        <>
            {true ?
                <div className="modal-container">
                    <div className="square-div">
                        <p>
                            message
                        </p>
                    </div>
                    <div className="triangle-div"></div>
                </div>
                : <></>}
        </>
    )
}
export default PasswordValidation;