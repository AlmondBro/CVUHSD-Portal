import React, { Fragment, useEffect } from 'react';

import { DarkOverlay, Container, HeaderTitle, ViewOptionContainer, ViewOptionLink, ViewOptionImage, FAIconStyled, ViewOptionText, Button } from './MobileAppBannerStyledComponents.js';

import { faChrome } from '@fortawesome/free-brands-svg-icons';

import { useWindowSize } from './../../../utilityFunctions.js';

const MobileAppBanner = ({districtPosition, renderAsStudent, setHideOverflow, hideOverflow}) => {

    let screenDimensions = useWindowSize();
    let { width, height } = screenDimensions;

    /*
        TODO: Do not like this imperative way of removing the body tag's overflow. 
        Figure out a way with using styled-component's global style 
    */
    useEffect(() => {
        if (width <= 765) {
            setHideOverflow(false);

            document.body.classList.add("no-vertical-scroll"); 
        } else {
            setHideOverflow(true);
            document.body.classList.remove("no-vertical-scroll"); 
        }   
    }, [ width ]);

    return (
        <Fragment>
            <DarkOverlay
                screenWidth = { width }
            />
            <Container 
                className   =   "mobile-app-banner-container"
                screenWidth = {width}

            >
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
        </Fragment>
    ); //end return statement
}; //end MobileAppBanner()

export default MobileAppBanner;