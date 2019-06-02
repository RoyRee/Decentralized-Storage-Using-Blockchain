const express = require('express');
const path = require('path');
const multer = require('multer');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const PORT = 4000;
const crypto = require('crypto');
const fs = require('fs');
const splitFile = require('split-file');
const FormData= require('form-data');
const app = express();
const request = require('request');
const axios = require('axios');
const encrypt=require('./encrypt_file');
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3= require('web3');
const provider = new HDWalletProvider(
	"<Enter your seed Phrase>",
	"<Enter Your Infura link>"
);
const web3 = new Web3(provider);
const Factory= require('../Decentralized/ethereum/build/Factory');
const user=require('../Decentralized/ethereum/build/userInstance');
const cors= require('cors');

const factoryInstance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '<Enter Deployed contract address>'
);

const os = require('os');
const decrypt= require('./decrypt');



app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const upload_1_Path = path.resolve(__dirname+'\\' + 'upload_1');
const enc_path = path.resolve(__dirname+'\\'+'enc' );
const temp_path = path.resolve(__dirname+'\\'+'temp');
const temp_path2= path.resolve(__dirname+'\\'+'temp2');
const dec_path= path.resolve(__dirname+'\\'+'decrypt');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, upload_1_Path)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })


  var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, temp_path)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  var storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, temp_path2)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  var storage4 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dec_path)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  
  var upload = multer({ storage: storage });
  var upload2 = multer({ storage: storage2 });
  var upload3 = multer({ storage: storage3 });
  var upload4 = multer({storage:storage4});

 // var filename='';
  var address= '';
  var contractAddress='';
  //var encryptionKey='';
  var partsName=['.sf-part1','.sf-part2','.sf-part3'];
  var down_count=0;
  var timmer;
  //var decryptionKey='';


  app.post('/send',  upload2.single('file'),(req,res)=>{
    
    res.send("Saved");

    //res.redirect('localhost:3000/');
})

// app.get('/hello',(ress,req)=>{
//   res.send("ok");
// })

app.post('/recieve1',upload3.single('file') ,(req,res)=>{
  console.log("recieve 1 before");
  
  console.log("recieve 1 After");
  res.send('saved Part');
})

app.post('/recieve2',upload3.single('file'),(req,res)=>{
  
  res.send('saved Part');
})

app.post('/recieve3',upload3.single('file'),(req,res)=>{
  
  res.send('saved Part');
})




app.post('/:decryptionKey/:fileName/decrypt',upload4.single('file'),async (req,res)=>{

  var decryptionKey=req.params.decryptionKey;
  var filename = req.params.fileName;
  try{
   decrypt(dec_path+'\\'+filename ,filename,decryptionKey);
  res.send("ok");
  }catch(err){
    res.send(err);
  }
  
  
  
   
})

app.get('/:filename/merge' ,async (req,res)=>{
  const filename = req.params.filename;
var names=await [temp_path2+'\\'+filename+partsName[0],temp_path2+'\\'+filename+partsName[1],temp_path2+'\\'+filename+partsName[2]];
console.log(names);
console.log(temp_path2+'\\'+filename);
await splitFile.mergeFiles(names, temp_path2+'\\'+filename).then(()=>{
  console.log('Done!');
})


//   const readStream = await fs.createReadStream(temp_path2+'\\'+filename);
//   console.log(readStream);
//  readStream.pipe(res);
res.sendFile(temp_path2+'\\'+filename);
  
})
    


//---------------------------------------------------------------------------------------------------------------------------

app.post('/:encryptionKey/:fileName/upload', upload.single('file'),  async(req, res) => {

  var filename= req.params.fileName;
  var encryptionKey= req.params.encryptionKey;
  
  await encrypt(upload_1_Path+'\\'+ filename,filename,encryptionKey);
  res.send("ok");
  // res.redirect(`localhost:3000/${address}/HomePage`);
  
  })

  

 
  //---------------------------------------------------------------------------------------------------------------------

  app.get('/split/:fileName',async (req, res) => {
   
    var filename= req.params.fileName;
    try{
    await splitFile.splitFile(enc_path + '\\' +filename, 3).then((names) => {console.log(names)});
    res.send("ok");
    }catch(err){
      res.send(err);
    }
  })




