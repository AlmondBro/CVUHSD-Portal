import React from "react";

const PageContent = (props) => {
    return (
        <div class="page-content">
            <section class="blue-section" id="systemStatuses-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="systemStatuses-collapseToggle" />
                <div class="section-header">
                    <h3>System Statuses</h3>
                    <label for="systemStatuses-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="systemStatusesButtonRow">
                    <iframe class="statusEmbed" src='https://www.site24x7.com/sv.do?id=-lTskTIBFC99AjBdJTzdd22ylcZvGBYnfGhcgwvt1-27W89lFFvf7WICSx8TdzUT6kB92hYLWdGYIInKaxcmHcJTzDPBf7IFLjpWmnUEJ18%3D&st=false' scrolling='yes'></iframe>
                </div>
            </section>

            <section class="blue-section" id="quickLinks-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="quickLinks-collapseToggle" checked="" />
                <div class="section-header">
                    <h3>Quick Links</h3>
                    <label for="quickLinks-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="quickLinksButtonRow">
                    <div>
                        <a href="https://sso.centinela.k12.ca.us/adfs/ls/?wa=wsignin1.0&amp;wtrealm=https%3a%2f%2fmail.centinela.k12.ca.us%2fowa%2f&amp;wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&amp;wct=2017-08-21T18%3a05%3a05Z" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/outlook.png" alt="Outlook Email" /></button></a>
                        <a href="https://centinela.instructure.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/canvas.png" alt="Canvas (Learning Management System)" /></button></a>
                        <a href="https://centinela.illuminateed.com/dna/?prev_page=Main_NotDashboardPage&amp;page=SisLogin" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/illuminate.png" alt="Illuminate (Assessments)" title="Illuminate (Assessments)"></button></a>
                        <a href="https://access.heropowered.com/login/centinelavalley-usd" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/hero.png" alt="Hero (PBIS System)"  title="Hero (PBIS System)"></button></a>
                        <a href="https://asp.schoolmessenger.com/centinela" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/schoolmessenger-button.png" alt="School Messenger"  title="School Messenger"></button></a>
                    </div>
                    <div>
                        <a href="https://powerschool.centinela.k12.ca.us/teachers/pw.html" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/PT.png" alt="PowerSchool Teacher" alt="PowerSchool Teacher"></button></a>
                        <a href="https://accounts.google.com/signin/v2/sl/pwd?service=wise&amp;passive=1209600&amp;osid=1&amp;continue=https%3A%2F%2Fdrive.google.com%2F&amp;followup=https%3A%2F%2Fdrive.google.com%2F&amp;emr=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                            target="_blank"><button><img class="img-responsive" href="" src="images/buttons/google-drive.png" alt="Google Drive Button"></button></a>
                        <a href="https://cvprintcenter.myprintdesk.net/DSF/smartstore.aspx#!/Storefront" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/print-center.png" alt="Print Center"></button></a>
                        <a href="https://helpdesk.centinela.k12.ca.us" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/helpdesk.png" alt="Helpdesk (CV It Department)"></button></a>
                        <a href="https://portal.office.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/office365.png" alt="Office 365 Login"></button></a>
                    </div>
                <a href="https://www.californiacolleges.edu/#/user-login" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/ccgi-logo.png" alt="California College Guidance Initiative" style="width:316px; height: 100px;"></button></a>
            <div>
            </div>
                </div>
            </section>
    
            <section class="blue-section" id="standardStaffTools-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="standardStaffTools-collapseToggle" checked />
                <div class="section-header">
                    <h3>Standard Staff Tools</h3>
                    <label for="standardStaffTools-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="standardStaffToolsButtonRow">
                    <div>
                        <a href="https://accounts.google.com/signin/v2/sl/pwd?service=mail&amp;passive=true&amp;rm=false&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;ss=1&amp;scc=1&amp;ltmpl=default&amp;ltmplcache=2&amp;emr=1&amp;osid=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                            target="_blank"><button><img class="img-responsive" href="" src="images/buttons/gmail.png" alt="Gmail"></button></a>
                        <a href="https://accounts.google.com/signin/v2/sl/pwd?service=wise&amp;passive=1209600&amp;osid=1&amp;continue=https%3A%2F%2Fdrive.google.com%2F&amp;followup=https%3A%2F%2Fdrive.google.com%2F&amp;emr=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                            target="_blank"><button><img class="img-responsive" href="" src="images/buttons/google-drive.png" alt="Google Drive Button"></button></a>
                        <a href="https://helpdesk.centinela.k12.ca.us" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/helpdesk.png" alt="Helpdesk (CV It Department)"></button></a>
                        <a href="https://sso.centinela.k12.ca.us/adfs/ls/?wa=wsignin1.0&amp;wtrealm=https%3a%2f%2fmail.centinela.k12.ca.us%2fowa%2f&amp;wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&amp;wct=2017-08-21T18%3a05%3a05Z" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/outlook.png" alt="Outlook Email"></button></a>
                        <a href="https://asp.schoolmessenger.com/centinela" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/schoolmessenger-button.png" alt="School Messenger"  title="School Messenger"></button></a>
                    </div>
    
                    <div>
                        <a href="https://updatemanager:9251/showLogin.cc" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/password-portal.png" alt="Password Assistance"></button></a>
                        <a href="https://cvprintcenter.myprintdesk.net/DSF/smartstore.aspx#!/Storefront" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/print-center.png" alt="Print Center"></button></a>
                        <a href="https://login.schooldude.com/mlogin?productid=community" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/school-dude.png" alt="School Dude"></button></a>
                        <a href="https://siaesolutions.com/portal/?app=behavioralert" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/behavior-alert.png" alt="Behavior Alert" /></button></a>
                    </div>
                </div>
            </section>
    
            <section class="blue-section" id="administratorTools-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="administratorTools-collapseToggle" />
                <div class="section-header">
                    <h3>Administrative Tools</h3>
                    <label for="administratorTools-collapseToggle">
                            <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="administratorToolsButtonRow">
                    {/* <a href="https://www.blackboardconnect.com/signin/default.aspx" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/BB-Admin.png" alt="Blackboard Connect - Admin (Parent Communication)"></button></a>  */}
                    <a href="https://powerschool.centinela.k12.ca.us/admin" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/PS.png" alt="PowerSchool - Admin"></button></a>
                    <a href="https://Smartetools.centinela.k12.ca.us/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/smartetools.png" alt="SmarteTools"></button></a>
                    <a href="https://secure.infosnap.com/admin/login/login.rails?ReturnUrl=%2fadmin" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/infosnap.png" alt="InfoSnap"/></button></a>
                </div>
            </section>
    
            <section class="blue-section" id="teacherTools-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="teacherTools-collapseToggle" />
                <div class="section-header">
                    <h3>Teacher Tools</h3>
                    <label for="teacherTools-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="teacherToolsButtonRow">
                    <div>
                        <a href="https://login.frontlineeducation.com/login?signin=2016ab4880f0c15acd277b718071c1fd&amp;productId=ABSMGMT&amp;clientId=ABSMGMT#/login" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/aesop.png" alt="Frontline (Absence Management/Subfinder)"></button></a>
                        {/* <a href="https://teacher.blackboardconnected.com/Login.aspx" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/BB-Teacher.png" alt="Blackboard Connect - Teacher: (Parent Communication)"></button></a>  */}
                        <a href="https://drive.google.com/drive/folders/0B8DM6hczyKMbfkNvaU9LS3lLanpkS09GTExmTjR3TW0tZzBDYjlZd0ZRNkZKQUpHdERSZ28?usp=sharing" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/CVUHSD-Course-Resources.png" alt="CVUHSD Course Resources (Google Drive)"></button></a>
                    </div>
                    <div>
                        <a href="https://powerschool.centinela.k12.ca.us/teachers/pw.html" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/PT.png" alt="PowerTeacher (GradeBook &amp; Attendance)"></button></a>
                        <a href="http://www.centinela.k12.ca.us/staff_only" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/staff-only.png" alt="Restricted Staff Area (Staff Resources - District Website)"></button></a>
                        <a href="https://drive.google.com/drive/folders/0B_ico1iiP8Effkp5RkE2VnlmSzIybW5YbVRqQnVXb3NZSFIwQ1IwcUdYbEZtNWlvLTJGZHM" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/ed-tech-resources.png" alt="Ed Tech Resources" title="Ed Tech Resources"></button></a>
                        {/* <a href="" target="_blank"><button><img class="img-responsive" href="" src="images/buttons" alt="" title=""></button></a> */}
                    </div>
                    <div>
                        <a href="https://sites.google.com/a/cvuhsd.org/lwlaptopcartsystem/home" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/lawndale-laptop-cart-system.png" alt="Lawndale Laptop Cart System" title="Lawndale Laptop Cart System"></button></a>
                        <a href="https://sites.google.com/a/cvuhsd.org/lzlaptopcartsystem/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/leuzinger-laptop-cart-system.png" alt="Leuzinger Laptop Cart System" title="Leuzinger Laptop Cart System"></button></a>
                        <a href="https://sites.google.com/a/cvuhsd.org/hwlaptopcartsystem/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/hawthorne-laptop-cart-system.png" alt="Hawthorne Laptop Cart System" title="Hawthorne Laptop Cart System"></button></a>
                    </div>
                </div>
            </section>
    
            <section class="blue-section" id="classRoomTools-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="classroomPrograms-collapseToggle" />
                <div class="section-header">
                    <h3>Classroom Tools</h3>
                    <label for="classroomPrograms-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="classroomProgramsButtonRow">
                    <div>
                        <a href="https://centinela.instructure.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/canvas.png" alt="Canvas (Learning Management System)"></button></a>
                        <a href="https://centinela.learn.edgenuity.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/edgenuity.png" alt="Edgenuity (Online Courses)"></button></a>
                        <a href="https://turnitin.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/turnitin.png" alt="TurnItIn.com (Originality Check &amp; Feedback)"></button></a>
                    </div>
                    <div>
                        <a href="https://centinela.illuminateed.com/dna/?prev_page=Main_NotDashboardPage&amp;page=SisLogin" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/illuminate.png" alt="Illuminate (Assessments)" title="Illuminate (Assessments)"></button></a>
                        <a href="https://teacher.goguardian.com/#/classrooms/active" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/GoGuardian.png" alt="Go Guardian" title="Go Guardian"></button></a>
                        <a href="https://access.heropowered.com/login/centinelavalley-usd" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/hero.png" alt="Hero (PBIS System)"  title="Hero (PBIS System)"></button></a>
                    </div>
                </div>
            </section>
    
            <section class="blue-section" id="learningTools-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="learningTools-collapseToggle" />
                <div class="section-header">
                    <h3>Learning Tools</h3>
                    <label for="learningTools-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="learningToolsButtonRow">
                    <div>
                        <a href="https://www.brainpop.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/BrainPop.png" alt="BrainPop"></button></a>
                        <a href="https://hwread180.centinela.k12.ca.us:56243/slms/EducatorAccess" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Read180HW-Teacher.png" alt="Read 180/System 44-HW Teacher"></button></a>
                        <a href="https://lwread180.centinela.k12.ca.us:56243/slms/EducatorAccess" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Read180LW-Teacher.png" alt="Read 180/System 44-LW Teacher"></button></a>
                    </div>

                    <div>
                        <a href="https://lzread180.centinela.k12.ca.us:56243/slms/EducatorAccess" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Read180LZ-Teacher.png" alt="Read 180/System 44-LZ Teacher"></button></a>
                        <a href="https://schools.shmoop.com/login/centinela-valley-UHSD" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/shmoop.png" alt="Shmoop"></button></a>
                        <a href="https://clever.com/oauth/instant-login?client_id=2b024c690549687be970&district_id=5283beba2c067cd50b000031" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/everfi.jpg" alt="Everfi"></button></a>
                    </div>
                </div>
            </section>
    
            <section class="blue-section" id="digitalTextbooks-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="digitalTextbooks-collapseToggle" />
                <div class="section-header">
                    <h3>Digital Textbooks</h3>
                    <label for="digitalTextbooks-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="digitalTextbooksButtonRow">
                    <a href="https://my.hrw.com/sp/access?sp=hrw&connection=CA-CVUHSD-00067204" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/HMH.png" alt="Holt McDougal (Online Textbooks)"></button></a>
                    <a href="https://learningsite.waysidepublishing.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Wayside-Publishing.png" alt="Wayside Publishing" title="Wayside Publishing"></button></a>
                </div>
            </section>
    
            <section class="blue-section" id="mediaResources-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="mediaResources-collapseToggle" />
                <div class="section-header">
                    <h3>Digital Library Resources</h3>
                    <label for="mediaResources-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div class="row button-row" id="mediaResourcesButtonRow">
                    <div>
                        <a href="http://cvod.infobase.com/p_Home.aspx" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/CVOD.png" alt="Classroom Video on Demand (Educational Video Streaming)" width="316" style="width: 316px;"></button></a>
                        <a href="http://destiny.centinela.k12.ca.us/" target="_blank"><button><img class="img-responsive nonButtonImages" href="" src="images/buttons/Destiny.png" alt="Destiny"></button></a>
                        <a href="http://search.ebscohost.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/EBSCO.png" alt="EBSCO (Research Databases)"></button></a>
                        <a href="http://centinela.lib.overdrive.com/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Overdrive.png" alt="Overdrive (Ebooks)"></button></a>
                    </div>
    
                    <div>
                <a href="http://media.lacoe.edu" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/lacoe-media.jpg" alt="LACOE" style="width: 316px;"/></button/></a>
                        <a href="http://web.b.ebscohost.com/eon/search/basic?sid=a4eca46f-31e5-4e5b-a010-c8e57da30aeb%40sessionmgr102&amp;vid=0&amp;hid=125" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/FlipsterLW.png" alt="Flipster LW (E-Magazines)"></button></a>
                        <a href="http://web.b.ebscohost.com/eon/search/basic?sid=a4eca46f-31e5-4e5b-a010-c8e57da30aeb%40sessionmgr102&amp;vid=0&amp;hid=125" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/FlipsterLZ.png" alt="Flipster LZ (E-Magazines)"></button></a>
                        <a href="http://web.b.ebscohost.com/eon/search/basic?sid=10e9224c-4ef8-4d69-805f-55d64d31a26f%40sessionmgr103&amp;vid=0&amp;hid=125" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/FlipsterHW.png" alt="Flipster HW (E-Magazines)"></button></a>
                    </div>
                </div>
            </section>
    
            <section class="blue-section" id="schoolWebsites-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="schoolWebsites-collapseToggle" />
                <div class="section-header">
                    <h3>School Websites</h3>
                    <label for="schoolWebsites-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                <div id="schoolWebsitesButtonRow" class="row">
                    <div>
                        <a href="https://www.centinela.k12.ca.us" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/CV-Website.png" alt="CV Website"></button></a>
                        <a href="https://www.cvalternatives.org/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/CVISS-Website.png" alt="CVISS Website"></button></a>
                        <a href="https://www.lloydehs.org" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/LL-Website.png" alt="Lloyde Website"></button></a>
                    </div>
                    <div>
                        <a href="https://www.lawndalehs.org/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/LW-Website.png" alt="Lawndale Website"></button></a>
                        <a href="https://www.leuzinger.org/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/LZ-Website.png" alt="Leuzinger Website"></button></a>
                        <a href="https://www.hhscougars.org/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/HW-Website.png" alt="Hawthorne Website"></button></a>
                    </div>
                    <div>
                        <a href="http://admin.centinela.k12.ca.us/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Edlio-CVUHSD.png" alt="Edlio Website Administraton - Centinela Valley Union High School District (CVUHSD)"></button></a>
                        <a href="https://cvalternatives.edlioadmin.com/apps/login/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Edlio-CVISS.png" alt="Edlio Website Administraton - Centinela Valley Independent Study"></button></a>
                        <a href="https://lloydehs.edlioadmin.com/apps/login/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Edlio-LL.png" alt="Edlio Website Administration - Lloyde"></button></a>
                    </div>
                    <div>
                        <a href="https://lawndalehigh.edlioadmin.com/apps/login/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Edlio-LW.png" alt="Edlio Website Administration - Lawndale"></button></a>
                        <a href="https://hhscougars.edlioadmin.com/apps/login/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Edlio-HW.png" alt="Edlio Website Administration - Hawthorne"></button></a>
                        <a href="https://leuzinger.edlioadmin.com/apps/login/" target="_blank"><button><img class="img-responsive" href="" src="images/buttons/Edlio-LZ.png" alt="Edlio Website Administration - Leuzinger"></button></a>
                    </div>
                </div>
            </section>
    
            <section class="blue-section" id="allTools-blueSection">
                <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id="webAdmin-collapseToggle" checked />
                <div class="section-header">
                    <h3>ALL LINKS</h3>
                    <label for="webAdmin-collapseToggle">
                        <div class="open-column-button"></div>
                    </label>
                </div>
                {/* <div class="row button-row admin-links" id="webAdminButtonRow">  */}
                <div class="row admin-links" id="webAdminButtonRow">
                    <iframe class="google-sheet" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSOPMzFTLmTXsOzY172KN_3IaJqeO9bLPl_3TIgc_bBQiWEanznykV6cEiPBuV9WUHEnL2vesphHEWZ/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false">
                </iframe>
                </div>
            </section>
        </div>
    );
}; 

export default PageContent;