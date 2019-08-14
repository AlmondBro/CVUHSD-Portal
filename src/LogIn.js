import React from "react";

class LogIn {
    constructor(props) {
        this.state = {
            logInSuccess: null
        }
    }; //end constructor

    render = () => { 
        return (
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
        ); //end return 
    }; //end render()
}

export default LogIn;