//---------------------------------------------------------------------------------------------------------------------------

 app.post('/:contractAddress/:fileName/send',async (req,res)=>{

  

  var filename= req.params.fileName;

const activeDeviceCount = await factoryInstance.methods.getSummary().call();
// console.log(typeof(activeDeviceCount));
 const nodeData = await Promise.all(
   Array(parseInt(activeDeviceCount)).fill().map((element,index) =>{
     return factoryInstance.methods.activeNode(index).call()
   })
   );
   console.log(nodeData);


   var ipAddress=[];
   var count = parseInt(activeDeviceCount);
   var ctr2= parseInt(activeDeviceCount);
   var ctr =9 ,temp,index,k=0;
   var PartsId=[];
   var Parts_Node_mapping=[];

   for(var i=0;i<9;i++){

     if(count>0){
     ipAddress.push('http://'+nodeData[i].ipAddress+'/send');
     PartsId.push(nodeData[i].nodeID);
     count--;
   }else{
    var index = Math.floor(Math.random()*ctr2);
     ipAddress.push('http://'+nodeData[index].ipAddress +'/send');
     PartsId.push(nodeData[index].nodeID);
     
   }

 }


   while(ctr >0){
     index = Math.floor(Math.random()*ctr);
     ctr--;
     temp =ipAddress[ctr];
     ipAddress[ctr] =ipAddress[index];
     ipAddress[index] =temp;

     temp =PartsId[ctr];
     PartsId[ctr] =PartsId[index];
     PartsId[index] =temp;
   }

   
   for(var i=0;i<9;i++){
    console.log(ipAddress[i]);
  
 }

 for(var i=0;i<9;i++){
  console.log(PartsId[i]);
 }


for(var j=0;j<3;j++){

  for(var i=0;i<3;i++){
      var options = { method: 'POST',
      url: ipAddress[k],
      headers: 
      { 'Postman-Token': 'e65beb6a-3190-4851-bc1d-b691a589f594',
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
      formData: 
      { file: 
        { value: fs.createReadStream(enc_path+'\\'+filename+partsName[j]),
          options: 
          { filename: filename +partsName[j],
        contentType: null } 
        } 
      } 
};
 // axios.get(`http://${ipAddress[k]}:4000/nodeRieciving`);

 request(options, function (error, response, body) {
              if (error) throw new Error(error);
            
              console.log(body);
    });

    Parts_Node_mapping.push(PartsId[k]);

    k++;

  }


}

const accounts = await web3.eth.getAccounts();
console.log(accounts);
const contractAddress= req.params.contractAddress;


const userInstance= new web3.eth.Contract(
  JSON.parse(user.interface),contractAddress
);

await userInstance.methods.setFileDetailsOfPart1_2(
  filename,
  Parts_Node_mapping[0],
  Parts_Node_mapping[1],
  Parts_Node_mapping[2],
  Parts_Node_mapping[3],
  Parts_Node_mapping[4],
  Parts_Node_mapping[5]
).send({gas:3000000,from:accounts[0]});

await userInstance.methods.setFileDetailsOfPart3(
  filename,
  Parts_Node_mapping[6],
  Parts_Node_mapping[7],
  Parts_Node_mapping[8] 
).send({gas:3000000,from:accounts[0]});

console.log('donekkk');

res.send("File Successfully Upload!!");

 



// for(var i=0;i<9;i++){
//   console.log(Parts_Node_mapping[i]);
 
// }

 // axios.get(`http://localhost:4000/split/${filename}`);

 })


 


//--------------------------------------------------------------------------------------------------------------------------


 app.get('/:filename/downloadDecrypted',async(req,res)=>{

  var filename= req.params.filename;
  console.log(filename);
   
   res.sendFile(__dirname+'\\'+ 'decryptedFile'+ '\\' +filename);
  
 })

//  app.get('/demo',async(res,req)=>{
//   await res.download(__dirname+'\\'+ 'decryptedFile'+ '\\' +filename);
//  })


 app.get('/:filename/:ip/:part_No/download',async (req,res)=>{

   var filename = req.params.filename;
   var ip = req.params.ip;
   var part_No=req.params.part_No;
   ipAddress ='http://'+ip+':4000/recieve'+part_No;

   console.log(ipAddress);
  var options = { method: 'POST',
  url: ipAddress,
  headers: 
  { 'Postman-Token': 'e65beb6a-3190-4851-bc1d-b691a589f594',
  'cache-control': 'no-cache',
  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData: 
  { file: 
    { value: fs.createReadStream(temp_path+'\\'+filename),
      options: 
      { filename: filename,
    contentType: null } 
    } 
  } 
};

//console.log("immmmm");

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
    down_count++;
    console.log(down_count);
    if(down_count==3){
      down_count=0;
      res.send("ok");
    }
  
});
  
})

// app.get('/downloadStatus',(req,res)=>{
 
// })

// downloadStatus=()=>{
//   console.log("status");
//   if(down_count==3){
//      clearInterval(timmer);
//     return true;
//   }
// }


app.get('/ipAddress',(req,res)=>{
  var interfaces = os.networkInterfaces();
    
  var addresses = [];
  for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
          addresses.push(address.address);
      }
  }
}
res.send(addresses[2]);
})


app.get('/getFolderFiles',(req,res)=>{
  
  var names =[]
  fs.readdir(temp_path, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {

      
      names.push(file);
        
    });
    res.send(names);
});
 // console.log("Hello");
})

app.listen(PORT,'0.0.0.0', function () {
    console.log("Server is running on Port " + PORT);
    console.log(upload_1_Path);
    console.log(enc_path);
  });




  
