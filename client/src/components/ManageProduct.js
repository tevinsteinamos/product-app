import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    if (this.props.initialEditValue && this.props.initialEditValue !== {}) {
      this.state = {
        name: this.props.initialEditValue.name,
        description: this.props.initialEditValue.description,
        image: this.props.initialEditValue.image,
      };
    } else {
      this.state = {
        name: '',
        description: '',
        image: '',
      };
    }
  }
  _onSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.description && this.state.image) {
      if (this.props.title === 'Add Product') {
        this.props.createProductToServer({
          name: this.state.name,
          description: this.state.description,
          image: this.state.image,
        });
      } else if (this.props.title === 'Edit Product') {
        this.props.editProductToServer({
          id: this.props.initialEditValue.id ? this.props.initialEditValue.id : '',
          name: this.state.name,
          description: this.state.description,
          image: this.state.image,
        });
      }
      this.setState({
        name: '',
        description: '',
        image: '',
      });
      this.props.onClose();
    }
  }
  _onNameChange(event) {
    this.setState({name: event.target.value});
  }
  _onDescriptionChange(event) {
    this.setState({description: event.target.value});
  }
  _onImageChange(event) {
    this.setState({image: event.target.value});
  }
  render() {
    let styles = {
      button: {
        backgroundColor: '#49516F',
      }
    };
    return (
      <Layer align="right" closer={true} onClose={this.props.onClose}>
        <Header pad={{vertical: 'large'}}>
          <Heading>{this.props.title}</Heading>
        </Header>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label="Product Name" htmlFor="labelId">
                <input type="text" name="name" value={this.state.name}
                  onChange={this._onNameChange} />
              </FormField>
              <FormField label="Product Image URL" htmlFor="labelId">
                <input type="text" name="image" value={this.state.image}
                  onChange={this._onImageChange} />
              </FormField>
              <FormField label="Product Description" htmlFor="labelId">
                <textarea name="description" style={styles.textArea} rows="5" value={this.state.description}
                  onChange={this._onDescriptionChange} />
              </FormField>
            </fieldset>
          </FormFields>
        </Form>
        <Footer pad={{vertical: 'medium'}}>
          <Button primary={true} style={styles.button} fill={true} type="submit"
            label={this.props.title} onClick={this._onSubmit} />
        </Footer>
      </Layer>
    );
  }
}

export default connect(null, actions)(ManageProduct);
