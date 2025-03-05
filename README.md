# react-json-tree

React JSON Viewer Component, Extracted from [redux-devtools](https://github.com/reduxjs/redux-devtools). Supports [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable) objects, such as [Immutable.js](https://facebook.github.io/immutable-js/).

### Usage

```jsx
import { JSONTree } from 'react-json-tree';
// If you're using Immutable.js: `npm i --save immutable`
import { Map } from 'immutable';

// Inside a React component:
const json = {
  array: [1, 2, 3],
  bool: true,
  object: {
    foo: 'bar',
  },
  immutable: Map({ key: 'value' }),
};

<JSONTree data={json} />;
```

### Theming

TODO/In progress. All base styles are a single css class of specificity, and can be overwritten in the consuming application.

```

#### Advanced Customization

```jsx
<div>
  <JSONTree
    data={data}
  />
</div>
```

#### Customize Labels for Arrays, Objects, and Iterables

You can pass `getItemString` to customize the way arrays, objects, and iterable nodes are displayed (optional).

By default, it'll be:

```jsx
<JSONTree getItemString={(type, data, itemType, itemString, keyPath)
  => <span>{itemType} {itemString}</span>}
```

But if you pass the following:

```jsx
const getItemString = (type, data, itemType, itemString, keyPath)
  => (<span> // {type}</span>);
```

Then the preview of child elements now look like this:

![](http://cl.ly/image/1J1a0b0T0K3c/screenshot%202015-10-07%20at%203.44.31%20PM.png)

#### Customize Rendering

You can pass the following properties to customize rendered labels and values:

```jsx
<JSONTree
  labelRenderer={([key]) => <strong>{key}</strong>}
  valueRenderer={(raw) => <em>{raw}</em>}
/>
```

In this example the label and value will be rendered with `<strong>` and `<em>` wrappers respectively.

For `labelRenderer`, you can provide a full path - [see this PR](https://github.com/chibicode/react-json-tree/pull/32).

Their full signatures are:

- `labelRenderer: function(keyPath, nodeType, expanded, expandable)`
- `valueRenderer: function(valueAsString, value, ...keyPath)`

#### More Options

- `shouldExpandNodeInitially: function(keyPath, data, level)` - determines if node should be expanded when it first renders (root is expanded by default)
- `hideRoot: boolean` - if `true`, the root node is hidden.
- `sortObjectKeys: boolean | function(a, b)` - sorts object keys with compare function (optional). Isn't applied to iterable maps like `Immutable.Map`.
- `postprocessValue: function(value)` - maps `value` to a new `value`
- `isCustomNode: function(value)` - overrides the default object type detection and renders the value as a single value
- `collectionLimit: number` - sets the number of nodes that will be rendered in a collection before rendering them in collapsed ranges
- `keyPath: (string | number)[]` - overrides the initial key path for the root node (defaults to `[root]`)

### Credits

- All credits to [Dave Vedder](http://www.eskimospy.com/) ([veddermatic@gmail.com](mailto:veddermatic@gmail.com)), who wrote the original code as [JSONViewer](https://bitbucket.org/davevedder/react-json-viewer/).
- Extracted from [redux-devtools](https://github.com/gaearon/redux-devtools), which contained ES6 + inline style port of [JSONViewer](https://bitbucket.org/davevedder/react-json-viewer/) by [Daniele Zannotti](http://www.github.com/dzannotti) ([dzannotti@me.com](mailto:dzannotti@me.com))
- [Iterable support](https://github.com/gaearon/redux-devtools/pull/79) thanks to [Daniel K](https://github.com/FredyC).
- npm package created by [Shu Uesugi](http://github.com/chibicode) ([shu@chibicode.com](mailto:shu@chibicode.com)) per [this issue](https://github.com/gaearon/redux-devtools/issues/85).
- Improved and maintained by [Alexander Kuznetsov](https://github.com/alexkuz). The repository was merged into [`redux-devtools` monorepo](https://github.com/reduxjs/redux-devtools) from [`alexkuz/react-json-tree`](https://github.com/alexkuz/react-json-tree).

### Similar Libraries
- [original react-json-tree](https://github.com/reduxjs/redux-devtools/tree/main/packages/react-json-tree)
- [react-treeview](https://github.com/chenglou/react-treeview)
- [react-json-inspector](https://github.com/Lapple/react-json-inspector)
- [react-object-inspector](https://github.com/xyc/react-object-inspector)
- [react-json-view](https://github.com/mac-s-g/react-json-view)

### License

MIT
