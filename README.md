# Coordinator
<p>
Intuitive, dependency-free and lightweight module for managing events based on the publish-subscribe model.
</p>

## Notes
* All browsers are supported.
* Browserify support.
* RequireJS support.
* No dependencies.

## Kick-off
Download the latest version from Github or via npm.
```
npm i event.coordinator
```
Unless you are using a Javascript module loader like Browserify or RequireJS, you may
drop the minified JS file located in the dist folder onto the body of your HTML page.
```html
<script src="<path to dist folder>/coordinator.js"></script>
```

## API

#### subscribe
<p>
Subscribes the supplied function to the supplied event. The scope refers to the 
scope within which the function is called upon event broadcast. The scope defaults
to null value if not specified.
</p>
</p>
When successful, it returns the number of callbacks subscribed to the event; returns
false if the arguments are malformed.
</p>

```js
/**
 * Subscribes the passed-in function to the passed-in event
 *
 * @param {String} eventName is the event name
 * @param {Function} callbackFunction listener function
 * @param {(Object|null)} scope is the scope context of the listener function
 * @return {(Boolean|Number)}
 */
Coordinator.subscribe(eventName, callbackFunction, scope);
```

#### broadcast
<p>
Accounces that the supplied event has been dispatched, and fires the subscribed functions.
</p>

```js
/**
 * Broadcast supplied event to its subscribers with optional data
 *
 * @param {String} eventName is the event name
 * @param {*} data
 * @return {Boolean}
 */
Coordinator.broadcast(eventName, data);

```
#### unsubscribe
<p>
Unsubscribes the supplied function from the supplied
event's subscriber list.
</p>
```js
/**
 * Unsubscribes the passed-in function from the passed-in events list
 *
 * @param {String} eventName is the event name
 * @param {Function} fn callbackFunction function
 * @param {(Object|null)} scope is the scope context of the listener function
 * @return {Boolean}
 */
Coordinator.unsubscribe(eventName, callbackFunction, scope);

```

## Example and Usage

Coordinator implements the standard functionality of a publish-subscribe service.
In [this article](http://offsidev.com/), I break down its usability in a real-life example.

## Build
Simple. Clone this repository to your workspace.
```
git clone https://github.com/offsidev/coordinator.git
```
Enter Coordinator's directory, then run:
```
gulp minify
```
Note that you need Gulp installed both globally and as a project dependency.
A minified version will be generated in the dist/ directory.

## Running Unit Tests
<p>Make sure you have the required dependencies installed to your project via:</p>

```
npm install
```

Then run:

```
npm test
```






