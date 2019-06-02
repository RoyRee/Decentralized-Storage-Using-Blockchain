import React,{Component} from 'react';
import {Dropdown,Container,Button,Label, Step,Form,Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Factory from '../../ethereum/factory';
import Axios,{post} from 'axios';
//import loading from ';




class HomePage extends Component {

	constructor(props){
		super(props);
		this.fileInput =React.createRef();

		this.onEncrypt = this.onEncrypt.bind(this);
		this.onSend=this.onSend.bind(this);
		this.encryptFile= this.encryptFile.bind(this);
		this.splitFile= this.splitFile.bind(this);

		this.state={
			completed_Encrypt: false,
			completed_Distribution:false,
			completed_split:false,
			disabled4:false,
			filename:'',
			loading1:false,
			loading2:false,
			loading3:false,
			disabled1:false,
			disabled2:true,
			disabled3:true,
			encryptionKey:'',
			pointing: false,
			file:null,
			url:''
			
		}
	}

	

	static async getInitialProps(props){

		const {address} =props.query;
		console.log(address);
		const activeDeviceCount = await Factory.methods.getSummary().call();
		console.log(typeof(activeDeviceCount));
		const nodeData = await Promise.all(
			Array(parseInt(activeDeviceCount)).fill().map((element,index) =>{
				return Factory.methods.activeNode(index).call()
			})
			);

		
		var data =[];
			for(var i=0;i<activeDeviceCount;i++){
		 		data[i] = {
		 		text:nodeData[i].nodeID,
		 		value:nodeData[i].ipAddress
				 };
	
		}	
		
		
		return{address ,data} ;
	}

	encryptFile =  (e) =>{
		event.preventDefault();
		
		if((this.state.encryptionKey) && (this.state.filename)){
		this.setState({disabled1:true,loading1:true,pointing:false});
		this.fileUpload(this.state.file).then((response)=>{
            if(response.data =='ok'){
				this.setState({completed_Encrypt:true,loading1:false,disabled2:false});
			}
		})
		
	}else{
		this.setState({pointing:true});

	}
        

	}


	fileUpload(file){
		const url = this.state.url;
		const formData = new FormData();
		formData.append('file',file);
		const config={
			headers:{
				'content-type':'multipart/form-data'
			}
		}
		return post(url,formData,config)
	}
 

	splitFile =(e)=>{
		//event.preventDefault();
		this.setState({disabled2:true,loading2:true});
		var name= this.state.filename;
		var filename= name.replace('C:\\fakepath\\','');
		 
		 Axios.get(`http://localhost:4000/split/${filename}`).then(response=>{
			 if(response.status ===200){
				this.setState({completed_split:true,loading2:false,disabled3:false});
			 }
			 console.log(typeof(response.status));
		 });
		
		 

	}


	onSend =()=>{
		//event.preventDefault();
		this.setState({disabled3:true,loading3:true,disabled4:true});
		Axios.post(`http://localhost:4000/${this.props.address}/${this.state.filename}/send`).then( response =>{
			console.log(response);
			if(response.status===200){
				this.setState({completed_Distribution:true,loading3:false,disabled4:false});
			}
		});
		
	}

	onEncrypt=() =>{
		this.setState({disabled1:true});
		
	}

	onReset=()=>{
		this.setState({disabled1:false,disabled2:true,disabled3:true,loading1:false,loading2:false,loading3:false,filename:'',completed_Distribution:false,completed_Encrypt:false,completed_split:false,pointing:false,encryptionKey:''});
	
	}
j


	render(){
		return(
			<div className='hello'>

			
					<style jsx>{`
				.hello {
					background-image:"url('https://source.unsplash.com/random')"
				
			}
			`}</style>
				
				<Layout  address={this.props.address}>
				
				<Container >
				

					<div style={{height:100}}>
						<Step.Group ordered fluid>
							<Step completed={this.state.completed_Encrypt}>
							<Step.Content>
								<Step.Title>Encryption</Step.Title>
								<Step.Description>Encryption Makes Your File Secure</Step.Description>
							</Step.Content>
							</Step>
							<Step completed={this.state.completed_split}>
							<Step.Content>
								<Step.Title>Split Files</Step.Title>
								<Step.Description>Spliting Files will makes the  chunks of files</Step.Description>
							</Step.Content>
							</Step>

							<Step completed={this.state.completed_Distribution}>
							<Step.Content>
								<Step.Title>Send File Over Network  </Step.Title>
								<Step.Description>The files chunks will be send randomly to different nodes</Step.Description>
							</Step.Content>
							</Step>

							
						</Step.Group>
					</div>
					
				<div style={{height: '2vh'}}>
					<h3>Select File To Encrypt:-</h3>
				</div>

				<form  onSubmit={this.encryptFile} encType="multipart/form-data" method="POST"  >
				<div style={{ display: 'flex', alignItems:'center',height: '10vh'}}>

				<input type="file"  name="file" style={{ color:'red' }} onChange={e => this.setState({filename: (e.target.value).replace('C:\\fakepath\\',''),file: e.target.files[0] })}  />
				
				</div>
				<div style={{ alignItems:'center', height: '10vh'}}>
					
						<h3>Enter Encryption Key:-</h3>

					<Input type="password" name ="encryptionKey"fluid focus placeholder='Enter Encryption Key' onChange={e => this.setState({encryptionKey: e.target.value,url:`http://localhost:4000/${e.target.value}/${this.state.filename}/upload`})} 
					value={this.state.encryptionKey} >
					</Input>


					{!this.state.pointing ? null :(
					<Label   color="red" basic pointing='above' >
					 Please enter a value
					</Label>
					)}

					
				</div>


				<div style={{display: 'flex', alignItems:'center', height: '12vh'}}> 
				
				<Button primary  loading={this.state.loading1} disabled={this.state.disabled1} >
				Encrypt
				</Button>
				</div>
				</form>

				<hr />

				<div style={{display: 'flex', alignItems:'center', height: '8vh'}}>
    			<h4>Split File:- </h4> 
				</div>
				<div>
					<Button primary onClick={this.splitFile} loading={this.state.loading2} disabled={this.state.disabled2}>
						Split Files
					</Button>
				</div>
				<hr />
				
				<div style={{display: 'flex', alignItems:'center', height: '8vh'}}>
    			<h4>Send File Over network:- </h4> 
				</div>

				


				{/* <div>

				<Dropdown placeholder ='select First Node' fluid selection options={this.props.data} />
				
				</div > */}

				<div style={{display: 'flex', alignItems:'center', height: '8vh'}}>
					<Button primary onClick={this.onSend} loading={this.state.loading3} disabled={this.state.disabled3}>
						Send File
					</Button>
				</div>

				<div>
				<Button primary onClick= {this.onReset} floated='right' disabled={this.state.disabled4}>
				 Reset
				</Button>

				</div>
				
				</Container>
				</Layout>

				</div>
			);
	}
}

export default HomePage;