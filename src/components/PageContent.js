import React from "react";

import BlueSection from "./BlueSection/BlueSection.js";

import { staffPortalButtons } from "./../portalButtons.js";

const PageContent = (props) => {
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
                buttons={ staffPortalButtons.quickLinks }
            />
            <BlueSection 
                blueSectionName="standardStaffTools"
                expanded={ false }
                headerTitle="Standard Staff Tools"
                buttonRowID="standardStaffToolsButtonRow"
                buttons={ staffPortalButtons.standardStaffTools }
            />
            <BlueSection 
                blueSectionName="administratorTools"
                expanded={ false }
                headerTitle="Administrative Tools"
                buttonRowID="administratorToolsButtonRow"
                buttons={ staffPortalButtons.administrativeTools }
            />
             <BlueSection 
                blueSectionName="teacherTools"
                expanded={ false }
                headerTitle="Teacher Tools"
                buttonRowID="teacherToolsButtonRow"
                buttons={ staffPortalButtons.teacherTools }
            />
            <BlueSection 
                blueSectionName="classroomTools"
                expanded={ false }
                headerTitle="Classroom Tools"
                buttonRowID="classroomToolsButtonRow"
                buttons={ staffPortalButtons.classroomTools }
            />
            <BlueSection 
                blueSectionName="learningTools"
                expanded={ false }
                headerTitle="Learning Tools"
                buttonRowID="learningToolsButtonRow"
                buttons={ staffPortalButtons.learningTools }
            />
             <BlueSection 
                blueSectionName="digitalTextbooks"
                expanded={ false }
                headerTitle="Digital Textbooks"
                buttonRowID="digitalTextbooksButtonRow"
                buttons={ staffPortalButtons.digitalTextbooks }
            />
            <BlueSection 
                blueSectionName="schoolWebsites"
                expanded={ false }
                headerTitle="School Websites"
                buttonRowID="schoolWebsitesButtonRow"
                buttons={ staffPortalButtons.schoolWebsites }
            />
             <BlueSection 
                blueSectionName="allTools"
                expanded={ true }
                headerTitle="ALL LINKS"
                buttonRowID="webAdminButtonRow"
            />
        </div>
    );
}; 

export default PageContent;