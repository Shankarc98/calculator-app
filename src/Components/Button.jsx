import React from "react"; 

function Button(props){

    const color = "white";
    return <button onClick={props.onClick}>
        {props.disp}
    </button>
}

export default Button; 