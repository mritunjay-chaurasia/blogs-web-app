import React, { useState, useEffect } from "react";
import './PasswordValidation.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PasswordValidation = ({ value, setIsPasswordValid }) => {
    let validationItem = [{ label: "6 Characters", key: "isSixCharacters" }, { label: "Small Letter", key: "isSmallLetter" }, { label: "Capital Letter", key: "isCapitalLetter" }, { label: "Special Character", key: "isSpecialCharacters" }, { label: "Number", key: "isNumber" },]
    const [validateData, setValidateData] = useState({
        isSixCharacters: false,
        isSmallLetter: false,
        isCapitalLetter: false,
        isSpecialCharacters: false,
        isNumber: false
    })

    useEffect(() => {
        setValidateData((prevState => ({
            ...prevState,
            isSixCharacters: value.length >= 6,
            isSmallLetter: /[a-z]/.test(value),
            isCapitalLetter: /[A-Z]/.test(value),
            isSpecialCharacters: /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(value),
            isNumber: /[0-9]/.test(value),
        })))

        // const { isSixCharacters, isSmallLetter, isCapitalLetter, isSpecialCharacters, isNumber } = validateData;
        // if (isSixCharacters && isSmallLetter && isCapitalLetter && isSpecialCharacters && isNumber) {
        //     setIsPasswordValid(true);
        // } else {
        //     setIsPasswordValid(false);
        // }

    }, [value])
    return (
        <>
            {validationItem && validationItem.length > 0 &&
                validationItem.map((item, index) => {
                    return (<div id={index}>
                        <CheckCircleIcon className={`circle-icons ${validateData[item.key] ? "validText" : "inValidateText"}`} /> {item.label}
                    </div>)
                })
            }
        </>
    )
}
export default PasswordValidation;