import React ,{Component} from 'react';
import { Spinner } from 'react-bootstrap';
import Head from 'next/head';
import {  Segment ,Container } from 'semantic-ui-react';


class nodeHomePage extends Component{

   
    
    render(){
        return(

            
            <div >

            <Segment inverted color='teal' size='massive' fluid="true">
            Decentralized File Storage Using BlockChain
            </Segment>
                        <Head>
                            <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
            />
            <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />
                        </Head>
            <Container>
            <div style={{ position: 'absolute' ,left:300, top: 200,right:300 ,bottom:300, textAlign:'center'}}>
            <Spinner animation="grow"  />
            </div>

            <div style={{  position: 'absolute', left:300, top: 300,right:300 ,bottom:300 , textAlign:'center'  }}>
                <h1>Waiting for incoming File.......</h1>
            </div>
            
            
            
            </Container>

            </div>
           

            
        );
    }
}
export default nodeHomePage;