import React ,{Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {keccak256} from 'js-sha3';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Head from 'next/head';
import {Router} from '../routes';
import Axios from 'axios';



 //var os = require('os');




class LoginForm extends Component{


 // static async getInitialProps(props){
//     var interfaces = os.networkInterfaces();
    
//     var addresses = [];
//     for (var k in interfaces) {
//     for (var k2 in interfaces[k]) {
//         var address = interfaces[k][k2];
//         if (address.family === 'IPv4' && !address.internal) {
//             addresses.push(address.address);
//         }
//     }
// }


//   return {addresses};

  //}



state ={
	username: '',
	password: '',
  errorMessage:'',
  loading: false,
  

};

onSubmit = async () =>{
	event.preventDefault();

	const account = await web3.eth.getAccounts();
	//console.log(account[0]);
  var values =this.state.username +this.state.password +account[0] ;
  //console.log(values);
	var bytes ='0x'+keccak256(values);
  //console.log(bytes);
  var getip= await Axios.get(`http://localhost:4000/ipAddress`);
//console.log(getip);

 var ipAddress = getip.data + ':4000'
 //console.log(ipAddress);
  

  
  

		try{
      this.setState({errorMessage: '' ,loading: true});
			 const nodeID = await factory.methods.nodeSignIn(bytes ,ipAddress).send({from:account[0]});
      console.log(nodeID);
      this.setState({loading:false });
      Router.pushRoute(`/userInstances/nodeHomePage`);

 		}catch(err){
			
      this.setState({errorMessage: err.message ,loading:false});
		}

		

}





render(){

	return(




  <div className='login-form' style={{ justifyContent:'center', alignItems:'center', height: '100vh'} }>

<Segment inverted color='teal' size='massive'>
Decentralized File Storage Using BlockChain
</Segment>
  <Head>
      <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
     </Head>



    <Grid textAlign='center' style={{ height: '90%' }} verticalAlign='middle'>

      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Node Login
        </Header>

        <Form size='large' onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
          <Segment stacked>
            <Form.Input 
            value={this.state.username}
            onChange={event =>this.setState({username: event.target.value})}
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Username'
             />


            <Form.Input
            value={this.state.password}
            onChange={event => this.setState({password: event.target.value})}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='teal' fluid size='large' loading={this.state.loading}>
              Login 
            </Button>
          </Segment>
          <Message error header="Oops!!" content={this.state.errorMessage} />
        </Form>
        <Message>
          Node <a href='/nodeSignUp'>Sign Up </a><br />  User Login <a href='/index'>click here</a>
                                                         
        </Message>
      </Grid.Column>
    </Grid>
   
  </div>

  
  

  );
}

}

export default LoginForm;