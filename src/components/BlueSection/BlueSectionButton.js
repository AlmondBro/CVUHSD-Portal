import React from "react";

const BlueSectionButton = (props) => {
    return (
        <a  href={props.buttonLink} 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <button>
                <img className="img-fluid" 
                     href={props.buttonLink} 
                     src={"./images/buttons/"+ props.buttonImg} 
                     alt={props.description} 
                     title={props.description}
                />
            </button>
        </a>
    );
}; //BlueSection()

export default BlueSectionButton;