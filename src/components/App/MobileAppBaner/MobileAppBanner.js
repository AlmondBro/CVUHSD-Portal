import React, { Fragment, useState, useEffect } from 'react';

import { DarkOverlay, Container, HeaderTitle, ViewOptionContainer, ViewOptionLink, ViewOptionImage, FAIconStyled, ViewOptionText, Button } from './MobileAppBannerStyledComponents.js';

import { faChrome, faSafari } from '@fortawesome/free-brands-svg-icons';

import { useWindowSize, isSafari, isChromeBrowser } from './../../../utilityFunctions.js';

const MobileAppBanner = ({districtPosition, renderAsStudent, setHideOverflow, hideOverflow}) => {

    let [ bannerVisible, setBannerVisible ] = useState(false);
    let [ screenIcon, setScreenIcon ]       = useState(faSafari);
    let screenDimensions                    = useWindowSize();


    let { width } = screenDimensions;
    /*
        TODO: Do not like this imperative way of removing the body tag's overflow. 
        Figure out a way with using styled-component's global style 
    */

    const getDeepLinkURL = () => {
        let deepLink;

        deepLink        =   "intent:cvuhsd.portal://redirect#Intent;scheme=cvuhsd.portal;package=com.cvuhsd.portalMobile;end"
    
        let href        =   `intent:${"//scan/#Intent"};` + 
                            `scheme=${"cvuhsd.portal"};` +
                            `package=${"com.cvuhsd.portalMobile"};` +
                            `S.browser_fallback_url=${encodeURI(process.env.REACT_APP_PLAYSTORE_LINK)}` + 
                            `;end`;

        let scheme = process.env.REACT_APP_MOBILE_PROTOCOL;

        return scheme;
    };

    useEffect(() => {
        if (width <= 765) {
            setHideOverflow(false);
            setBannerVisible(true);

            document.body.classList.add("no-vertical-scroll"); 
        } else {
            setHideOverflow(true);
            setBannerVisible(false);

            document.body.classList.remove("no-vertical-scroll"); 
        }   

        if (isSafari) {
           setScreenIcon(faSafari);
        } 
        
        if (isChromeBrowser) {
            setScreenIcon(faChrome);
        }
    
    }, [ width ]);


    return (
        <Fragment>
            <DarkOverlay
                screenWidth     =   { width }
                bannerVisible   =   { bannerVisible }
            />
            <Container 
                className       =   "mobile-app-banner-container"
                screenWidth     =   { width }
                bannerVisible   =   { bannerVisible }
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
                        icon                  = { screenIcon }

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

                            onClick               = { () => { 
                                                            setBannerVisible(!setBannerVisible);
                                                            document.body.classList.remove("no-vertical-scroll"); 
                                                        }
                                                    }
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

{/* //https://auth.expo.io/@almondbro/CVUHSD-Portal-Mobile */}
                    <ViewOptionLink 
                        className   =   "mobile-app-banner-view-option-link"
                        href        =   { getDeepLinkURL() }
                    >
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