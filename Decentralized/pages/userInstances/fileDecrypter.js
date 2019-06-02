import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Input,Container,Button}from 'semantic-ui-react';
import Axios,{post} from '../../../backend/node_modules/axios';
var FileSaver = require('file-saver');

class fileDecrypter extends Component{

    state={
        decryptionKey:'',
        loading1:false,
        loading2:false,
        filename:'',
        disabled1:false,
        disabled2:true,
        url:'',
        file:null
    }

    static async getInitialProps(props){
        const {address} =props.query;
        

        return{address};

    }

    decrypt=async ()=>{

        event.preventDefault();
        this.setState({loading1:true});
        this.fileUpload(this.state.file).then((response)=>{
            if(response.data ='ok'){
                //FileSaver.saveAs(`http://localhost:4000/${this.state.filename}/downloadDecrypted`,'DBS_'+this.state.filename);
                this.setState({disabled2:false,disabled1:true,loading1:false});
            }
        })
        
        
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

   download=async ()=>{
    this.setState({disabled2:true,disabled1:true,loading2:true});
   await  FileSaver.saveAs(`http://localhost:4000/${this.state.filename}/downloadDecrypted`,'DBS_'+this.state.filename);
    this.setState({loading2:false,disabled1:false});
   }

   

    render(){
        return(
            <Layout address={this.props.address}>
            <Container>
            


            <form  onSubmit={this.decrypt}  encType="multipart/form-data" method="POST"  >

            <div style={{display: 'flex', alignItems:'center', height: '10vh'}}>
                <h1>File Decrypter</h1>
            </div>
            
				<div style={{ display: 'flex', alignItems:'center',height: '10vh'}}>

				<input type="file"  name="file" style={{ color:'red' }} onChange={e => this.setState({filename: (e.target.value).replace('C:\\fakepath\\',''),file: e.target.files[0] })} />
				
				</div>

                <div style={{ alignItems:'center', height: '10vh'}}>
                <Input fluid focus placeholder='Enter Decryption Key' 
                type='password'
                onChange={e=> this.setState({decryptionKey: e.target.value,url: `http://localhost:4000/${e.target.value}/${this.state.filename}/decrypt`})}>
                </Input>
                </div>

                <div style={{ alignItems:'center', height: '2vh'}}>
                    <Button disabled={this.state.disabled1} loading={this.state.loading1} primary>
                    Decrypt
                    </Button>

                    
            <Button primary onClick={this.download} disabled={this.state.disabled2} loading={this.state.loading2}>
                    Download
             </Button>
             

                   
                   
                </div>

				
			</form>
            
            
            </Container>
            </Layout>
        );
    }
}

export default fileDecrypter;