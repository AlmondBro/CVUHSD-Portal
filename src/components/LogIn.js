import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

let Form = styled('form')`
    /* font-family: "Montserrat", sans-serif; */
    max-width: 300px;
    margin: 10px auto;
    text-align: center;
    background-color: #182c3d;
    color: white;
    padding: 0px;
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
    background-color: #eeeeee;
    color: #336186;
    font-size: 1.38em;
    position: absolute;
    padding: 4px;
    padding-right: 6px;
    margin-top: 2px;
    border-right: 1px solid #182c3d;
    box-shadow: none;
`

let SubmitButton = styled('button')`
    display: block;
    margin: 5px auto;
    font-family: "Montserrat", sans-serif;
    border-radius: 5px;
    border: 0px;
    padding: 0.5em 1em;
    background-color: #336186;
    color: white;
`;

let PortalLogo = styled('img')`
    max-width: 150px;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

let ResultButton = styled('span')`
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    justify-content: center;
    font-size: 1.5em;
    margin-top: 0.8em;
    margin-bottom: 10px;
    background-color: white;
    max-width: 35px;
    color: #336186;
    font-weight: bolder;
    border-radius: 100px;
`;

let ResultMessage = styled('span')`
    font-size: 0.8em;
    color: white;
    font-family: "Montserrat", sans-serif;
`;

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logInSuccess: null,
            username: "",
            password: "",
            message: "Enter username & password to login"
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

        fetch("/login", {
            method: 'POST',
            headers: {
                        'Content-Type': 'application/json',
                        'credentials': 'include',
                        'mode': 'no-cors'
                    },
            body: JSON.stringify({username: username, password: password})
        }).then((response) => {
            if (response.status >= 400) {
                console.log("Error & Response:\t" + JSON.stringify(response));
                this.setState({logInSuccess: false, message: response.message});
                //throw new Error("Bad response from server");
            }
            console.log("Response:\t" + JSON.stringify(response) ); //a response does not appear to be a
            console.log(response);
          return response.json();
          //return response;
        }).then((response) => {
            if (response.success === true){
               this.setState({logInSuccess: true, message: response.message});  
             
                console.log("Success!!!");
                console.log((response));
                return response;
            }

            console.log(response);
            console.log("Front-end response:\t" + JSON.stringify(response) );
            this.setState({logInSuccess: false, message: response.message});
        }).catch((err) => {
            this.setState({logInSuccess: false});
            console.log(`Catching error:\t ${err}`);
        });
    };

    componentWillMount = (props) => {
        console.log("Login component props:\t" + JSON.stringify(props) );
        // props.changeContainerStyle({
        //   "backgroundColor": "red"
        // });
      }; //end componentDidMount

    render = () => { 
        return ([
            <PortalLogo src="./images/CV-600x600-portal.png" alt="CVUHSD Portal"  />,
            <Form action="/login" method="post" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend><FormHeader>Log In</FormHeader></legend>
                    <p className="cvuhsd-username-container input-icons">
                        <FormInputLabel htmlFor="username">
                            <FontAwesomeIcon icon={user} className="icon"/> 
                        </FormInputLabel>
                        <FormInput 
                            className="input-field"
                            type="text" 
                            name="username" 
                            onChange={this.handleInputChange}
                            value={this.state.username}
                            placeholder="CVUHSD Username"
                        />
                    </p>
                    <p className="cvuhsd-password-container input-icons">
                        <FormInputLabel htmlFor="username">
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <FormInput 
                            type="password" 
                            name="password" 
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            placeholder="CVUHSD Password"
                        />
                    </p>
                    <p className="form-buttons-container">
                        <SubmitButton type="submit">Submit</SubmitButton>
                        { this.state.logInSuccess === null ? "" : 
                            (   this.state.logInSuccess === true ? 
                                <ResultButton>&#10003;</ResultButton> :  
                                <ResultButton>&#215;</ResultButton>
                            )
                        }
                        <ResultMessage>{"\t" + this.state.message}</ResultMessage>
                    </p>
                </fieldset>
            </Form>
        ]); //end return 
    }; //end render()
}

export default LogIn;