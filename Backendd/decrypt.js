const fs = require('fs');
const crypto = require('crypto');

module.exports= function decrypt(file_Path,file_Name,decryptionKey) {

    // console.log(file_Path);
    // console.log(file_Name);
    // console.log(decryptionKey);
  try{
    var key=decryptionKey;
    //console.log(key);
    var Decipher = crypto.createDecipher('aes-256-cbc',key);
      var input = fs.createReadStream(file_Path);
     var output = fs.createWriteStream(__dirname+'\\'+'decryptedFile' + '\\'+ file_Name);
    
    input.pipe(Decipher).pipe(output);
    
    output.on('finish',function(){
        console.log('File Decrypted');
       
   })		
  }catch(err){
    return err;
  }	

   
    
  }




            
