import Axios from 'axios';

 var download_status=false;

async function download(meta1_2,meta3,activeNode,ipAddress,fileName) {

    

console.log('http://'+ activeNode[0].ipAddress+'/'+fileName+'/'+ipAddress+'/download');
        for(var j=0;j<activeNode.length;j++){

            if((meta1_2[1]== activeNode[j].nodeID)){
                
                 Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part1/${ipAddress}/1/download`).then(res=>{
                    if(res.status ==200){
                        
                    console.log(res + 'p11');
                        download_status =true;
                        
                    }
                });
                break;
            }else{
                if((meta1_2[2]== activeNode[j].nodeID)){
                     
                     Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part1/${ipAddress}/1/download`).then(res=>{
                        if(res.status ==200){
                        console.log(res + 'p12');
                        download_status =true;
                        
                       
                        }
                    });
                    break;
                }else{
                    if((meta1_2[3] == activeNode[j].nodeID)){
                         
                         Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part1/${ipAddress}/1/download`).then(res=>{
                            if(res.status ==200){
                           
                            console.log(res + 'p13');
                            download_status =true;
                            
                            }
                        });
                        break;
                    }
                }
            }

        }

        for(var j=0;j<activeNode.length;j++){

            if((meta1_2[4]== activeNode[j].nodeID)){
                  
                 Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part2/${ipAddress}/2/download`).then(res=>{
                    if(res.status ==200){
                   
                    console.log(res + 'p21');
                    download_status =true;
                    
                    }
                });
                break;
            }else{
                if((meta1_2[5]== activeNode[j].nodeID)){
                      
                     Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part2/${ipAddress}/2/download`).then(res=>{
                        if(res.status ==200){
                       
                        console.log(res + 'p22');
                        download_status =true;
                        
                        }
                    });
                    break;
                }else{
                    if((meta1_2[6] == activeNode[j].nodeID)){
                         
                         Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part2/${ipAddress}/2/download`).then(res=>{
                            if(res.status ==200){
                           
                            console.log(res + 'p23');
                            download_status =true;
                            
                            }
                        });
                        break;
                    }
                }
            }

        }

        for(var j=0;j<activeNode.length;j++){

            if((meta3[1]== activeNode[j].nodeID)){
                  
                 Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part3/${ipAddress}/3/download`).then(res=>{
                    if(res.status ==200){
                   
                    console.log(res + 'p31');
                    download_status =true;
                    
                    }
                });
                break;
            }else{
                if((meta3[2]== activeNode[j].nodeID)){
                     
                     Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part3/${ipAddress}/3/download`).then(res=>{
                        if(res.status ==200){
                       
                        console.log(res + 'p32');
                        download_status =true;
                        
                        }
                    });
                    break;
                }else{
                    if((meta3[3] == activeNode[j].nodeID)){
                          
                         Axios.get(`http://${activeNode[j].ipAddress}/${fileName}.sf-part3/${ipAddress}/3/download`).then(res=>{
                            if(res.status ==200){
                           
                            console.log(res + 'p33');
                            download_status =true;
                            
                            }
                        });
                        break;
                    }
                }
            }

        }

        // return (
        //     // 
         
        // Axios.get(`http://localhost:4000/downloadStatus`)
        //     download_status
        // );
      
}


export {download ,download_status };
//export var download_status;
