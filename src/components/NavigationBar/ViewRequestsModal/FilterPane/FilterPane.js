import React from 'react';
import onClickOutside from "react-onclickoutside";
import { faTasks, faCircle, faCheck, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import { Container, TicketTypeContainer, FAIconStyled, TicketStatusText } from "./FilterPaneStyledComponent.js";

const FilterPane = ({ districtPosition, renderAsStudent, requestsType, showFilterPane, setShowFilterPane, setRequestsType }) => {
    FilterPane.handleClickOutside = () => setShowFilterPane(false);
    
    return (
        <Container 
            districtPosition    =   { districtPosition }
            renderAsStudent     =   { renderAsStudent }
            className           =   "filter-pane-container"
            showFilterPane      =   { showFilterPane }
        > 
            <TicketTypeContainer 
                className           =   "filter-pane-ticket-type-container"
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent }

                onClick     =   { () => setRequestsType("All") }
                active      =   { (requestsType === "All") }     
            >           
                <FAIconStyled
                    districtPosition    =   { districtPosition }
                    renderAsStudent     =   { renderAsStudent }
                    icon                =   { faTasks }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    districtPosition    =   { districtPosition }
                    renderAsStudent     =   { renderAsStudent }
                >
                    All 
                </TicketStatusText>
            </TicketTypeContainer>

            <TicketTypeContainer 
                className           =   "filter-pane-ticket-type-container"
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent }
                onClick     =   { () => setRequestsType("Open") }
                active      =   { (requestsType === "Open") } 
            >           
                <FAIconStyled
                    districtPosition    =   { districtPosition }
                    renderAsStudent     =   { renderAsStudent }
                    icon                =   { faCircle }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    renderAsStudent     =   { renderAsStudent }
                    districtPosition    =   { districtPosition }
                >
                    Open
                </TicketStatusText>
            </TicketTypeContainer>
            
            <TicketTypeContainer 
                className           =   "filter-pane-ticket-type-container"
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent }
                onClick             =   { () => setRequestsType("In Progress") }
                active              =   { (requestsType === "In Progress") } 
            >              
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    icon                =   { faAngleDoubleRight }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                >
                    In Progress
                </TicketStatusText>
            </TicketTypeContainer>

            <TicketTypeContainer 
                className           =   "filter-pane-ticket-type-container"
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent }
                onClick             =   { () => setRequestsType("Closed") }
                active              =   { (requestsType === "Closed") } 
            >           
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    icon                =   { faCheck }
                />
                <TicketStatusText
                    className           =   "filter-pane-ticket-status-text"
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
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