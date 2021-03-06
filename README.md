# observed-state
A [demo](https://ankar71.github.io/observed-state/) that shows how state management can implemented using [uce-template](https://github.com/WebReflection/uce-template/).

## Description
Use `observedReactive` in your `setup` instead of `reactive` if you want your ice-template custom elements to synchronize their states.

This function implements an observer pattern that synchronizes the state of your custom-elements that use the same model. The model is just a string label that is passed in the custom elements as prop.

## observedReactive
It takes 3 arguments: *element*, *initialValue* and *options*
* _element_: the element handle as passed in the `setup`. The element must have a `model` prop containing a non empty string.
* _initialValue_: an initial value for youe state (it can be anything). In the case ther is another element that uses the `source` option (see below), this is ignored.
* _options_: {observe: bool, source: bool}. Default values are both `false`. Use `source: true` in the element the state of which should be used as the initial value for other elements (observers). You should have only one such element per model. Use `observe: true` if you want your element to synchronize its state when other elements change their state using the same model.

_Return value_: the same as  the return value of `reactive`. For example, the equivelant of `reactive({count: 0})` is `sharedReactive(el, 0, {observe: true})` if `el.model === 'count'`.

The implementation of `observedReactive` is very simple and you can check it out in the `uce-template-observed-state.js` file if you have further questions.

## Example
Check out the `index.html` file.

## Next steps
Add a `persist` option so that the state can be shared between different html files (pages) using local storage.