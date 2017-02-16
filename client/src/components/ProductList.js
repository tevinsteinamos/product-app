import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import * as actions from '../actions';

import ManageProduct from './ManageProduct';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProduct: false,
      initialEditValue: {},
    };
    autobind(this);
  }
  componentWillMount() {
    if (this.props.products.length === 0) {
      this.props.loadProductsFromServer();
    }
  }
  _onRequestForEditProduct(product) {
    this.setState({
      editProduct: true,
      initialEditValue: product,
    });
  }
  _onEditProductCancel() {
    this.setState({
      editProduct: false,
      initialEditValue: {},
    });
  }
  _onDelete(id, event) {
    event.preventDefault();
    this.props.deleteProductFromServer(id);
  }
  render() {
    let editProductLayer;
    if (this.state.editProduct) {
      editProductLayer = (
        <ManageProduct initialEditValue={this.state.initialEditValue} onClose={this._onEditProductCancel} title="Edit Product"/>
      );
    }
    let styles = {
      link: {
        textDecoration: 'none',
      },
    };
    let products = this.props.products.map((product) => {
      return (
        <AccordionPanel heading={product.name} key={product.id}>
          <Paragraph margin="medium">{product.description}</Paragraph>
          <Image src={product.image}></Image>
          <Footer pad={{between: 'medium', vertical: 'small', horizontal: 'small'}}>
            <Button icon={<Edit />}
              label="Edit"
              style={styles.link}
              onClick={() => this._onRequestForEditProduct(product)}
              primary={false}
              secondary={false}
              accent={true}/>
            <Button icon={<Close />}
              label="Delete"
              style={styles.link}
              onClick={(event) => this._onDelete(product.id, event)}
              primary={false}
              secondary={true}
              accent={false} />
          </Footer>
        </AccordionPanel>
      );
    });
    return (
        <Box align="stretch"
          pad="large"
          responsive={true}>
          <Heading strong={false}
            truncate={false}
            tag="h2"
            align="center">
            Product List
          </Heading>
          <Accordion>
            {products}
          </Accordion>
          {editProductLayer}
        </Box>
    );
  }
}

function mapStateToProps(state) {
  return {products: state.products};
}

export default connect(mapStateToProps, actions)(ProductList);
