import React from 'react';
import onClickOutside from "react-onclickoutside";
import { faTasks, faCircle, faCheck, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import { Container, TicketTypeContainer, FAIconStyled, TicketStatusText } from "./FilterPaneStyledComponent.js";

const FilterPane = ({ districtPosition, showFilterPane, setShowFilterPane, requestsType, setRequestsType }) => {
    FilterPane.handleClickOutside = () => setShowFilterPane(false);
    
    return (
        <Container 
            className       =   "filter-pane-container"
            showFilterPane  =   { showFilterPane }
        > 
            <TicketTypeContainer 
                className   =   "filter-pane-ticket-type-container"
                onClick     =   { () => setRequestsType("All") }
            >           
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faTasks }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    All 
                </TicketStatusText>
            </TicketTypeContainer>

            <TicketTypeContainer 
                className   ="filter-pane-ticket-type-container"
                onClick     =   { () => setRequestsType("Open") }
            >           
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
            
            <TicketTypeContainer 
                className   ="filter-pane-ticket-type-container"
                onClick     =   { () => setRequestsType("In Progress") }
            >              
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

            <TicketTypeContainer 
                className   ="filter-pane-ticket-type-container"
                onClick     =   { () => setRequestsType("Closed") }
            >           
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

const clickOutsideConfig = {
    handleClickOutside: () => FilterPane.handleClickOutside
};

export default onClickOutside(FilterPane, clickOutsideConfig);