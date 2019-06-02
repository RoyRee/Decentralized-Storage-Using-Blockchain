const express = require('express');
const PORT = 3033;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const multer = require('multer');
const Axios = require('axios');
const request = require('request');
app.use(bodyParser.json());

const temp_path = path.resolve(__dirname+'\\'+'temp');
const temp_path2= path.resolve(__dirname+'\\'+'temp2');

// var filePath =[];
// filePath.push(temp_path);
// filePath.push(temp_path2);

// for(var i=0;i<2;i++){
//   console.log(filePath[i]);
// }

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, temp_path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, temp_path2)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload2 = multer({ storage: storage2 });

var upload = multer({ storage: storage });

app.post('/send',  upload.single('file'),(req,res)=>{
 

    res.send("Saved");

    //res.redirect('localhost:3000/');
})

app.post('/recieve',upload2.single('file'),(req,res)=>{
  res.send('saved Part');
})

// app.get('/:filename/:ip/download/', (req,res)=>{

// var filename = req.params.filename;
// var ip = req.params.ip;

// console.log(ip);

// //const output = fs.createWriteStream(__dirname+'//'+'recieved.kl');

// // Axios.get(`http://localhost:4000/${filename}/download`).then(respone=>{

// //     respone.pipe(output);
// // })

   
// })


app.get('/:filename/:ip/download',async (req,res)=>{

  var filename = req.params.filename;
  var ip = req.params.ip;
  ipAddress ='http://'+ip+':3033/recieve';

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


request(options, function (error, response, body) {
 if (error) throw new Error(error);

 console.log(body);
});

 })

app.listen(PORT, function () {
    console.log("Server is running on Port " + PORT);
  });