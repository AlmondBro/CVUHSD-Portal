import React from "react";

const BlueSectionButton = (props) => {
    return (
        <a href={props.buttonLink} target="_blank">
            <button>
                <img class="img-responsive" href="" src={"images/buttons/"+ props.buttonImg} alt={props.buttonImg}/>
            </button>
        </a>
    );
}; //BlueSection()

export default BlueSectionButton;