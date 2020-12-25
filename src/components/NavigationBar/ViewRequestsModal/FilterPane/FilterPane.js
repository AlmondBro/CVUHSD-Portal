import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { Container, TicketTypeContainer, FAIconStyled, TicketStatusText } from "./FilterPaneStyledComponent.js";

const FilterPane = ({districtPosition}) => {
    return (
        <Container>
            <TicketTypeContainer>          
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faCircle }
                />
                <TicketStatusText
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    Open
                </TicketStatusText>
            </TicketTypeContainer>
            <TicketTypeContainer>          
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faCircle }
                />
                <TicketStatusText
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    In Progress
                </TicketStatusText>
            </TicketTypeContainer>
            <TicketTypeContainer>          
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faCircle }
                />
                <TicketStatusText
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    Closed
                </TicketStatusText>
            </TicketTypeContainer>
        </Container>
    ); //end return statement
}; //end FilterPane()

export default FilterPane;