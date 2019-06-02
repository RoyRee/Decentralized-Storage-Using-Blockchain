const fs = require('fs');
const crypto = require('crypto');

module.exports= function encrypt(file_Path ,file_Name,encryptionKey) {

	// console.log(encryptionKey);
	// console.log(file_Path);
	// console.log(file_Name);

    var key = encryptionKey;
			var cipher = crypto.createCipher('aes-256-cbc', key);
			var input = fs.createReadStream(file_Path);
			var output = fs.createWriteStream(__dirname+'\\'+'enc'+'\\'+file_Name);

			input.pipe(cipher).pipe(output);

			output.on('finish', function() {
			  console.log('Encrypted file written to disk!');
						});
						

						
    
  }




            
