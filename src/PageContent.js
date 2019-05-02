import React from "react";

import BlueSection from "./BlueSection.js"

const PageContent = (props) => {
    let quickLinks = {
        outlookEmail_button : {
            buttonLink: "https://sso.centinela.k12.ca.us/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fmail.centinela.k12.ca.us%2fowa%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&wct=2017-08-21T18%3a05%3a05Z",
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

    let standardStaffTools = {
        gmail_button : {
            buttonLink: "https://accounts.google.com/signin/v2/sl/pwd?service=mail&amp;passive=true&amp;rm=false&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;ss=1&amp;scc=1&amp;ltmpl=default&amp;ltmplcache=2&amp;emr=1&amp;osid=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin",
            buttonImg: "gmail.png",
            description: "Gmail"
        },

        googleDrive_button : {
            buttonLink: "https://accounts.google.com/signin/v2/sl/pwd?service=wise&amp;passive=1209600&amp;osid=1&amp;continue=https%3A%2F%2Fdrive.google.com%2F&amp;followup=https%3A%2F%2Fdrive.google.com%2F&amp;emr=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin",
            buttonImg: "google-drive.png",
            description: "Google Drive"
        },

        helpDesk_button : {
            buttonLink: "https://helpdesk.centinela.k12.ca.us",
            buttonImg: "helpdesk.png",
            description: "Helpdesk (CV It Department)"
        },

        outlook_button : {
            buttonLink: "https://sso.centinela.k12.ca.us/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fmail.centinela.k12.ca.us%2fowa%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&wct=2017-08-21T18%3a05%3a05Z",
            buttonImg: "outlook.png",
            description: "Outlook E-mail"
        },

        schoolMessenger_button: {
            buttonLink: "https://asp.schoolmessenger.com/centinela",
            buttonImg: "schoolmessenger-button.png",
            description: "School Messenger"
        },

        passwordPortal_button: {
            buttonLink: "https://updatemanager:9251/showLogin.cc",
            buttonImg: "password-portal.png",
            description: "Password Assistance"
        },

        printCenter_button : {
            buttonLink: "https://cvprintcenter.myprintdesk.net/DSF/smartstore.aspx#!/Storefron",
            buttonImg: "print-center.png",
            description: "Print Center"
        },

        schoolDude_button : {
            buttonLink: "https://login.schooldude.com/mlogin?productid=community",
            buttonImg: "school-dude.png",
            description: "School Dude"
        },

        behaviorAlert_button : {
            buttonLink: "https://siaesolutions.com/portal/?app=behavioralert",
            buttonImg: "behavior-alert.png",
            description: "Behavior Alert"
        }
    }; //end standardStaffTools

    let administrativeTools = {
       powerSchool_button : {
            buttonLink: "https://powerschool.centinela.k12.ca.us/admin",
            buttonImg: "PS.png",
            description: "PowerSchool (Admin)"
        },

        smarteTools_button : {
            buttonLink: "https://Smartetools.centinela.k12.ca.us/",
            buttonImg: "smartetools.png",
            description: "SmartETools"
        },
        
        infoSnap_button : {
            buttonLink: "https://secure.infosnap.com/admin/login/login.rails?ReturnUrl=%2fadmin",
            buttonImg: "infosnap.png",
            description: "InfoSnap"
        }
    }; //end administrativeTools

    let teacherTools = {
        frontLine_button : {
            buttonLink: "https://login.frontlineeducation.com/login?signin=dc20373fccea7afc2e324f7ceec30775&productId=ABSMGMT&clientId=ABSMGMT#/login",
            buttonImg: "aesop.png",
            description: "Frontline (Absence Management/Subfinder)"
        },

        cvuhsdCourseResources_button : {
            buttonLink: "https://drive.google.com/drive/folders/0B8DM6hczyKMbfkNvaU9LS3lLanpkS09GTExmTjR3TW0tZzBDYjlZd0ZRNkZKQUpHdERSZ28?usp=sharing",
            buttonImg: "cvuhsd-course-resources.png",
            description: "CVUHSD Course Resources (Google Drive)"
        },

        powerTeacher_button : {
            buttonLink: "https://powerschool.centinela.k12.ca.us/teachers/pw.html",
            buttonImg: "PT.png",
            description: "PowerTeacher (GradeBook &amp; Attendance)"
        },

        cvRestricted_button : {
            buttonLink: "http://www.centinela.k12.ca.us/staff_only",
            buttonImg: "staff-only.png",
            description: "Restricted Staff Area (Staff Resources - District Website)"
        },

        edTechResources_button : {
            buttonLink: "https://drive.google.com/drive/folders/0B_ico1iiP8Effkp5RkE2VnlmSzIybW5YbVRqQnVXb3NZSFIwQ1IwcUdYbEZtNWlvLTJGZHM",
            buttonImg: "ed-tech-resources.png",
            description: "Ed Tech Resources"
        },
        
        lawndaleLaptopCartSystem_button : {
            buttonLink: "https://sites.google.com/a/cvuhsd.org/lwlaptopcartsystem/home",
            buttonImg: "lawndale-laptop-cart-system.png",
            description: "Lawndale Laptop Cart System"
        },
        
        leuzingerLaptopCartSystem_button : {
            buttonLink: "https://sites.google.com/a/cvuhsd.org/lzlaptopcartsystem/",
            buttonImg: "Hawthorne-laptop-cart-system.png",
            description: "Leuzinger Laptop Cart System"
        },

        hawthorneLaptopCartSystem_button : {
            buttonLink: "https://sites.google.com/a/cvuhsd.org/hwlaptopcartsystem/",
            buttonImg: "Hawthorne-laptop-cart-system.png",
            description: "Hawthorne Laptop Cart System"
        }
    } ; //end teacherTools

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
                buttons={ standardStaffTools }
            />
            <BlueSection 
                blueSectionName="administratorTools"
                expanded={ false }
                headerTitle="Administrative Tools"
                buttonRowID="administratorToolsButtonRow"
                buttons={ administrativeTools }
            />
             <BlueSection 
                blueSectionName="teacherTools"
                expanded={ false }
                headerTitle="Teacher Tools"
                buttonRowID="teacherToolsButtonRow"
                buttons={ teacherTools }
            />
        </div>
    );
}; 

export default PageContent;