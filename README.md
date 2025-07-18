# gtk-grafana/react-json-tree

A zero dependency fork of [redux-devtools](https://github.com/reduxjs/redux-devtools) react-json-tree. 

This library preforms well as a simple but customizable JSON view component.

### Usage

```jsx
import { JSONTree } from "react-json-tree";
// If you're using Immutable.js: `npm i --save immutable`
import { Map } from "immutable";

// Inside a React component:
const json = {
  array: [1, 2, 3],
  bool: true,
  object: {
    foo: "bar",
  },
  immutable: Map({ key: "value" }),
};

<JSONTree data={json} />;
```

### Theming

Styling is managed via scss modules and css variables, it should be straight-forward to override these styles in the consuming application.
Basic theming is possible by overwriting the CSS variables in the [\_variables.scss](src%2Fstyles%2F_variables.scss).

For example:

```typescript jsx
<div
    style={
        {
            "--json-tree-label-color": "rgb(12, 127, 149)",
            "--json-tree-key-label-color": "rgb(71, 131, 0)",
            "--json-tree-label-value-color": "rgb(255, 48, 124)",
            "--json-tree-arrow-color": "rgb(12, 127, 149)",
            "--json-tree-value-text-wrap": "nowrap",
        } as React.CSSProperties
    }
>
    <JSONTree data={data}/>
</div>

```

````

#### Advanced Customization

```jsx
<div>
  <JSONTree
    data={data}
  />
</div>
````

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

![get-item-string-example.png](img%2Fget-item-string-example.png)

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

#### Adding interactive elements:

Using the labelRenderer method, you can add interactive elements to the labels:

```typescript jsx
// ...
<JSONTree
    data={data}
    labelRenderer={(keyPath, nodeType, expanded) => {
        <span>
            <IconButton name={"plus-circle"} />
            <IconButton name={"minus-circle"} />
            <strong>{keyPath[0]}</strong>
        </span>
    }}
/>
```

![buttons-example.png](img%2Fbuttons-example.png)


Or with a bit more customization:

<img width="831" height="717" alt="image" src="https://github.com/user-attachments/assets/2794a661-8b5c-464f-a871-f42374c9b5c8" />
<img width="843" height="639" alt="image" src="https://github.com/user-attachments/assets/e91c1966-2131-4dbb-92a1-2ecf6f30b57c" />



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
- Forked out of redux-devtools monorepo and stripped out all external dependencies by [Galen Kistler](https://github.com/gtk-grafana/react-json-tree/)

### Similar Libraries

- [original react-json-tree](https://github.com/reduxjs/redux-devtools/tree/main/packages/react-json-tree)
- [react-treeview](https://github.com/chenglou/react-treeview)
- [react-json-inspector](https://github.com/Lapple/react-json-inspector)
- [react-object-inspector](https://github.com/xyc/react-object-inspector)
- [react-json-view](https://github.com/mac-s-g/react-json-view)

### License

MIT
