import web3 from './web3';
import userInstance from './build/userInstance.json';

export default(address)=>{
	return new web3.eth.Contract(
		JSON.parse(userInstance.interface) , address
		);
};