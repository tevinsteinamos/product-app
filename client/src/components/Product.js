import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import * as actions from '../actions';

import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autobind(this);
  }
  render() {
    let {product} = this.props;
    let styles = {
      link: {
        textDecoration: 'none',
      },
    };
    return (
      <AccordionPanel heading={product.name} key={product.id} onChange={() => this.props.onChange()}>
        <Paragraph margin="medium">{product.description}</Paragraph>
        <Image src={product.image}></Image>
        <Footer pad={{between: 'medium', vertical: 'small', horizontal: 'small'}}>
          {/* <Button icon={<Edit />}
            label="Edit"
            style={styles.link}
            path="/"
            primary={false}
            secondary={false}
            accent={true}/>
          <Button icon={<Close />}
            label="Delete"
            style={styles.link}
            onClick={(event) => this._onDelete(product.id, event)}
            primary={false}
            secondary={true}
            accent={false} /> */}
        </Footer>
      </AccordionPanel>
    );
  }
}

export default connect(null, actions)(Product);
