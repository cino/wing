---
id: inflights
title: Preflight and Inflight 
description: "Wing's two execution phases: preflight and inflight"
keywords: [Inflights, Inflight functions, Preflight, Preflight code]
---

Wing has two execution phases:

- **preflight**: code that runs once, at compile time, to generate the infrastructure configuration of your cloud application. For example, setting up databases, queues, storage buckets, API endpoints, etc.
- **inflight**: code that runs at runtime to perform your application logic. For example, handling API requests, processing queue messages, etc. Inflight code can be executed on compute platforms in the cloud, such as function services (lambda), containers, VMs or physical servers.

One of the main differences between Wing and other languages is that it unifies both execution phases under the same programming model, through the concepts of preflight code and inflight code.

## Preflight code

Preflight code is code that runs once, at compile time, to generate the app's infrastructure configuration.

For example, this code snippet defines a storage bucket using a class from the standard library:

```js playground
bring cloud;

let data = new cloud.Bucket();

let orders = { "hummus": 100 };
data.addObject("orders.json", Json.stringify(orders));
```

`Bucket` is a class from the standard library, and `addObject()` is a preflight method of `Bucket`.

**There is no special annotation to define that this is preflight code because preflight is Wing's default execution phase.**

Compiling the program with the [Wing CLI](../tools/cli) will synthesize a configuration file which can be used to create the bucket and initialize its contents on a cloud provider.

Preflight code can be also used to configure services or set up more complex event listeners.

For example, this code snippet defines a bucket whose contents will be publicly accessible, and which will be pre-populated with a file during deployment (not while the app is running).

```js playground
bring cloud;

let bucket = new cloud.Bucket(public: true);
bucket.addObject("file1.txt", "Hello world!");
```

There are a few global functions with specific behaviors in preflight.
For example, adding a `log()` statement to your preflight code will result in Wing printing the string to the console after compilation.

```js playground
// hello.w
log("7 * 6 = ${7 * 6}");
```

```bash
$ wing compile hello.w
7 * 6 = 42
```

Likewise, `assert()` statements will be evaluated during preflight, and will cause compilation to fail if the assertion fails.

```js playground
// hello.w
assert(2 + 2 == 5);
```

```bash
$ wing compile hello.w
error: assertion failed: 2 + 2 == 5
```

## Inflight code

Inflight blocks are where you write asynchronous runtime code that can directly interact with resources through their inflight APIs.
Inflight functions can be easily packaged and executed onto compute platforms like containers, CI/CD pipelines or FaaS.
Inflight code can also be executed multiple times and on different machines in parallel.

Let's walk through some examples.

Inflight code is always contained inside a block that starts with the word `inflight`.

```js playground
let greeting = inflight () => {
  log("Hello from the cloud!");
};
```

Inflight code can call other inflight functions and methods.
For example, `cloud.Bucket` has an inflight method named `list()` that can be called inside inflight contexts:

```js playground
bring cloud;

let bucket = new cloud.Bucket();

let firstObject = inflight (): str => {
  let items = bucket.list();
  return items.at(0);
};
```

Even though `bucket` is defined in preflight, it's okay to use its inflight method in inflight code because it will always refer to the same bucket "instance" after deployment.

### Executing inflight code

For an inflight function to actually get executed, it must be provided to an API that expects inflight code. For example, we can provide it to a `cloud.Function`:

```js playground
bring cloud;

let func = new cloud.Function(inflight () => {
  log("Hello from the cloud!");
});
```

`cloud.Function` represents an ephemeral, short-lived function, and it expects an inflight function as its first argument. It's responsible for packaging the code (as well as any any other inflight code it calls) so that it can be executed on cloud compute platforms.

Today, inflights are typically compiled into JavaScript, but Wing may also be able to compile them into state machines, orchestrated workflows, and other formats in the future.

### Restrictions on inflight code

Inflight code cannot be executed during preflight, because inflight APIs assume all resources have already been deployed.

```js
firstObject(); // error: method "firstObject" cannot be called in preflight phase
```

Likewise, inflight code cannot call preflight code, because preflight code has the capability to modify your application's infrastructure configuration, which is disallowed after deployment.
For example, since `addObject` is a preflight method, it cannot be called in inflight:

