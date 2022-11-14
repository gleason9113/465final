
import React, { Component } from 'react';
import {InputGroup,Input,Button} from 'reactstrap';
import Socket from './Socket';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      session:""
    };

  }

  update = (event) => {
    this.setState({session: event.target.session});
    
  }

  createSession = (event) => {
    console.log("Joined:  " + JSON.stringify(this.state));
    if(this.state.name !== '') {
      Socket.emit("create-session",this.state.pname,this.state.session);
      console.log(this.state.name,this.state.session);
     
    } else {
      event.preventDefault();
    }
  }

  joinSession = (event) => {
    if(this.state.name !== '') {
      Socket.emit("join-session",this.state.pname,this.state.session);
      console.log(this.state.name);
  
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="session-page">
        <InputGroup style={{width:"50%", margin:"0 auto"}}>
            <Input name="pname" placeholder="username" onChange={this.update}/>
            <Input name="session" placeholder="session name" onChange={this.update}/>
            <Button className="session-btn" color="primary" onClick={this.createSession}>Create Game!</Button>
        </InputGroup>      
            <Input name="pname" placeholder="username" onChange={this.update}/>
            <Input name="session" placeholder="session name" onChange={this.update}/>
            <Button className="session-btn" color="primary" onClick={this.joinSession}>Join Game!</Button>      
      </div>
    )
  }
}
export default Join;

/*
https://reactjs.org/docs/forms.html
*/