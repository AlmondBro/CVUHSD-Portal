import styled from "styled-components";

let NotFoundContainer = styled("main")`
    height: 100%;

    margin: 4% auto;
    color: ${props => (props.title.toLowerCase() === "student") ? "#931E1D" : "#1E6C93"};

    h4 {
        color: ${props => (props.title.toLowerCase() === "student") ? "#931E1D" : "#1E6C93"};

        text-align: center;
    }

`; //end NotFoundContainer

export { NotFoundContainer };