import React, { Fragment } from "react";

//Import App components
import BlueSection from "./../BlueSection/BlueSection.js";
import Header from "./../Header/Header.js";

//Import list of buttons
import { blueSectionInfo_Staff , redSectionInfo_Student} from "./../../objectFiles/blueSectionInfo.js";

const Troubleshooting = (props) => {

    let generateBlueSections = (blueSection_objectsArray) => {
        return blueSection_objectsArray.map( (blueSection_Object, index) => {
            return (
                <BlueSection 
                    blueSectionName={blueSection_Object.blueSectionName}
                    expanded={ blueSection_Object.expanded }
                    headerTitle={blueSection_Object.headerTitle}
                    buttonRowID={blueSection_Object.buttonRowID}
                    buttons={blueSection_Object.buttons}
                    key={index}
                    title={"Student"}
                    renderAsStudent={(window.location.pathname === "/student")}
                    // {this.renderAsStudent || this.props.location.state.renderAsStudent}
                />
            );
        });
    }; //end generateBlueSections()

    return (
        <Fragment>
             <Header districtName="CVUHSD" 
                    headerTitle="Troubleshooting" 
                    portalHeaderTextDisplay={"none"}
                    // fullName={ this.props.fullName || undefsafe(this.state, "fullName")|| "CVUHSD User"} 
                    // title={this.props.title}
                    // site={this.props.site}
                    // gradeLevel={this.props.gradeLevel}

                    //modifyLogInStatus={ this.modifyLogInStatus }
                    // modifyTitle={this.modifyTitle}
                    // modifySite={this.modifySite}
                    // logOut={this.props.logOut}
                    // clearState={this.props.clearState}
                    // renderAsStudent={(window.location.pathname === "/student")}
                
            />
            <div className="troubleshooting-page-content">
                { generateBlueSections(blueSectionInfo_Staff)} 
            </div>
        </Fragment>
    );
}; //end Troubleshooting()

export default Troubleshooting;