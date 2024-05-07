import React, { useState, useEffect } from "react";
import './PasswordValidation.css'


const PasswordValidation = ({ value }) => {
    useEffect(() => {
        console.log("value>>>>>>>>>>>>", value)
    }, [value])
    return (
        <div>
            <p>Content</p>
        </div>
    )
}
export default PasswordValidation;