import React from "react";

import BlueSection from "./BlueSection.js"

const PageContent = (props) => {
    let quickLinks_outlookEmailButton = {
        buttonLink: "https://sso.centinela.k12.ca.us/adfs/ls/?wa=wsignin1.0&amp;wtrealm=https%3a%2f%2fmail.centinela.k12.ca.us%2fowa%2f&amp;wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&amp;wct=2017-08-21T18%3a05%3a05Z",
        buttonImg: "Outlook.png",
    }

    return (
        <div className="page-content">
            <BlueSection 
                blueSectionName="quickLinks"
                checked={ false }
                headerTitle="Quick Links"
                buttonRowID="quickLinksButtonRow"
                buttons={ [quickLinks_outlookEmailButton, quickLinks_outlookEmailButton] }
            />
        </div>
    );
}; 

export default PageContent;