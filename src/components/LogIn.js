import React, { Component } from 'react';

import {  Redirect, withRouter } from 'react-router'

import ReactLoading from 'react-loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

import undefsafe from 'undefsafe';

import isDev from 'isdev';

import { isEmpty } from "./../utilityFunctions.js";

//TODO: Create function that fetches the IP Address
//TODO: Create reset-password functionality
//TODO: Save the app state to local storage or use redux 
//TODO: Add modal that appears on the login page after a user logs out
//TODO: FInd where the title dialogs with the user district position is appearing
//TODO: Figure out why there is still an "x" button even when you successfully login

let Form = styled("form")`
    /* font-family: "Montserrat", sans-serif; */
    max-width: 300px;
    margin: 10px auto;
    text-align: center;
    background-color: #182c3d;
    color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    border-radius: 0.2em;
    border: 2px solid #1f6b92;
`;

let FormHeader = styled("h3")`
    font-family: "Montserrat", sans-serif;
    /* background-color: #213e56; */
    border-bottom: 2px solid white;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
`;

let FormInput = styled("input")`
    font-family: "Montserrat", sans-serif;
    width: 90%;
    padding: 8px; /*was 8px */
    padding-left: 60px;
    text-align: left;

    &::placeholder,
    &::-webkit-input-placeholder,
    &:-ms-input-placeholder  {
        color: #a4becc;
        text-align: center;
        font-family: "Montserrat", sans-serif;
    }

`;

let FormInputLabel = styled("label")`
    cursor: pointer;
    background-color: #eeeeee;
    color: #336186;
    font-size: 1.38em;
    position: absolute;
    padding: 4px;
    padding-right: 6px;
    margin-top: 2px;
    border-right: 1px solid #182c3d;
    box-shadow: none;
    z-index: 1;
    transition: 0.5s;

    &:hover {
        color: #4785b7;
        background-color: white;
    }
`

let FormButton = styled("button")`
    display: inline-block;
    margin: 5px 3px;
    font-family: "Montserrat", sans-serif;
    border-radius: 5px;
    width: 80px;
    border: 0px;
    padding: 0.5em;
    background-color: #336186;
    color: white;
    transition: background-color 0.5s;
    text-align: center;

    &:hover, &:active, &:focus  {
        background-color: #3b709a;
    }
`;

let ResetButton = styled(FormButton)`
    background-color: #757575;

    &:hover {
        background-color: #adadad;  
    }
`;

let PortalLogo = styled("img")`
    max-width: 150px;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

let CVUHSDLogo = styled("img")`
    max-width: 70px;
    display: inline-flex;
    margin-right: 37px;
`;

let ResultButton = styled("span")`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    cursor: pointer;
    font-size: 1.5em;
    margin: 0 auto;
    margin-top: 0.3em;
    margin-bottom: 10px;
    background-color: ${props => props.loggedIn ? "white" : "red"};
    max-width: 35px;
    width: 35px;
    height: 35px;
    color: ${props => props.loggedIn ? "#336186" : "white"};
    font-weight: bolder;
    border-radius: 100px;
    text-align: center;
    max-width: 100%;
`;

let ErrorTextAlert = styled("span")`
    display: inline-block;
    color: red;
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 10px;
    max-width: 100%;
`;

let FormHeaderText = styled("p")`
    display: flex;                                                                                                                                                                                                                                                                                                                      
    align-self: center;
`;

let ResultMessage = styled('span')`
    display: block;
    font-size: 0.8em;
    color: white;
    font-family: "Montserrat", sans-serif;

    max-width: 80%;
    margin: 0 auto;
`;

let Footer = styled('footer')`
    display: flex;
    position: fixed;
    width: 100%;
    top: 95%;
    color: white;
    background-color: #182c3d;
    border-top: 1px solid white;
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px;

    & ul {
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        width: 100%;
    }

    & ul li a {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        color: white;
        text-decoration: none;
        margin-left: 10px;
    }


    & ul li {
        color: white; 
    }

    & ul li a:hover {
        text-decoration: underline;
    }

    & ul li a::before {
        content: "•";
        margin: 0 5px;
    }
