import React from "react";

import BlueSection from "./BlueSection.js"

const PageContent = (props) => {
    let quickLinks = {
        outlookEmail_button : {
            buttonLink: "https://sso.centinela.k12.ca.us/adfs/ls/?wa=wsignin1.0&amp;wtrealm=https%3a%2f%2fmail.centinela.k12.ca.us%2fowa%2f&amp;wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&amp;wct=2017-08-21T18%3a05%3a05Z",
            buttonImg: "Outlook.png",
            description: "Outlook E-mail"
        },
    
        canvas_button : {
            buttonLink: "https://centinela.instructure.com/",
            buttonImg: "canvas.png",
            description: "Canvas (Learning Management System)"
        },
    
        illuminate_button : {
            buttonLink: "https://centinela.illuminateed.com/dna/?prev_page=Main_NotDashboardPage&amp;page=SisLogin",
            buttonImg: "illuminate.png",
            description: "Illuminate (Assessments)"
        },
    
        hero_button : {
            buttonLink: "https://access.heropowered.com/login/centinelavalley-usd",
            buttonImg: "hero.png",
            description: "Hero (PBIS System)"
        },
        
        schoolMessenger_button : {
            buttonLink: "https://asp.schoolmessenger.com/centinela",
            buttonImg: "schoolmessenger-button.png",
            description: "School Messenger"
        },
    
        powerTeacher_button : {
            buttonLink: "https://powerschool.centinela.k12.ca.us/teachers/pw.html",
            buttonImg: "PT.png",
            description: "PowerSchool Teacher"
        },
    
        googleDrive_button : { 
            buttonLink: "https://accounts.google.com/signin/v2/sl/pwd?service=wise&amp;passive=1209600&amp;osid=1&amp;continue=https%3A%2F%2Fdrive.google.com%2F&amp;followup=https%3A%2F%2Fdrive.google.com%2F&amp;emr=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin",
            buttonImg: "google-drive.png",
            description: "Google Drive"
        },
    
        printCenter_button : {
            buttonLink: "https://cvprintcenter.myprintdesk.net/DSF/smartstore.aspx#!/Storefront",
            buttonImg: "print-center.png",
            description: "Printer Center"
        },
    
        helpDesk_button : {
            buttonLink: "https://helpdesk.centinela.k12.ca.us",
            buttonImg: "helpdesk.png",
            description: "Helpdesk (C.V. I.T. Department)"
        },
    
        office365_button : {
            buttonLink: "https://portal.office.com/",
            buttonImg: "office365.png",
            description: "Office 365 Login"
        },
    
        californiaCollegeGuidance_Initiative : {
            buttonLink: "https://www.californiacolleges.edu/#/user-login",
            buttonImg: "ccgi-logo.png",
            description: "California College Guidance Initiative"
        }
    }; //end quickLinks

    return (
        <div className="page-content">
            <BlueSection 
                blueSectionName="systemStatuses"
                expanded={ false }
                headerTitle="System Statuses"
                buttonRowID="systemStatusesButtonRow"
            />
            <BlueSection 
                blueSectionName="quickLinks"
                expanded={ true }
                headerTitle="Quick Links"
                buttonRowID="quickLinksButtonRow"
                buttons={ quickLinks }
            />
            <BlueSection 
                blueSectionName="standardStaffTools"
                expanded={ false }
                headerTitle="Standard Staff Tools"
                buttonRowID="standardStaffToolsButtonRow"
        />
        </div>
    );
}; 

export default PageContent;