import { staffPortalButtons, studentPortalButtons } from "./portalButtons.js"

//TODO: Add an appear as mobile link property 
let blueSectionInfo_systemStatuses = {
    blueSectionName: "systemStatuses",
    expanded: false,
    headerTitle: "System Statuses",
    buttonRowID: "systemStatusesButtonRow",
    showInMobileNav: true,
    showInDesktopNav: true, 
    buttons: "undefined"
};

let blueSectionInfo_quickLinks = {
    blueSectionName: "quickLinks",
    expanded: true,
    headerTitle: "Quick Links",
    buttonRowID: "quickLinksButtonRow",
    showInMobileNav: "",
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


let blueSectionInfo_digitalLibraryResources = {
    blueSectionName: "digitalLibraryResources",
    expanded: false,
    headerTitle: "Digital Library Resources",
    buttonRowID: "digitalLibraryResourcesButtonRow",
    buttons: staffPortalButtons.digitalLibraryResources
};

let blueSectionInfo_schoolWebsites = {
    blueSectionName: "schoolWebsites",
    expanded: false,
    headerTitle: "School Websites",
    buttonRowID: "schoolWebsitesButtonRow",
    buttons: staffPortalButtons.schoolWebsites
};

let blueSectionInfo_resourcesAndTraining = {
    blueSectionName: "resourcesAndTraining",
    expanded: false,
    headerTitle: "RESOURCES AND TRAINING",
    buttonRowID: "resourcesAndTrainingButtonRow",
    buttons: staffPortalButtons.resourcesAndTraining
};

let blueSectionInfo_allLinks = {
    blueSectionName: "allTools",
    expanded: true,
    headerTitle: "ALL LINKS",
    buttonRowID: "allToolsButtonRow"
};

let blueSectionInfo_Staff = [
    blueSectionInfo_systemStatuses,
    blueSectionInfo_quickLinks,
    blueSectionInfo_standardStaffTools,
    blueSectionInfo_administratorTools,
    blueSectionInfo_teacherTools,  
    blueSectionInfo_classRoomTools,
    blueSectionInfo_learningTools,
    blueSectionInfo_digitalTextbooks,
    blueSectionInfo_digitalLibraryResources,
    blueSectionInfo_schoolWebsites,
    blueSectionInfo_resourcesAndTraining,
    blueSectionInfo_allLinks
];

let redSectionInfo_quickLinks = {
    blueSectionName: "quickLinks",
    expanded: true,
    headerTitle: "Quick Links",
    buttonRowID: "quickLinksButtonRow",
    showInMobileNav: "",
    buttons: studentPortalButtons.quickLinks
};

let redSectionInfo_standardStudentTools = {
    blueSectionName: "standardStaffTools",
    expanded: false,
    headerTitle: "Standard Student Tools",
    buttonRowID: "standardStaffToolsButtonRow",
    buttons: studentPortalButtons.standardStudentTools
};

let redSectionInfo_classRoomTools = {
    blueSectionName: "classroomTools",
    expanded: false,
    headerTitle: "Classroom Tools",
    buttonRowID: "classroomToolsButtonRow",
    buttons: studentPortalButtons.classroomTools
};

let redSectionInfo_learningTools = {
    blueSectionName: "learningTools",
    expanded: false,
    headerTitle: "Learning Tools",
    buttonRowID: "learningToolsButtonRow",
    buttons: studentPortalButtons.learningTools
};

let redSectionInfo_digitalTextbooks = {
    blueSectionName: "digitalTextbooks",
    expanded: false,
    headerTitle: "Digital Textbooks",
    buttonRowID: "digitalTextbooksButtonRow",
    buttons: studentPortalButtons.digitalTextbooks
};

let redSectionInfo_digitalLibraryResources = {
    blueSectionName: "digitalLibraryResources",
    expanded: false,
    headerTitle: "Digital Library Resources",
    buttonRowID: "digitalLibraryResourcesButtonRow",
    buttons: studentPortalButtons.digitalLibraryResources
};

let redSectionInfo_schoolWebsites = {
    blueSectionName: "schoolWebsites",
    expanded: false,
    headerTitle: "School Websites",
    buttonRowID: "schoolWebsitesButtonRow",
    buttons: studentPortalButtons.schoolWebsites
};

let redSectionInfo_laCountyHotspotLocator = {
    blueSectionName: "laCountyHotSpotLocator",
    expanded: false,
    headerTitle: "Los Angeles County Hotspot Locator",
    buttonRowID: "laCountyHotSpotLocatorButtonRow"
};

let redSectionInfo_allLinks = {
    blueSectionName: "allTools",
    expanded: true,
    headerTitle: "ALL LINKS",
    buttonRowID: "allToolsButtonRow"
};

let redSectionInfo_Student = [
    redSectionInfo_laCountyHotspotLocator,
    redSectionInfo_quickLinks,
    redSectionInfo_standardStudentTools,
    redSectionInfo_classRoomTools,
    redSectionInfo_learningTools,
    redSectionInfo_digitalTextbooks,
    redSectionInfo_digitalLibraryResources,
    redSectionInfo_schoolWebsites, 
    redSectionInfo_allLinks
];

export { blueSectionInfo_Staff, redSectionInfo_Student };