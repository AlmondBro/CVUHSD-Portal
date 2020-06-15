import React from "react";

//Import Footer styled components
import { FooterStyled, AppButtonsSection, MobileStoreImgLink, MobileStoreImg } from "./Footer_StyledComponents.js";

let Footer = (props) => {
    return (
        <FooterStyled {...props} className="container-fluid footer">
            <ul className="row"> 
                {/* <li>
                    <a href='https://play.google.com/store/apps/details?id=com.cvuhsd.portalMobile&hl=en_US&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                        <img    id="mobile-portal-ad"
                                alt='Get the CVUHSD Mobile Portal App on Google Play' 
                                src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'
                        />
                    </a>
                    
                </li> */}
                <a href="https://www.centinela.k12.ca.us" target="_blank" className="col-sm-3">CVUHSD Home</a>
                <a href="https://helpdesk.centinela.k12.ca.us" target="_blank" className="col-sm-3">Helpdesk</a>
                {
                    props.title ?
                        (props.title === ("Student") || props.renderAsStudent) ? 
                           null:  (<a href="https://sso.centinela.k12.ca.us/adfs/portal/updatepassword" 
                                        target="_blank" 
                                        className="col-sm-3">
                                            Change Password
                                    </a>)
                        : null 
                }
                <a href="https://portal.centinela.k12.ca.us/troubleshooting.html" target="_blank" className="col-sm-3">Troubleshooting</a>
            </ul>
            {/* <AppButtonsSection className="row">
                <MobileStoreImgLink className="col-md-6">
                    <MobileStoreImg 
                        src="./images/google-play.svg" 
                        alt="Download on Google Play Store" 
                        title="Download on Google Play Store"
                    />
                </MobileStoreImgLink>
                
                <MobileStoreImgLink className="col-md-6">
                    <MobileStoreImg 
                        src="./images/apple-app-store.svg"
                        alt="Download on Apple App Store" 
                        title="Download on Apple App Play Store"
                    />
                </MobileStoreImgLink>
            </AppButtonsSection> */}
        </FooterStyled>
    ); //emnd return statement
};

export default Footer;