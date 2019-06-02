import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
		JSON.parse(Factory.interface),
		'0x828BE685e0DD179CC76A9cc627b91d61a7684b76'
	);

export default instance;