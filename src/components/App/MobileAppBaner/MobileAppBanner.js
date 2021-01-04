import React from 'react';

import { Container, HeaderTitle, ViewOptionContainer, ViewOptionImage, ViewOptionText } from './MobileAppBannerStyledComponents.js';

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
                <ViewOptionImage 
                    className="mobile-app-banner-view-option-image"
                    src="/images/buttons/google-drive.png"

                    districtPosition      = { districtPosition }
                    renderAsStudent       = { renderAsStudent }
                />

                <ViewOptionText
                   districtPosition      = { districtPosition }
                   renderAsStudent       = { renderAsStudent }
                >
                    Mobile Web Browser
                </ViewOptionText>
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
                    Mobile App
                </ViewOptionText>
            </ViewOptionContainer>
        </Container>
    ); //end return statement
}; //end MobileAppBanner()

export default MobileAppBanner;