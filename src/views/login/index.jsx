import React,{Component} from 'react';
import LoginForm from './LoginForm';
import RegistForm from './RegistForm';

class Login extends Component{
  
  state={
    type:1
  }
  onFinish=()=>{
    console.log(1);
  }
  changeType=(type)=>{
    this.setState({type:type})
  }

  componentDidMount(){
    console.log(this.props)
    let isLogin=localStorage.getItem("token")?true:false
    if(isLogin) this.props.history.replace("/home")
  }
  render(){
    return(
      <>
        {
          this.state.type===1?<LoginForm changeType={this.changeType}/>:<RegistForm changeType={this.changeType} />
        }
      </>
    )
  }
}

export default Login