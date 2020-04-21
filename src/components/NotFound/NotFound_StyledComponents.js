import styled from "styled-components";

let NotFoundContainer = styled("main")`
    height: auto;
    background: white;
    padding: 4%;
    margin: 4% auto;
    color: ${props => (props.title.toLowerCase() === "student") ? "#931E1D" : "#1E6C93"};

    h4 {
        color: ${props => (props.title.toLowerCase() === "student") ? "#931E1D" : "#1E6C93"};

        text-align: center;
    }

    border-radius: 30px;

`; //end NotFoundContainer

export { NotFoundContainer };