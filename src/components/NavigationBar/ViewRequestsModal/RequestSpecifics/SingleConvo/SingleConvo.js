import React from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt, faArrowLeft, faClock, faUserTag, faEyeSlash, faEye, faReply, faLock } from '@fortawesome/free-solid-svg-icons';

import { removeHTML } from './../../../../../utilityFunctions.js';
//Impor styled components
import { Container, SubSection, ReqSkeletonContainer, RequestDescription, TicketMetaData, MetaDataContainer,  FAIconStyled, DateTime, Divider } from './SingleConvoStyledComponents.js';

const SingleConvo = ({id, isLoading, districtPosition, renderAsStudent, showConvos, description, date, time, author}) => {
 
    return (
        <Container 
            className           =   {`#${id}-single-convo-container`}

            districtPosition    =   { districtPosition.toLowerCase() }
            renderAsStudent     =   { renderAsStudent }

            showConvos          =   { showConvos }
        >
            <SubSection
                className   =   {`request-#${id}-ticket-subsection`}
                width       =   { `${((12/19)*100).toString()}%`}
                alignItems  =   "flex-start"
            >
                {
                    isLoading ? (
                        <ReqSkeletonContainer>
                            <Skeleton
                                width   =   { "auto" }
                                count   =   { 10 }
                            />
                        </ReqSkeletonContainer>
                    
                    ) : (
                        <RequestDescription
                            className           =   {`request-#${id}-ticket-description`}
                            districtPosition    =   { districtPosition.toLowerCase() }
                            renderAsStudent     =   { renderAsStudent }
                            as                  =   "p"
                        >
                            { removeHTML(description) || `No description` }
                        </RequestDescription>
                    )
                }

            </SubSection>

            <TicketMetaData
                className       =   "request-rectangle-ticket-metadata"
                width       =   { `${((7/19)*100).toString()}%`}
                alignItems      =   "flex-end"
                as              =   "aside" 
            >
                <MetaDataContainer
                    className   =   {`request-#${id}-metadata-container`}
                >
                    <FAIconStyled
                        className           =   {`request-#${id}-metadata-icon`}
                        districtPosition    =   { districtPosition.toLowerCase() }
                        renderAsStudent     =   { renderAsStudent }
                        icon                =   { faClock }
                        fontSize            =   "1.15em"
                    />
                    <DateTime
                        className           =   {`request-#${id}-metadata-date-time`}

                        districtPosition    =   { districtPosition.toLowerCase() }
                        renderAsStudent     =   { renderAsStudent }

                        as                  =   "time"
                    >
                        {
                            isLoading ? (
                                <Skeleton
                                    width = {40}
                                />
                            ) : `${date} @ ${time}`
                        }  
                    </DateTime>
                    </MetaDataContainer>


                <MetaDataContainer
                    className   =   {`request-#${id}-metadata-container`}
                >
                    <FAIconStyled
                        className           =   {`request-#${id}-metadata-icon`}
                        districtPosition    =   { districtPosition.toLowerCase() }
                        renderAsStudent     =   { renderAsStudent }
                        icon                =   { faUserTag }
                        fontSize            =   "1.15em"
                    />
                    <DateTime
                        className           =   {`request-#${id}-metadata-technician-name`}

                        districtPosition    =   { districtPosition.toLowerCase() }
                        renderAsStudent     =   { renderAsStudent }
                    >
                        {
                            isLoading ? (
                                <Skeleton
                                    width = {80}
                                />
                            ) : author 
                        }  
                    </DateTime>
                </MetaDataContainer>
            </TicketMetaData>
            {/* <Divider/> */}

        </Container>
    ); //end return statement
}; 

export default SingleConvo;