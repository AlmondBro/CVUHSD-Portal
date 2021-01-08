import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled("article")`
    position: absolute;
    z-index: 2;
    top: 23%;
    left: 67%;

    width: ${props => props.showFilterPane ? "200px" : "0px"};
    max-height: ${props => props.showFilterPane ? "300px" : "0px"};

    visibility: ${props => props.showFilterPane ? "visible" : "hidden"};

    background-color: white;
    border-radius: 10px;

    box-shadow: 5px 5px 30px -11px rgba(0,0,0,0.75);

    padding-top: 8px;

    /* transition: 350ms max-height ease-in-out, 350ms width ease-in-out; */

    @media only screen and (min-width: 818px) and (max-width: 1059px) {
        left: 60%;
    }

    @media only screen and (min-width: 656px) and (max-width: 817px) {
        left: 52%;
    }
    
    @media only screen and (min-width: 528px) and (max-width: 655px) {
        left: 42%;
    }

    @media only screen and (min-width: 426px) and (max-width: 527px) {
        left: 30%;
    }

    @media only screen and (min-width: 342px) and (max-width: 425px) {
        left: 15%;
    }

    @media only screen and (max-width: 341px) {
        width: 160px;
        left: 12%;
    }
    
    
    :after {
        content: "";

        position: absolute;
        left: 87%;
        bottom: 99%;

        width: 0;
        height: 0;

        border-bottom: solid 10px white;

        border-left: solid 10px transparent;
        border-right: solid 10px transparent;
    }
`;

const TicketTypeContainer = styled("section")`
    cursor: pointer;

    display: flex;
    flex-direction: row;
    justify-content: center;

    margin: 0 auto;
    width: 85%;

    padding: 10px 5px;

    margin-bottom: 8px;

//red : "1px solid rgba(147, 30, 29, 0.21)"
//blue: "1px solid rgba(30, 108, 146, 0.21)" 
    border-bottom: ${props => (props.districtPosition.toLowerCase() === "student" || props.renderAsStudent)  
                        ? "1px solid rgba(147, 30, 29, 0.21)" : "1px solid rgba(30, 108, 146, 0.21)" 
                    };

    /*
props.districtPosition ? 
                            (props.districtPosition.toLowerCase() === "student" || props.renderAsStudent === "true")  ? "1px solid rgba(30, 108, 146, 0.21)" : "1px solid rgba(147, 30, 29, 0.21)" 
                            : "1px solid rgba(30, 108, 146, 0.21)"
    */

    transition: 350ms background-color ease-in-out, 350ms border-radius ease-in-out;

    :hover {
        /* background-color: ${props => props.districtPosition ? 
                            (props.districtPosition.toLowerCase() === "student" || props.renderAsStudent)  ? "1px solid rgba(147, 30, 29, 0.30)" : "1px solid rgba(30, 108, 146, 0.30)" 
                            : "1px solid rgba(147, 30, 29, 0.30)"
                    }; */

        border-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
`;

const FAIconStyled = styled(FontAwesomeIcon)`
    display: inline-block;
    color: ${ props => props.color ? props.color :
                        props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };
   margin-left: 5px;

   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};
`;

const TicketStatusText = styled("h5")`
    display: inline-block;
    font-size: 1em;

    color: ${ props => props.color ? props.color :
                        props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

    margin-left: auto;
`;

export { Container, TicketTypeContainer, FAIconStyled, TicketStatusText };

