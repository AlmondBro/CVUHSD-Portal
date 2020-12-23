import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
`;

const Divider = styled("hr")`
    width: 85%;
    margin: 0 auto;
    margin-top: 25px;

    background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

    opacity: 0.5;
`;

const FAIconStyled = styled(FontAwesomeIcon)`
    display: inline-block;
   color: ${ props => props.color ? props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
                        : "#931E1D"
            };
   margin-left: 5px;

   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};
`;

export { Container, Divider, FAIconStyled };