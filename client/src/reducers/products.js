import {CREATE_PRODUCT, LOAD_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return state.concat([action.payload]);
    case LOAD_PRODUCTS:
      return state.concat(action.payload);
    case DELETE_PRODUCT: {
      return state.filter((product) => (action.payload !== product.id));
    }
    case EDIT_PRODUCT: {
      let newState = [].concat(state);
      let data = action.payload;
      let index = newState.findIndex((product) => (data.id === product.id));
      let newData = {
        id: newState[index].id,
        name: (data && data.name) ? data.name : '',
        image: (data && data.image) ? data.image : '',
        description: (data && data.description) ? data.description : '',
      };
      newState[index] = newData;
      return newState;
    }
  }
  return state;
}
