import {CREATE_PRODUCT, LOAD_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT} from './types';
import request from 'superagent';

const SERVER_URL = 'http://localhost:3000/products';

export function loadProducts(datas) {
  return {
    type: LOAD_PRODUCTS,
    payload: datas,
  };
}

export function loadProductsFromServer() {
  return (dispatch) => {
    return request
      .get(SERVER_URL)
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          dispatch(loadProducts(res.body.data));
        }
      });
  };
}

export function createProduct(data) {
  return {
    type: CREATE_PRODUCT,
    payload: data,
  };
}

export function createProductToServer(product) {
  return (dispatch) => {
    return request
      .post(`${SERVER_URL}/add`)
      .send(product)
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          dispatch(createProduct(res.body.newData));
        }
      });
  };
}

export function deleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
}

export function deleteProductFromServer(id) {
  return (dispatch) => {
    return request
      .get(`${SERVER_URL}/${id}/delete`)
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          dispatch(deleteProduct(id));
        }
      });
  };
}

export function editProduct(data) {
  return {
    type: EDIT_PRODUCT,
    payload: data,
  };
}

export function editProductToServer(product) {
  return (dispatch) => {
    return request
      .post(`${SERVER_URL}/${product.id}/edit`)
      .send(product)
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          dispatch(editProduct(res.body.newData));
        }
      });
  };
}
