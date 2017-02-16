## autobind

autobind decorator

#### Usage

###### Auto bind method

```js
class A {
  constructor() {
    this.x = 123;
  }
  @autobind
  f() {
    return this.x;
  }
  g() {
    return this.x;
  }
}

var a = new A();

a.f.call({ x: 456 }) === 123; // true
a.g.call({ x: 456 }) === 456; // true
```

###### Auto bind class methods

```js
@autobind
class A {
  constructor() {
    this.x = 123;
  }
  f() {
    return this.x;
  }
  g() {
    return this.x;
  }
}

var a = new A();

a.f.call({ x: 456 }) === 123; // true
a.g.call({ x: 456 }) === 123; // true
```
