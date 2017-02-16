/**/ void function() {

// UMD 
var umd = function(autobind) { 
  switch(true) {
    // CommonJS
    case typeof module === 'object' && !!module.exports:
      module.exports = autobind;
      break;
    // AMD (Add a 'String' wrapper here to fuck webpack)
    case String(typeof define) === 'function' && !!define.amd:
      define('autobind', function() { return autobind; });
      break;
    // Global
    default:
      /**/ try { /* Fuck IE8- */
      /**/   if(typeof execScript === 'object') execScript('var autobind');
      /**/ } catch(error) {}
      window.autobind = autobind;
  }
};

var bindMethod = function(base, name, desc) {
  var get = desc.get;
  var value = desc.value;
  var writable = desc.writable;
  // For value property
  if(typeof value === 'function') {
    // Remove value description
    delete desc.writable;
    delete desc.value;
    // Replace to a getter function
    desc.get = function() {
      // The method must be bindable, If an autobinded method called on prototype,
      // Consider the static method has no prototype, so check the type to exclude static method
      if(this === base && typeof base !== 'function') return value;
      var boundValue = value.bind(this);
      // Save result to itself as a cache
      Object.defineProperty(this, name, {
        value: boundValue,
        enumerable: desc.enumerable,
        writable: writable,
        configurable: desc.configurable
      });
      return boundValue;
    };
    // Add a setter to avoid throw on assignment if writable
    if(writable) {
      desc.set = function(value) {
        Object.defineProperty(this, name, {
          value: value,
          enumerable: desc.enumerable,
          writable: writable,
          configurable: desc.configurable
        });
      };
    }
  }
  return desc;
};

var autobind = function(base, name, desc) {
  // For class
  if(typeof base === 'function' && name === void 0 && desc === void 0) {
    var prototype = base.prototype;
    Object.getOwnPropertyNames(prototype).forEach(function(name) {
      if(name === 'constructor') return;
      var desc = Object.getOwnPropertyDescriptor(prototype, name);
      if(typeof desc.value !== 'function') return;
      bindMethod(prototype, name, desc);
      Object.defineProperty(prototype, name, desc);
    });
  }
  // For method
  else if(typeof desc.value === 'function') {
    bindMethod(base, name, desc);
  }
};

umd(autobind);

/**/ }();
