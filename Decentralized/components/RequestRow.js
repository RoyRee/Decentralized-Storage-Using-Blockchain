import React,{Component} from 'react';
import {Table,Buton, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Instance from '../ethereum/instance';
import Factory from '../ethereum/factory';
//import download from '../components/download';
var os = require('os');
import Axios from 'axios';
var FileSaver = require('file-saver');
//import download_status from '../components/download';
import {download,download_status} from '../components/download';

class RequestRow extends Component{

   constructor(props){
    super(props);
    var timmer = null;

    this.state={
        loading:false,
        disabled:false,
        merge_Button:false,
        download:false
        }


        this.download = this.download.bind(this);
        // this.stopTimer = this.stopTimer.bind(this);
   }
   
   




    download =async () =>{
        this.setState({loading:true,disabled:true});
        //console.log(this.props.address);
       const userInstance = Instance(this.props.address);
        const filesCount = await userInstance.methods.getNumberOffiles().call();
        const meta1_2 = await userInstance.methods.Part1_2_Details(this.props.id).call();
        const meta3 = await userInstance.methods.Part3_Details(this.props.id).call();

        const activeNodeCount= await Factory.methods.getSummary().call();

        const ipAddress= await Axios.get(`http://localhost:4000/ipAddress`);
      

        const activeNode = await Promise.all(
            Array(parseInt(activeNodeCount)).fill().map((element,index) =>{
                    return Factory.methods.activeNode(index).call()
            })
        );
          download(meta1_2,meta3,activeNode,ipAddress.data,meta1_2[0]);
            console.log(download_status);
           
         this.timmer =  setInterval(()=>{
            if(download_status){
                this.setState({merge_Button:true,loading:false,disabled:false});
                clearInterval(this.timmer);
            }
            console.log("Check");
         },3000);
             

        }
    

    merge= async ()=>{

        this.setState({loading:true,disabled:true});
       await FileSaver.saveAs(`http://localhost:4000/${this.props.metaDataOf1_2.fileName}/merge`,this.props.metaDataOf1_2.fileName);
        this.setState({loading:false,disabled:false});
    }


    render(){
        const {Row,Cell}= Table;
        const {id,metaDataOf1_2}= this.props;

        return(
            <Row>
                <Cell>{id}</Cell>
                <Cell>{metaDataOf1_2.fileName}</Cell>
                {/* <Cell>
                    <Button primary onClick={this.download}>
                        Download
                    </Button>
                </Cell> */}
                <Cell>
                {this.state.merge_Button ? null :(
					<Button disabled ={this.state.disabled} loading ={this.state.loading} color="green" basic onClick={this.download}>
					 Download 
					</Button>
					)}

                {!this.state.merge_Button ? null :(
					<Button disabled ={this.state.disabled} color="red" basic onClick={this.merge}>
					 Merge and Save
					</Button>
					)}

                </Cell>
            </Row>
        );
    }
}

export default RequestRow;