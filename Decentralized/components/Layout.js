import React,{Component} from 'react';
import {container} from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
//import css from '../static/style.css';


class Layout extends Component {

	

	
  	render(){
  		return(
			  
  				<container>
  				<Head>
  				<link
						rel="stylesheet"
						href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
					/>
					
					</Head>
         
				<Header address={this.props.address} />
				
				
				
				{this.props.children}
				</container>
				
  			);
  	}

}



export default Layout;