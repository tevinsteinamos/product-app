// @flow
import createRouter from '../helpers/createRouter';

describe('createRouter', () => {

  it('should handle routes', () => {
    let router = createRouter();
    let hiHandler = jest.fn();
    router.addRoute('/hi', hiHandler);
    expect(hiHandler.mock.calls.length).toEqual(0);
    router.route('/hello');
    expect(hiHandler.mock.calls.length).toEqual(0);
    router.route('/hi');
    expect(hiHandler.mock.calls.length).toEqual(1);
  });

  it('should call not found handler when no routes match', () => {
    let router = createRouter();
    let hiHandler = jest.fn();
    router.addRoute('/hi', hiHandler);
    let notFoundHandler = jest.fn();
    router.onNotFound(notFoundHandler);
    // Begin routing
    router.route('/hi');
    expect(hiHandler.mock.calls.length).toEqual(1);
    expect(notFoundHandler.mock.calls.length).toEqual(0);
    router.route('/hello');
    expect(notFoundHandler.mock.calls.length).toEqual(1);
  });

  it('should match pattern with variable', () => {
    let router = createRouter();
    let productHandler = jest.fn();
    router.addRoute('/products/:id', (id) => {
      productHandler(id);
    });
    let notFoundHandler = jest.fn();
    router.onNotFound(notFoundHandler);

    // Begin routing
    router.route('/products');
    expect(productHandler.mock.calls.length).toEqual(0);
    expect(notFoundHandler.mock.calls.length).toEqual(1);

    router.route('/products/123');
    expect(productHandler.mock.calls.length).toEqual(1);
    expect(notFoundHandler.mock.calls.length).toEqual(1);
    expect(productHandler.mock.calls[0]).toEqual(['123']);
  });

});
