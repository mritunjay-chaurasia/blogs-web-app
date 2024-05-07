import React from "react";
import './style.css'
function PasswordModal({ visible,children }) {


    return (
        <>
            {visible &&
                <div className="square-div">
                    <div className="triangle-div"></div>
                    <div className="inner-content-div">{children}</div>
                </div>
            }
        </>
    );
}

export default PasswordModal;