const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/Factory.json");

const provider = new HDWalletProvider(
	"ready coach undo color cinnamon memory broccoli soldier mask custom silver tree",
	"https://rinkeby.infura.io/v3/697df8dac2394171baba7d7f514c05ce"
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account ' + accounts[0]);

	const result = await new web3.eth.Contract(
		JSON.parse(compiledFactory.interface)
	)
		.deploy({ data: compiledFactory.bytecode })
		.send({ gas: "3000000", from: accounts[0] });

		console.log('Contract deployed to ' + result.options.address);

};

deploy();
