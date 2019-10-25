import React, { Component } from 'react';

import styled from 'styled-components';


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logInSuccess: null,
            username: "",
            password: "",
            message: ""
        }
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
        // })
      }; //end componentDidMount

    SubmitButton = styled('button')`
        font-family: Century Gothic;
        border-radius: 0px;
        border: 0px;
        padding: 0.5em 1em;
        background-color: #336186;
        color: white;
    `;

    render = () => { 
        return (
            <form action="/login" method="post" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend><h3>Log In</h3></legend>
                    <p className="cvuhsd-username-container">
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            name="username" 
                            onChange={this.handleInputChange}
                            value={this.state.username}
                        />
                    </p>
                    <p className="cvuhsd-password-container">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                    </p>
                    <p className="form-buttons-container">
                        <this.SubmitButton type="submit">Submit</this.SubmitButton>
                        <span>{"\t" + this.state.message}</span>
                    </p>
                </fieldset>
            </form>
        ); //end return 
    }; //end render()
}

export default LogIn;