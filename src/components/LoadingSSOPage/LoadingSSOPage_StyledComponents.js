import styled from "styled-components";

let LoadingSSOPageContainer = styled("div")`
    width: 100%;
    height: 100%;

    ::after {
        position: absolute;
        z-index: -1;
        content: "";
        width: 100%;
        height: 100%;
        background-image: url("./cvuhsd-allStudents-ready.jpg");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.3;
       
    }
`;

let CoffeeAnimationContainer = styled("div")`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    margin-bottom: 15%;

    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5%;
    padding-bottom: 5%;
`;

let LoadingMessage = styled("p")`
    font-size: 1.5em;
    margin: 4px 10px;
    padding: 5px;

    color:  ${ props => 
                ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                    "#931E1D": "#1E6C93"
            };
    transition: color 0.5s;

    & span {
        display: block;
        font-style: italic;
        font-weight: 200;
        margin: 0 auto;
        text-align: center;
    }

    & span span {
        font-size: 1.75em;
    }
`; //end LoadingMessage

export { LoadingMessage, LoadingSSOPageContainer, CoffeeAnimationContainer };