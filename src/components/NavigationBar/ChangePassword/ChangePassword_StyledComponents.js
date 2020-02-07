import styled from "styled-components";

let Form = styled("form")`
    padding; 10%;
`;

let FormInputTextField = styled("input")`
    display: block;
    padding: 2%;
    margin: 5% 1%;
`;

let FormButton = styled("button")`
    display: block;
    border: 0;
    padding: 3%;
    background-color: #0b74a7;
    color: white;
    /* margin: 0 auto; */
    border-radius: 0.2em;
`

export { Form, FormInputTextField, FormButton }