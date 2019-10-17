import { staffPortalButtons } from "./portalButtons.js"

//TODO: Add an appear as mobile link property 
let blueSectionInfo_systemStatuses = {
    blueSectionName: "systemStatuses",
    expanded: false,
    headerTitle: "System Statuses",
    buttonRowID: "systemStatusesButtonRow",
    buttons: "undefined"
};

let blueSectionInfo_quickLinks = {
    blueSectionName: "quickLinks",
    expanded: true,
    headerTitle: "Quick Links",
    buttonRowID: "quickLinksButtonRow",
    buttons: staffPortalButtons.quickLinks
};

let blueSectionInfo_standardStaffTools = {
    blueSectionName: "standardStaffTools",
    expanded: false,
    headerTitle: "Standard Staff Tools",
    buttonRowID: "standardStaffToolsButtonRow",
    buttons: staffPortalButtons.standardStaffTools
};

let blueSectionInfo_administratorTools = {
    blueSectionName: "administratorTools",
    expanded: false,
    headerTitle: "Administrative Tools",
    buttonRowID: "administratorToolsButtonRow",
    buttons: staffPortalButtons.administrativeTools
};

let blueSectionInfo_teacherTools = {
    blueSectionName: "teacherTools",
    expanded: false,
    headerTitle: "Teacher Tools",
    buttonRowID: "teacherToolsButtonRow",
    buttons: staffPortalButtons.teacherTools
};

let blueSectionInfo_classRoomTools = {
    blueSectionName: "classroomTools",
    expanded: false,
    headerTitle: "Classroom Tools",
    buttonRowID: "classroomToolsButtonRow",
    buttons: staffPortalButtons.classroomTools
};

let blueSectionInfo_learningTools = {
    blueSectionName: "learningTools",
    expanded: false,
    headerTitle: "Learning Tools",
    buttonRowID: "learningToolsButtonRow",
    buttons: staffPortalButtons.learningTools
};

let blueSectionInfo_digitalTextbooks = {
    blueSectionName: "digitalTextbooks",
    expanded: false,
    headerTitle: "Digital Textbooks",
    buttonRowID: "digitalTextbooksButtonRow",
    buttons: staffPortalButtons.digitalTextbooks
};

let blueSectionInfo_schoolWebsites = {
    blueSectionName: "schoolWebsites",
    expanded: false,
    headerTitle: "School Websites",
    buttonRowID: "schoolWebsitesButtonRow",
    buttons: staffPortalButtons.schoolWebsites
};

let blueSectionInfo_allLinks = {
    blueSectionName: "allTools",
    expanded: true,
    headerTitle: "ALL LINKS",
    buttonRowID: "webAdminButtonRow"
};

let blueSectionInfo_Staff = [
    blueSectionInfo_systemStatuses,
    blueSectionInfo_quickLinks,
    blueSectionInfo_standardStaffTools,
    blueSectionInfo_administratorTools,
    blueSectionInfo_teacherTools,  
    blueSectionInfo_learningTools,
    blueSectionInfo_classRoomTools,
    blueSectionInfo_digitalTextbooks,
    blueSectionInfo_schoolWebsites,
    blueSectionInfo_allLinks
];

export { blueSectionInfo_Staff };