```js playground
bring cloud;

let bucket = new cloud.Bucket();

let saveCalculation = inflight () => {
  bucket.addObject("file1", "${2 ** 10}"); // error: method "addObject" cannot be called in inflight phase
};
```

Instead, to insert an object into the bucket at runtime you would have to use an inflight method from the `Bucket` class, like `put`.

Since a class's initializer is just a special kind of preflight function, it also isn't possible to initialize regular classes during preflight:

```js playground
bring cloud;

inflight () => {
  new cloud.Bucket(); // error: preflight class "Bucket" cannot be created in inflight
};
```

## Combining preflight and inflight code

Preflight and inflight functions can be grouped together using classes.
A preflight class (the default kind of class) can contain both preflight and inflight methods, as well as preflight and inflight properties.

Here's a class that models a queue that can replay its messages.
A `cloud.Bucket` stores the history of messages, and a `cloud.Counter` helps with sequencing each new message as it's added to the queue.

```js playground
class ReplayableQueue {
  queue: cloud.Queue;
  bucket: cloud.Bucket; 
  counter: cloud.Counter;
  
  init() {
    this.queue = new cloud.Queue();
    this.bucket = new cloud.Bucket();
    this.counter = new cloud.Counter();
  }

  setConsumer(fn: inflight (str): str){
    this.queue.setConsumer(fn);
  }
  
  inflight push(m: str) {
    this.queue.push(m);
    this.bucket.put("messages/${this.counter.inc()}", m);
  }
  
  inflight replay(){
    for i in this.bucket.list() {
      this.queue.push(this.bucket.get(i));
    }
  }
}
```

It's also possible to define inflight classes.
An inflight class can only contain inflight methods and properties.
Inflight classes are safe to create in inflight contexts.

For example, this inflight class can be created in an inflight contexts, and its methods can be called in inflight contexts:

```js playground
inflight () => {
  class Person {
    name: str;
    age: int;

    init(name: str, age: int) {
      this.name = name;
      this.age = age;
    }

    inflight greet() {
      log("Hello, ${this.name}!");
    }
  }

  let p = new Person("John", 30);
  p.greet();
};
```

## Using preflight data from inflight

While inflight code can't call preflight code, it's perfectly ok to reference data from preflight.

For example, the `cloud.Api` class has a preflight field named `url`.
Since it's a piece of static data, it can be directly referenced inflight:

```js playground
bring cloud;
bring http;

let api = new cloud.Api();
api.get("/test", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: "success!"
  };
});

let checkEndpoint = inflight () => {
  let url = api.url; // this is OK
  let path = "${url}/test";
  let response = http.get(path);
  assert(response.status == 200);
};
new cloud.Function(checkEndpoint);
```

However, mutation to preflight data is not allowed.
This mean means that variables from preflight cannot be reassigned to, and mutable collections like `MutArray` and `MutMap` cannot be modified.

```js playground
let var count = 3;
let names = MutArray<str>["John", "Jane", "Joe"];

count = count + 1; // OK
names.push("Jack"); // OK

inflight () => {
  count = count + 1; // error: variable "count" cannot be reassigned in inflight
  names.push("Jill"); // error: variable "names" cannot be mutated in inflight
};
```

## Phase-independent code

The global functions `log`, `assert`, `throw`, and `panic` can all be used in both preflight and inflight code.

Issue [#435](https://github.com/winglang/wing/issues/435) is tracking support for the capability to define phase-independent functions.

## Summary

- Preflight code is code that runs once, at compile time, to generate the infrastructure configuration of your cloud application.
- Inflight code is code that runs at runtime to handle your application logic.
- Wing programs start in preflight, but can switch to inflight using the `inflight` keyword.
- Preflight functions can only call other preflight functions, and inflight functions can only call other inflight functions.
- Classes can be used to group preflight and inflight code together.
- A class's inflight methods can only be called in inflight contexts, and a class's preflight methods can only be called in preflight contexts.
- Inflight code can reference data like global variables and class fields from preflight, but the data cannot be mutated.
