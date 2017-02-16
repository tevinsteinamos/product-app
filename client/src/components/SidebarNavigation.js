import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Link} from 'react-router';

import Sidebar from 'grommet/components/Sidebar';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Add from 'grommet/components/icons/base/Add';
import Cube from 'grommet/components/icons/base/Cube';
import Clear from 'grommet/components/icons/base/Clear';

import ManageProduct from './ManageProduct';

export default class SidebarNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProduct: false,
    };
    autobind(this);
  }
  _onRequestForAddProduct() {
    this.setState({addProduct: true});
  }
  _onAddProductCancel() {
    this.setState({addProduct: false});
  }
  render() {
    let addProductLayer;
    if (this.state.addProduct) {
      addProductLayer = (
        <ManageProduct onClose={this._onAddProductCancel} title="Add Product"/>
      );
    }
    let styles = {
      link: {
        textDecoration: 'none',
      },
      anchor: {
        fontSize: '16px',
        fontWeight: 'normal',
      },
    };
    return (
      <Sidebar colorIndex="neutral-4" size="small">
        <Heading align="center" margin="large" tag="h2" uppercase={true}>App</Heading>
        <Box pad={{horizontal: 'none'}} justify="start" flex="grow" primary={true}>
          <Menu primary={true}>
            <Link to="/" style={styles.link}>
              <Anchor icon={<Cube size="medium"/>} label="View Products" style={styles.anchor} size="large" tag="div" primary={true}>
              </Anchor>
            </Link>
            <Anchor icon={<Add size="medium"/>} label="Add Product" primary={true} style={styles.anchor} onClick={this._onRequestForAddProduct}>
            </Anchor>
            <Link to="/information" style={styles.link}>
              <Anchor icon={<Clear size="medium"/>} label="Just Another Route" style={styles.anchor} size="large" tag="div" primary={true}>
              </Anchor>
            </Link>
            <Link to="/extra-information" style={styles.link}>
              <Anchor icon={<Clear size="medium"/>} label="And A Filler" style={styles.anchor} size="large" tag="div" primary={true}>
              </Anchor>
            </Link>
          </Menu>
        </Box>
        {addProductLayer}
      </Sidebar>
    );
  }
}
