import React,{Component} from 'react';
import {Container,Table,Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Instance from '../../ethereum/instance';
import Factory from '../../ethereum/factory';
import RequestRow from '../../components/RequestRow';



class userFiles extends Component {

	static async getInitialProps(props){

		const {address} =props.query;
		console.log(address);
		const userInstance = Instance(address);
		const filesCount= await userInstance
		.methods.getNumberOffiles().call();
		//console.log(filesCount);
		const metaDataOf1_2 = await Promise.all(
			Array(parseInt(filesCount)).fill().map((element,index) =>{
					return userInstance.methods.Part1_2_Details(index).call()
			})
		);

		const metaDataOf3 = await Promise.all(
			Array(parseInt(filesCount)).fill().map((element,index) =>{
					return userInstance.methods.Part3_Details(index).call()
			})
		);

			

		const activeDeviceCount= await Factory.methods.getSummary().call();

		const nodeData = await Promise.all(
			Array(parseInt(activeDeviceCount)).fill().map((element,index) =>{
				return Factory.methods.activeNode(index).call()
			})
			);

		

		return{address ,metaDataOf1_2,metaDataOf3,nodeData,activeDeviceCount} ;
	}


	renderRow(){

		const{
			Row,Cell
		}=Table;

		return this.props.metaDataOf1_2.map((metaDataOf1_2,index)=>{

			return(
				<RequestRow
				address={this.props.address}
				key={index}
				id={index}
				metaDataOf1_2={metaDataOf1_2}
				/>
			);
		})

	}


	render(){
		const{
			Header,Row,HeaderCell,Body,Cell
		}=Table;
		return(
				<Layout address={this.props.address}>
				<Container>
				<Table>
					<Header>
						<Row>
						<HeaderCell>ID</HeaderCell>
						<HeaderCell>File Name</HeaderCell>
						<HeaderCell>Download</HeaderCell>
						</Row>
					</Header>

					
					<Body>
						{this.renderRow()}
					</Body>

				</Table>
				</Container>

				
				</Layout>
			);
	}
}

export default userFiles;