import React, { Component } from 'react';

import {  Redirect } from 'react-router'

import ReactLoading from 'react-loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

import undefsafe from 'undefsafe';

import isDev from 'isdev';

//TODO: Upon click in result button, clear the form data and remove message -- set loginsuccess to null
//TODO: Create function that fetches the IP Address
//TODO: Create reset-password functionality

let Form = styled('form')`
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

let FormHeader = styled('h3')`
    font-family: 'Montserrat', sans-serif;
    /* background-color: #213e56; */
    border-bottom: 2px solid white;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
`;

let FormInput = styled('input')`
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

let FormInputLabel = styled('label')`
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

let FormButton = styled('button')`
    display: inline-block;
    margin: 5px 3px;
    font-family: "Montserrat", sans-serif;
    border-radius: 5px;
    width: 80px;
    border: 0px;
    padding: 0.5em;
    background-color: #336186;
    color: white;
    transition: 0.5s;
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

let PortalLogo = styled('img')`
    max-width: 150px;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

let CVUHSDLogo = styled('img')`
    max-width: 70px;
    display: inline-flex;
    margin-right: 37px;
`;

let ResultButton = styled('span')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    cursor: pointer;
    font-size: 1.5em;
    margin: 0 auto;
    margin-top: 0.3em;
    margin-bottom: 10px;
    background-color: white;
    max-width: 35px;
    color: #336186;
    font-weight: bolder;
    border-radius: 100px;
    text-align: center;
`;

let FormHeaderText = styled('p')`
    display: flex;                                                                                                                                                                                                                                                                                                                      
    align-self: center;
`;

let ResultMessage = styled('span')`
    display: block;
    font-size: 0.8em;
    color: white;
    font-family: "Montserrat", sans-serif;
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
            logInSuccess: null,
            isStudent: true,
            username: "",
            password: "",
            message: "Enter username & password to login",
            isLoading: false,
            ipAddress: ""
        } //end state object
        console.log("Props:\t" + JSON.stringify(this.props) );
    }; //end constructor

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting...");

        let { username, password} = this.state;

        let logIn_URL = `${isDev ? "" : "/server" }/login`

        this.setState({isLoading: true, message: "Loading..."});

        //let isDev = false;
        let headers = {
            'Content-Type': 'application/json',
            'credentials': 'include',
            'mode': 'no-cors'
        };

        fetch(logIn_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({username: username, password: password})
        }).then((response) => {
            if (response.status >= 400) {
                if ( (response.status === 401) && (!username || !password)) {
                    console.log("Block 2");
                    console.log("Response object:\t" + JSON.stringify(response) ); //a response does not appear to be a
                    console.log(response);
                    this.setState({ logInSuccess: false, 
                                    isLoading: false,
                                    message: "Please supply both a username and a password"}
                                ); 
                    //return response.json();
                    return;
                } else {
                    console.log("Block 1");
                    console.log("Error & Response:\t" + JSON.stringify(response));
                    console.log("Response:\t" + JSON.stringify(response) ); //a response does not appear to be a
                    console.log(response);
                    
                    this.setState({ logInSuccess: false, 
                                    isLoading: false,
                                    message: (`Server Response Error:\t ${response.status} `) 
                                                + response.statusText
                    });
                    return response.json();
                    //return;
                    //throw new Error("Bad response from server");
                } //end else-statement
            } else {
                console.log("Block 3");
                console.log("Response object:\t" + JSON.stringify(response) ); //a response does not appear to be a
                console.log(response);
                this.setState({logInSuccess: false, message: response.message, isLoading: false});
                //return;
                return response.json();
            }
          //return response;
        }).then((response) => {
            if ( undefsafe(response, 'success') === true){
                console.log("Block 4");
                console.log("Success!!!");
                console.log((response));

                //had loginsuccess true in here
                this.setState({  
                                isLoading: false, 
                                message: response.message
                });  

                //TODO: Conditionally render an isStudent variable
                setTimeout((response) => {
                    //browserHistory.push("/page-content");
                    this.setState({logInSuccess: true, 
                                    isLoading: false});
                    return response;
                }, 5000);
            } else {
                console.log("Block 5");
                console.log(response);
                console.log("Front-end response:\t" + JSON.stringify(response) );
                let message = undefsafe(response, 'message') || "Please supply both a username and a password"
                this.setState({logInSuccess: false, message: message, isLoading: false});
            }
        }).catch((err) => {
            this.setState(
                    {
                        isLoading: false,
                        logInSuccess: false,
                        message: `Error: ${err}`
                    }
            );
            console.log(`Catching error:\t ${err}`);
        });
    };

    resetButtonListener = (event) => {
        if (event.target.id === 'reset-button' || event.target.id === 'result-button') {
            this.setState({
                logInSuccess: null,
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

    componentDidMount = (props) => {
        console.log("Login component props:\t" + JSON.stringify(props) );
        this.props.changeContainerStyle({
            "backgroundColor": "red"
        }); 
    
        this.getIPAddress();

        /*
            Adding event handlers to HTML Nodes/React components that do not yet exist:
            https://stackoverflow.com/questions/44820394/fire-event-listener-on-element-not-rendered-in-react
            // */
        document.addEventListener('click', this.resetButtonListener);
    }; //end componentDidMount()

    componentWillUnmount = () => {
        document.removeEventListener('click', this.resetButtonListener);
    };

    render = () => { 
        document.title = "CVUHSD | Portal Login"
        if (this.state.logInSuccess === true) {
           console.log("Success - correct password & username....!!");
           return (<Redirect to="/page-content" />);
        }

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
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            placeholder="CVUHSD Password"
                        />
                    </p>
                    <p className="form-buttons-container">
                         {/*  &#10003; -- checkmark 
                            &#215; -- close
                            //TODO: Need to find HTML entities
                            //TODO: Add a form reset
                             onClick={
                                        this.setState({
                                            logInSuccess: null,
                                            username: "",
                                            password: ""
                                        })
                                    }
                        */}
                        <FormButton type="submit">Submit</FormButton>
                        { this.state.logInSuccess === null ? "" : 
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
                        { this.state.logInSuccess === null ? "" : 
                            (   <ResultButton id="result-button" title="Reset form"> 
                                    {this.state.logInSuccess === true ? "✓" : "×"}
                                </ResultButton> )
                        }
                        <ResultMessage>{"\t" + this.state.message}</ResultMessage>
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

export default LogIn;