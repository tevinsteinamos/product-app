//@flow

type Handler = (error: ?Object, data: ?Object) => void;

export default function parseRequestBody(request: Object, fn: Handler) {
  let chunkList = [];
  request.on('data', (chunk: Buffer) => {
    chunkList.push(chunk);
  });
  request.on('end', () => {
    let jsonString = Buffer.concat(chunkList).toString();
    let data;
    try {
      data = JSON.parse(jsonString);
      fn(null, data);
    } catch (e) {
      fn(e, null);
      return;
    }
  });
}
