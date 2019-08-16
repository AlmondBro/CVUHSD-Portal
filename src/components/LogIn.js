import React, { Component } from "react";

//Import 3rd-party APIs

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logInSuccess: null
        }
    }; //end constructor

    render = () => { 
        return (
            <div className="container-fluid">
                <form>
                    <fieldset>
                    <legend><h3>Login In</h3></legend>
                    <p className="cvuhsd-username-container">
                        <label for="cvuhsd-username">Username:</label>
                        <input 
                            type="text" 
                            name="cvuhsd-username" 
                        />
                    </p>
                    <p className="cvuhsd-password-container">
                        <label for="cvuhsd-password">Username:</label>
                        <input 
                            type="text" 
                            name="cvuhsd-password" 
                        />
                    </p>
                </fieldset>
            </form>
            </div>
        ); //end return 
    }; //end render()
}

export default LogIn;