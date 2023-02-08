import React from 'react'

const Alert = (props) => {
    return (
       
            <div className="alert alert-success my-2" role="alert">
                {props.message}
            </div>
        
    )
}

export default Alert
