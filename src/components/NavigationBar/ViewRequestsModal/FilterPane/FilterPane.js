import React from 'react';
import { faCircle, faCheck, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import { Container, TicketTypeContainer, FAIconStyled, TicketStatusText } from "./FilterPaneStyledComponent.js";

const FilterPane = ({ districtPosition, showFilterPane }) => {
    return (
        <Container 
            className       =   "filter-pane-container"
            showFilterPane  =   { showFilterPane }
        > 
            <TicketTypeContainer className="filter-pane-ticket-type-container">           
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faCircle }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    Open
                </TicketStatusText>
            </TicketTypeContainer>
            
            <TicketTypeContainer className="filter-pane-ticket-type-container">           
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faAngleDoubleRight }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    In Progress
                </TicketStatusText>
            </TicketTypeContainer>

            <TicketTypeContainer className="filter-pane-ticket-type-container">           
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faCheck }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    Closed
                </TicketStatusText>
            </TicketTypeContainer>
        </Container>
    ); //end return statement
}; //end FilterPane()

export default FilterPane;