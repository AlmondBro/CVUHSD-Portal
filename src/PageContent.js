import React from "react";

import BlueSection from "./BlueSection.js"

const PageContent = (props) => {
    let quickLinks_outlookEmail_button = {
        buttonLink: "https://sso.centinela.k12.ca.us/adfs/ls/?wa=wsignin1.0&amp;wtrealm=https%3a%2f%2fmail.centinela.k12.ca.us%2fowa%2f&amp;wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&amp;wct=2017-08-21T18%3a05%3a05Z",
        buttonImg: "Outlook.png",
    }

    let quickLinks_canvas_button = {
        buttonLink: "https://centinela.instructure.com/",
        buttonImg: "canvas.png"
    };

    let quickLinks_illuminate_button = {
        buttonLink: "https://centinela.illuminateed.com/dna/?prev_page=Main_NotDashboardPage&amp;page=SisLogin",
        buttonImg: "illuminate.png"
    };

    let quickLinks_hero_button = {
        buttonLink: "https://access.heropowered.com/login/centinelavalley-usd",
        buttomImg: "hero.png"
    };
    
    let quickLinks_schoolMessenger_button = {
        buttonLink: "https://asp.schoolmessenger.com/centinela",
        buttonImg: "schoolmessenger-button.png"
    };

    let quickLinks_powerTeacher_button = {
        buttonLink: "https://powerschool.centinela.k12.ca.us/teachers/pw.html",
        buttonImg: "PT.png"
    };

    let quickLinks_googleDrive_button = { 
        buttonLink: "https://accounts.google.com/signin/v2/sl/pwd?service=wise&amp;passive=1209600&amp;osid=1&amp;continue=https%3A%2F%2Fdrive.google.com%2F&amp;followup=https%3A%2F%2Fdrive.google.com%2F&amp;emr=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin",
        buttonImg: "google-drive.png"
    };

    let quickLinks_printCenter_button = {
        buttonLink: "https://cvprintcenter.myprintdesk.net/DSF/smartstore.aspx#!/Storefront",
        buttonImg: "print-center.png"
    };

    let quickLinks_helpDesk_button = {
        buttonLink: "https://helpdesk.centinela.k12.ca.us",
        buttonImg: "helpdesk.png"
    };

    let quickLinks_office365_button = {
        buttonLink: "https://portal.office.com/",
        buttonImg: "office365.png"
    };

    let quickLinks_californiaCollegeGuidance_Initiative = {
        buttonLink: "https://www.californiacolleges.edu/#/user-login",
        buttonImg: "ccgi-logo.png"
    };

    return (
        <div className="page-content">
        [
            <BlueSection 
                blueSectionName="quickLinks"
                checked={ true }
                headerTitle="Quick Links"
                buttonRowID="quickLinksButtonRow"
                buttons={ [ quickLinks_outlookEmail_button, quickLinks_canvas_button, 
                            quickLinks_illuminate_button, quickLinks_hero_button, 
                            quickLinks_schoolMessenger_button, quickLinks_powerTeacher_button,
                            quickLinks_googleDrive_button, quickLinks_printCenter_button, 
                            quickLinks_helpDesk_button, quickLinks_office365_button,
                            quickLinks_californiaCollegeGuidance_Initiative
                          ] 
                        }
            />,
            <BlueSection 
                blueSectionName="standardStaffTools"
                checked={ false }
                headerTitle="Standard Staff Tools"
                buttonRowID="standardStaffToolsButtonRow"
                buttons={ [ quickLinks_outlookEmail_button, quickLinks_canvas_button, 
                            quickLinks_illuminate_button, quickLinks_hero_button, 
                            quickLinks_schoolMessenger_button, quickLinks_powerTeacher_button,
                            quickLinks_googleDrive_button, quickLinks_printCenter_button, 
                            quickLinks_helpDesk_button, quickLinks_office365_button,
                            quickLinks_californiaCollegeGuidance_Initiative
                            ] 
                        }
        />]
        </div>
    );
}; 

export default PageContent;