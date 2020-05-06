import React from "react";

//Import Footer styled components
import { FooterStyled } from "./Footer_StyledComponents.js";

let Footer = (props) => {
    return (
        <FooterStyled {...props}>
            <ul>
                {/* <li>
                    <a href='https://play.google.com/store/apps/details?id=com.cvuhsd.portalMobile&hl=en_US&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                        <img    id="mobile-portal-ad"
                                alt='Get the CVUHSD Mobile Portal App on Google Play' 
                                src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'
                        />
                    </a>
                    
                </li> */}
                <a href="https://www.centinela.k12.ca.us" target="_blank">CVUHSD Home</a>
                <a href="https://helpdesk.centinela.k12.ca.us" target="_blank">Helpdesk</a>
                <a href="https://sso.centinela.k12.ca.us/adfs/portal/updatepassword" target="_blank">Update Password</a>
                <a href="https://portal.centinela.k12.ca.us/staff.html" target="_blank">Troubleshooting</a>
            </ul>
        </FooterStyled>
    ); //emnd return statement
};

export default Footer;