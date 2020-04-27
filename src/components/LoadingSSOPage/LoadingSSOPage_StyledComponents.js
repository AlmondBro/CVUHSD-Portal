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
        background-image: url("./images/cvuhsd-allStudents-ready.jpg");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.4;
       
    }
`;

let CoffeeAnimationContainer = styled("div")`
    position: absolute;
    width: 100%;
    height: 100%;
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
    text-align: center;
    margin: 4px 10px;
    padding: 5px;

    color: #931E1D; 
          
    transition: color 0.5s;

    & span {
        display: block;
        font-size: 0.7em;
        font-style: italic;
        font-weight: 900;
        margin: 8% 0%;
        text-align: center;
    }

    & span span {
        font-size: 1.75em;
    }
`; //end LoadingMessage

export { LoadingMessage, LoadingSSOPageContainer, CoffeeAnimationContainer };