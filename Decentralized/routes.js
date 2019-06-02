const routes = require('next-routes')();

routes
		.add('/userInstances/nodeHomePage','/userInsatances/nodeHomePage')
		.add('/userInstances/:address/HomePage','/userInstances/HomePage')
		.add('/userInstances/:address/userFiles','/userInstances/userFiles')
		.add('/userInstances/:address/fileDecrypter','/userInstances/fileDecrypter');
module.exports =routes;

