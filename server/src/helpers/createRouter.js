// @flow

type Route = {
  pattern: string;
  handler: Function;
};
type RouteList = Array<Route>;

function getMatch(url: string, pattern: string) {
  let urlParts = url.split('/');
  let patternParts = pattern.split('/');
  if (urlParts.length !== patternParts.length) {
    return null;
  }

  let idx = 0;
  let args = [];
  for (let part of patternParts) {
    if (!part.startsWith(':') && part !== urlParts[idx]) {
      return null;
    } else if (part.startsWith(':')) {
      args.push(urlParts[idx]);
    }
    idx++;
  }
  return args;
}

export default function createRoute(request: Object, response: Object) {
  let routeList: RouteList = [];
  let notFoundHandler: ?Function;
  return {
    addRoute: (pattern: string, handler: Function) => {
      routeList.push({pattern, handler});
    },
    onNotFound: (handler: Function) => {
      notFoundHandler = handler;
    },
    route: (url: string) => {
      for (let {pattern, handler} of routeList) {
        let args = getMatch(url, pattern);
        if (args) {
          handler(request, response, ...args);
          return;
        }
      }
      if (notFoundHandler != null) {
        notFoundHandler(request, response);
      }
    },
  };
}
