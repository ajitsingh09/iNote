import React from 'react'
export default function Alert(props) {
    
  return (
   props.alert && <div className={`alert alert-${props.alert.type}`} role="alert" id="alert" >
        <strong>{props.alert.type==="danger"?"Error":"Success"}</strong>: {props.alert.msg} 
    </div>
  )
}