`;

let IPAddress = styled('div')`
    position: relative;
    display: inline-block;
    color: white;
    text-align: center;

    & span {
        font-weight: bolder;
    }
`;

let IPLoadingContainer = styled('span')`
    display: inline-block;
    position: relative;
    margin-left: 5px;
`;

let StyledLoadingContainer = styled('span')`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    z-index: 1;
`;

const LoadingSpinner = ({ type, color, height, width}) => (
    <StyledLoadingContainer>
        <ReactLoading type={type} color={color} height={height} width={width} />
    </StyledLoadingContainer>  
);


class LogIn extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loggedIn: null,
            isStudent: true,
            username: "",
            password: "",
            userInfo: {
                firstName: "",
                lastName: "",
                title: "",
                site: ""
            },

            firstName: "",
            lastName: "",
            title: "",
            site: "",

            message: "Enter username & password to login",
            isLoading: false,
            ipAddress: ""
        }; //end state object

        
        //this.modifyLogInStatus = this.props.modifyLogInStatus;
        this.modifyStudentStatus = this.props.modifyStudentStatus;
        this.modifyFullName = this.props.modifyFullName;
        this.modifyTitle = this.props.modifyTitle;
        this.modifySite = this.props.modifySite;

        this.user_name_only = ""; 
        
        console.log("Props:\t" + JSON.stringify(this.props) );
    }; //end constructor

    //TODO: Find out why it's the props passed down from the central App state are not passed down in time. 
    modifyLogInStatus = (newStatus) => {
        this.setState({ loggedIn: newStatus});

        setTimeout((response) => {
            //browserHistory.push("/page-content");
            console.log("Initiating timeout...");
            this.props.modifyLogInStatus(newStatus);
            return response;
        }, 300);
    }; //end modifyLogInStatus


    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        });
    };

    validUser = () => {
        console.log("checkUser() username");
        let { username, password} = this.state;

        let lowerCase_Username = username.toLowerCase();

        let userName, emailDomain;

        let userCheck, validDomain = false;

        let userName_length = lowerCase_Username.length;

        console.log(`Is empty:\t ${isEmpty(" ")} ${isEmpty(userName)}`);

        console.log(`Is empty username and password:\t ${isEmpty(username)} ${isEmpty(password)}`);

        if (isEmpty(username) && isEmpty(password)) {
            this.modifyLogInStatus(false);
            console.log("Username and password are empty");
            this.setState({isLoading: false, message: "Please enter a username and password."})
            userCheck = false;
        }

        else if (isEmpty(password) && !isEmpty(username) ) {
            this.modifyLogInStatus(false);
            console.log("Just password is empty.");
            this.setState({isLoading: false, message: "Please enter a password."})
            userCheck = false;
        }

        else if (!isEmpty(password) && isEmpty(username) ) {
            this.modifyLogInStatus(false);
            console.log("Just username is empty.");
            this.setState({isLoading: false, message: "Please enter a username."})
            userCheck = false;
        } else {
            userCheck = true;
        }


        let domainCheck = () => {
            //May not need for loop, refer to here: 
            // https://stackoverflow.com/questions/39583549/how-do-i-have-javascript-get-a-substring-before-a-character
            for (let index = 0; index < userName_length; index++) {
                let individualCharacter = lowerCase_Username.charAt(index);
                
                if (individualCharacter === "@") {
                    emailDomain = lowerCase_Username.substring(index, userName_length); 
                    this.user_name_only = lowerCase_Username.split("@")[0]; //Splits string into array using the "@" as a delimiter. Get the first element in the array.

                    console.log("this.user_name_only: (from outermost if)\t" + this.user_name_only);

                    if ( (emailDomain !== "@cvuhsd.org") || (emailDomain !==  "@centinela.k12.ca.us") ) {
                        this.modifyLogInStatus(false);
                        this.setState({isLoading: false, message: "Please enter a valid CVUHSD email. Not a personal e-mail."})
                        userCheck = false;
                    } //end inner-if
                    if ((emailDomain === "@cvuhsd.org") || (emailDomain ===  "@centinela.k12.ca.us")) {
                        //userCheck = true;
                        validDomain = true;
                        this.setState(
                            {
                                isLoading: false, 
                                message: "Success -- valid CVUHSD email."
                            }
                        );
                    }
                } //end outer-if
                else {
                    this.modifyLogInStatus(false);
                    this.setState({isLoading: false, message: "Please enter a valid CVUHSD email."})
                    userCheck = false;
                }
            } //end for statement 
        };

        if (userCheck === true) {
            domainCheck();
        } //end if-statement
  
        console.log("emailDomain:\t" + emailDomain);
        return validDomain;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let allowAuth = true;

        console.log("Submitting...");

        let { username, password} = this.state;

        let connectToServer = () => {
                
            let logIn_URL = `${isDev ? "" : "/server" }/login`

            this.setState({isLoading: true, message: "Loading..."});

            //TODO: Remove in final production build -- only here to mimic successful login.
            let nullFunction = () => {
                return null;
            }; //end nullFunction()

            //let isDev = false;
            let headers = {
                'Content-Type': 'application/json',
                'credentials': 'include',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            };
            
            //this.setState({username: this.state.usernameOnly});
            console.log(`this.user_name_only (from connect to server): ${this.user_name_only}`);
            console.log(`Username: ${this.state.username}`);
            
            fetch(logIn_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({username: this.user_name_only, password: password})
            }).then((response) => {
                if (response.status >= 400) {
                    if ( (response.status === 401) && (!username || !password)) {
                        console.log("Block 2");
                        console.log("Response object:\t" + JSON.stringify(response) ); //a response does not appear to be a
                        console.log(response);

                        this.modifyLogInStatus(false);
                        this.setState({ isLoading: false,
                                        message: "Please supply both a username and a password"
                                        }
                                    ); 
                        //return response.json();
                        return;
                    } else {
                        console.log("Block 1");
                        console.log("Error & Response:\t" + JSON.stringify(response));
                        console.log("Response:\t" + JSON.stringify(response) ); //a response does not appear to be a
                        console.log(response);
                        
                        this.modifyLogInStatus(false);
                        this.setState({ isLoading: false,
                                        message: (`Server Response Error:\t ${response.status} `) 
                                                    + response.statusText
                                    }
                        );
                        return response.json();
                        //return;
                        //throw new Error("Bad response from server");
                    } //end else-statement
                } else {
                    console.log("Block 3");
                    console.log("Response object:\t" + JSON.stringify(response) ); //a response does not appear to be a
                    console.log(response);

                    //this.modifyLogInStatus(true); //TODO was false here. This line was uncommented.
                    //this.setState({ message: response.message || "Success! Logging in...", isLoading: false });
                    //return;
                    return response.json();
                }
            //return response;
            }).then((response) => {
                if ( undefsafe(response, 'success') === true) {
                    console.log("Block 4");
                    console.log("Success!!!");
                    console.log(`Success response: ${JSON.stringify(response)}`);
                    console.dir(response);
                    
                    //Set attributes from user ActiveDirectory information retrieved from the server upon successful login
                    this.modifyFullName(response.userInfo["givenName"] + " " + response.userInfo["familyName"]);
                    this.modifyTitle(response.userInfo["title"].toString().toLowerCase());
                    this.modifySite(response.userInfo["site"]);

                    this.setState({ message: response.message, isLoading: false});  

                    this.modifyLogInStatus(true); //Set loggedIn to true after populating the first and last name, for a true login renders the portal buttons page

                    //TODO: Conditionally render an isStudent variable
                    /*
                    setTimeout((response) => {
                        //browserHistory.push("/page-content");
                        console.log("Initiating timeout...");
                        this.setState({ isLoading: false });
                        return response;
                    }, 10000);
                    */
                } else {
                    console.log("Block 5");
                    console.log(response);
                    console.log("Front-end response:\t" + JSON.stringify(response) );
                    let message = undefsafe(response, 'message') || "Please supply both a username and a password"
                                
                    this.setState({message: message, isLoading: false});

                    (isDev && allowAuth) ? this.modifyTitle("staff") : nullFunction();
                    (isDev && allowAuth) ? this.modifyLogInStatus(allowAuth): nullFunction(); //TODO: Set to true in production or dev in work computer
                }
            }).catch((err) => {
                this.modifyLogInStatus(false);
                this.setState(
                        {
                            isLoading: false,
                            message: `Error: ${err}`
                        }
                );
                console.log(`Catching error:\t ${err}`);
            });
        };

        if (this.validUser() === false ) {
            //connectToServer();
            return; 
        } else {
            connectToServer();
        } //end else statement
    }; 

    resetButtonListener = (event) => {
        if (event.target.id === 'reset-button' || event.target.id === 'result-button') {
            this.modifyLogInStatus(null);
            this.setState({
                isLoading: false,
                username: "",
                password: "",
                message: "Enter username & password to login"
            });
        } //end if-statement

    }; //end resetButtonListener()

    
    getIPAddress = (props) => {
        let corsProxy = 'https://cors-anywhere.herokuapp.com/';
        let request_URL = 'https://api.ipify.org?format=json'
        let fetchURL = isDev ? corsProxy + request_URL : request_URL;

        let ipHeaders = {
            'Content-Type': 'text'
        };

        fetch(fetchURL, {
            method: 'GET',
            headers: ipHeaders
        }).then((response) => { 
            console.log("GetIP Block 1");
            console.log("Response:\t" + JSON.stringify(response));
            return response.json();
        }).then( (response) => {
            console.log("GetIP Block 2");
            console.log("Response:\t" + JSON.stringify(response));
            this.setState({ipAddress: `${response.ip}`});
        }).catch( (error) => {
            console.log("GetIP Block 3");
            console.log("Error");
            this.setState({ ipAddress: `${error}`});
        });  
    }; //end getIPAddress()

    componentDidMount = () => {
        console.log("Login component props:\t" + JSON.stringify(this.props) );
        /*this.props.changeContainerStyle({
            "backgroundImage": "none"
        }); */
    
        document.title = "CVUHSD | Portal Login"
        this.getIPAddress();

        /*
            Adding event handlers to HTML Nodes/React components that do not yet exist:
            https://stackoverflow.com/questions/44820394/fire-event-listener-on-element-not-rendered-in-react
            // */
        document.addEventListener('click', this.resetButtonListener);

        this.props.changeContainerStyle({"background-image": `url("./images/district-office-blueBG.jpg")` });        
        this.modifyLogInStatus(null);
    }; //end componentDidMount()

    componentWillUnmount = () => {
        document.removeEventListener('click', this.resetButtonListener);
    };

    render = () => { 
        document.title = "CVUHSD | Portal Login"
       
    //TODO: Conditionally generate pathName to match student or staff
    //TODO: Find out if props.location.state is really necessary
    if (this.props.loggedIn === true) {
        if (this.props.title === "student" || (this.props.location.pathname == "/student")) {
            console.log("Success - correct password & username....!!");
            return (<Redirect to={ 
                                    {
                                        pathname: "/student",
                                    }
                        } 
                    />);
                //return 1;
        } else {
            console.log("Success - correct password & username....!!");
            return (<Redirect to={ 
                                {
                                    pathname: "/staff",
                                }
                    } 
                />);
        } //end else-statement
        
          //return 1;
    } //end if-statement
     /*
     //No longer need this code block as the privateRoute component takes care of redirecting if not logged in.
        if (this.props.loggedIn === true) {
            return this.props.history.push("/page-content");
            //return (<div>Hi</div>);
        } // */

        return ([
            <PortalLogo src="/images/CV-600x600-portal.png" alt="CVUHSD Portal"  />,
            <Form action="/login" method="post" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>
                        <FormHeader>
                            <CVUHSDLogo src="/images/CV-600x600.png" alt="CVUHSD" />
                            <FormHeaderText>Login</FormHeaderText>
                        </FormHeader>
                    </legend>
                    <p className="cvuhsd-username-container input-icons">
                        <FormInputLabel htmlFor="username">
                            <FontAwesomeIcon icon={user} className="icon"/> 
                        </FormInputLabel>
                        <FormInput 
                            className="input-field"
                            type="text" 
                            name="username" 
                            id="username"
                            title="username"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                            placeholder="CVUHSD Username"
                        />
                    </p>
                    <p className="cvuhsd-password-container input-icons">
                        <FormInputLabel htmlFor="password">
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <FormInput 
                            type="password" 
                            name="password" 
                            id="password"
                            title="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            placeholder="CVUHSD Password"
                        />
                    </p>
                    <p className="form-buttons-container">
                         {
                            /*  &#10003; -- checkmark 
                            &#215; -- close
                            //TODO: Need to find HTML entities
                            */
                        }
                        <FormButton type="submit" title="Log In">Submit</FormButton>
                        { this.state.loggedIn === null ? "" : 
                            (  <ResetButton id="reset-button"
                                            type="reset"
                                            title="Reset form"
                                >
                                    Reset
                                </ResetButton>  
                            )
                        }
                        {   this.state.isLoading ?
                                <LoadingSpinner 
                                    type={"spin"}
                                    height={'30px'} width={'30px'} 
                                    color={'#1f6b92'}
                                /> : "" 
                        }
                        { (this.state.loggedIn === null) ? null : 
                            (   <div>
                                    <ResultButton   
                                        id="result-button" 
                                        title="Reset form" 
                                        loggedIn={this.state.loggedIn}
                                    > 
                                        { (this.state.loggedIn) ? "✓" : "×"}
                                    </ResultButton> 
                                    <ErrorTextAlert>
                                        { (this.state.loggedIn != false) ? null : "Error:"}
                                    </ErrorTextAlert>
                                </div>
                              
                            )

                        }
                        <ResultMessage loggedIn={this.state.loggedIn}>{"\t" + this.state.message}</ResultMessage>
                    </p>
                </fieldset>
            </Form>,
            <IPAddress>
                IP Address: 
                        <IPLoadingContainer>
                        {   this.state.ipAddress ? 
                               this.state.ipAddress :
                                    <ReactLoading 
                                        type={"cubes"}
                                        height={'30px'} width={'30px'} 
                                        color={'white'}
                                    /> 
                        }
                        </IPLoadingContainer> 
            </IPAddress>,
            <Footer>
                <ul>
                    <li>
                       <a href="https://www.centinela.k12.ca.us/" 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        CVUHSD Home
                       </a>
                    </li>
                    <li>
                       <a href="https://portal.centinela.k12.ca.us/student.html" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        Student Portal
                       </a>
                    </li>
                    <li>
                       <a href="http://portal.centinela.k12.ca.us/troubleshooting.html" 
                          target="_blank" 
                          rel="noopener noreferrer">
                        Troubleshooting
                       </a>
                    </li>
                    <li>
                       <a href="http://helpdesk.centinela.k12.ca.us/" 
                            target="_blank" 
                            rel="noopener noreferrer">
                        Helpdesk
                       </a>
                    </li>
                </ul>
            </Footer>
        ]); //end return 
    }; //end render()
}

export default withRouter(LogIn);