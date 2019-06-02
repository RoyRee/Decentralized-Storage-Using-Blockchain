import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {Link,Router} from '../routes';

export default class MenuExampleInvertedSegment extends Component {




  state = { activeItem: 'Login' };

 
  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted color='teal' >
        <Menu inverted color='teal' secondary  size ='large' stackable>


           <Link route ={`/userInstances/${this.props.address}/HomePage`}>
          <Menu.Item 
          name='home'
           active={activeItem === 'home'} 
            />
           </Link>

          <Link route={`/userInstances/${this.props.address}/userFiles`}>
          <Menu.Item
            name='Your Files'
            
          />
          </Link>
          
          <Link route={`/userInstances/${this.props.address}/fileDecrypter`}>
          <Menu.Item
          name='File Decrypter'
          />
          </Link>

          <Link route={`/`}>
          <Menu.Item
          name='Logout'
          />
          </Link>
          

        </Menu>
      </Segment>
    )
  }
}
