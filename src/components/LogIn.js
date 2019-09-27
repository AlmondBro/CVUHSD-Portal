import React, { Component } from "react";

//Import 3rd-party APIs

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logInSuccess: null,
            username: "",
            password: "",
            msg: ""
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
        }).then((response) => {
            if (response.status >= 400) {
                console.log("Response:\t" + JSON.stringify(response));

                //throw new Error("Bad response from server");
            }
            console.log(response);
            return response.json();
        }).then((response) => {
            if (response === "success"){
               this.setState({msg: "User has been deleted."});  
             
                console.log((response));
                return response;
            }
        }).catch(function(err) {
            console.log(`Catching error:\t ${err}`);
        });
    };

    render = () => { 
        return (
            <div className="container-fluid">
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
                            type="text" 
                            name="password" 
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                    </p>
                    <p className="form-buttons-container">
                        <button type="submit">Submit</button>
                    </p>
                </fieldset>
            </form>
            </div>
        ); //end return 
    }; //end render()
}

export default LogIn;