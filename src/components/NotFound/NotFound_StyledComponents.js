import styled from "styled-components";

let NotFoundContainer = styled("main")`
    height: auto;
    background: white;
    padding: 4%;
    margin: 4% auto;
    color: ${props => (props.title.toLowerCase() === "student") ? "#931E1D" : "#1E6C93"};

    border-radius: 30px;

    h4 {
        color: ${props => (props.title.toLowerCase() === "student") ? "#931E1D" : "#1E6C93"};
        font-size: 2em;
        text-align: center;
    }

    p {
        font-size: 1.2em;
    }
   

`; //end NotFoundContainer

export { NotFoundContainer };