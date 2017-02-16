// @flow
import EventEmitter from 'events';
import parseRequestBody from '../helpers/parseRequestBody';

describe('parseRequestBody', () => {
  it('should parse requests', () => {
    let mockRequest = new EventEmitter();
    let handler = jest.fn();

    parseRequestBody(mockRequest, (error, data) => {
      handler(error, data);
    });

    mockRequest.emit('data', new Buffer('asdf'));
    mockRequest.emit('end');

    expect(handler.mock.calls.length).toEqual(1);
  });
});
