import React, { Component } from 'react';
import Modal from 'react-modal';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:   
          ( (props.districtPosition !== "student") 
              || !props.location.state.renderAsStudent ) ? 
                "#1E6C93": "#931E1D",
      
        // backgroundColor: 'rgba(30,108,147, 0.55)',
        zIndex: 3
      },
    
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    this.state = {
      modalisOpen: false
    }; //end this.state variable
  } //end constructor()

  openModal = () => {
    // this.setState({
    //   modalIsOpen: true
    // }); //end this.setState()
    this.props.toggleModal(true);
  }; //end openModal


  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }; //end afterOpenModal

  closeModal = () => {
    // this.setState({
    //   modalIsOpen: false
    // }); //end this.setState()
    this.props.toggleModal(false);
  }; //end closeModal

  componentDidMount = () => {
    console.log(`Change password props:\t ${JSON.stringify(this.props)}`);
  }

  render = () => {
    return (
      <div id="changePassword-modal">
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => this.closeModal() }
          style={this.customStyles}
          contentLabel="Change Password"
          closeTimeoutMS={700}
        >

          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input type="text" />
            <input type="text" />
            
            <button type="submit">Change Password</button>
          </form>
        </Modal>
      </div>
    );
  }; //end render() method
 
}; //end ChangePassword class

export default ChangePassword;