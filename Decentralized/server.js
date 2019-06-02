// const { createServer} = require('http');
// const next = require('next');

// const app = next({
// 	dev: process.env.NODE_ENV !== 'production'
// });

// const routes = require('./routes');
// const handler = routes.getRequestHandler(app);

// app.prepare().then(()=>{
// 	crateServer(handler).listen(3000 ,err =>{
// 		if(err) throw err;
// 		console.log('Ready on loacalhost:3000');
// 	});
// });

const express = require('express');
//const routes = require('./routes.js');
const bodyParser= require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
const crypto= require('crypto');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

//app.use(routes);

router.route('/').get(function(req,res) {
    console.log("Hello");
    // const key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
	// var cipher = crypto.createCipher('aes-256-cbc', key);
	// var input = fs.createReadStream('./test.txt');
	// var output = fs.createWriteStream('test.txt.enc');
	// input.pipe(cipher).pipe(output);
	//  output.on('finish', function() {
	// console.log('Encrypted file written to disk!');
	// });
});

app.use('/todos',router);
const port = process.env.PORT || 5000 ;
app.listen(port,() => console.log(`Server started on port ${port}`));