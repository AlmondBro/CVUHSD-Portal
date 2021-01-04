import React from 'react';

import { Container, HeaderTitle, ViewOptionContainer, ViewOptionLink, ViewOptionImage, FAIconStyled, ViewOptionText, Button } from './MobileAppBannerStyledComponents.js';

import { faChrome } from '@fortawesome/free-brands-svg-icons';

const MobileAppBanner = ({districtPosition, renderAsStudent }) => {
    return (
        <Container className="mobile-app-banner-container">
            <HeaderTitle
                className="mobile-app-banner-container"
                districtPosition      = { districtPosition }
                renderAsStudent       = { renderAsStudent }
            >
                See the CVUHSD SSO Portal In:
            </HeaderTitle>

            <ViewOptionContainer
                className="mobile-app-banner-view-option-container"
            >
              
                <FAIconStyled 
                    className="mobile-app-banner-view-option-image"

                    districtPosition      = { districtPosition }
                    renderAsStudent       = { renderAsStudent }
                    icon                  = { faChrome }

                />
            
                <ViewOptionText
                    districtPosition      = { districtPosition }
                    renderAsStudent       = { renderAsStudent }
                >
                    Mobile Browser
                </ViewOptionText>

                <ViewOptionLink className="mobile-app-banner-view-option-link">
                    <Button
                        districtPosition      = { districtPosition }
                        renderAsStudent       = { renderAsStudent }
                    >
                       Continue
                    </Button>
                </ViewOptionLink>
            </ViewOptionContainer>

            <ViewOptionContainer
                className="mobile-app-banner-view-option-container"
            >
               
                <ViewOptionImage 
                    className="mobile-app-banner-view-option-image"
                    src="/images/wp-portal-logo-blue-white-interior.svg"

                    districtPosition      = { districtPosition }
                    renderAsStudent       = { renderAsStudent }
                />


                <ViewOptionText
                   districtPosition      = { districtPosition }
                   renderAsStudent       = { renderAsStudent }
                >
                    WayPoint App
                </ViewOptionText>

                <ViewOptionLink className="mobile-app-banner-view-option-link">
                    <Button
                        districtPosition      = { districtPosition }
                        renderAsStudent       = { renderAsStudent }
                    >
                        Open App
                    </Button>
                </ViewOptionLink>
            </ViewOptionContainer>
        </Container>
    ); //end return statement
}; //end MobileAppBanner()

export default MobileAppBanner;