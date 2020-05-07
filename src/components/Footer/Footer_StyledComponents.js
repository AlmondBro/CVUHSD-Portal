import styled from "styled-components";

let FooterStyled = styled("footer")`
    width: 100%;
    background-color: ${ props => props.title ?
                                    ( (props.title === "Student") || props.renderAsStudent) ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
                        };
    margin-top: 0.1%;

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    a {
        color: white;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        /* margin: 0% 0.5%; */
    }

    a:hover, a:focus, a:target {
        cursor: pointer;
        color: white;
    }
`; //end Footer

export { FooterStyled };