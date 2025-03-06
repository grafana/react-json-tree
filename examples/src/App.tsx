import React from 'react';
import { Map } from 'immutable';
import { JSONTree } from 'react-json-tree';

const getItemString = (type: string) => (
  <span>
    {' // '}
    {type}
  </span>
);

const longString =
  'Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.Loremipsumdolorsitamet,consecteturadipiscingelit.Namtempusipsumutfelisdignissimauctor.Maecenasodiolectus,finibusegetultricesvel,aliquamutelit.';  

class Custom {
  value: unknown;

  constructor(value: unknown) {
    this.value = value;
  }

  get [Symbol.toStringTag]() {
    return 'Custom';
  }
}

const data: Record<string, any> = {
  array: [1, 2, 3],
  emptyArray: [],
  bool: true,
  date: new Date(),
  error: new Error(longString),
  object: {
    foo: {
      bar: 'baz',
      nested: {
        moreNested: {
          evenMoreNested: {
            veryNested: {
              insanelyNested: {
                ridiculouslyDeepValue: 'Hello',
              },
            },
          },
        },
      },
    },
    baz: undefined,
    func: function User() {
      // noop
    },
  },
  emptyObject: {},
  symbol: Symbol('value'),
   
  immutable: Map<any, any>([
    ['key', 'value'],
    [{ objectKey: 'value' }, { objectKey: 'value' }],
  ]),
  map: new window.Map<any, any>([
    ['key', 'value'],
    [0, 'value'],
    [{ objectKey: 'value' }, { objectKey: 'value' }],
  ]),
  weakMap: new window.WeakMap([
    [{ objectKey: 'value' }, { objectKey: 'value' }],
  ]),
  set: new window.Set(['value', 0, { objectKey: 'value' }]),
  weakSet: new window.WeakSet([
    { objectKey: 'value1' },
    { objectKey: 'value2' },
  ]),
  hugeArray: Array.from({ length: 10000 }).map((_, i) => `item #${i}`),
  customProfile: {
    avatar: new Custom('placehold.it/50x50'),
    name: new Custom('Name'),
  },
  longString,
};

const App = () => (
  <div>
    <JSONTree<Record<string, any>> data={data} />
    <br />
    <h3>Dark Theme</h3>
    <JSONTree<Record<string, any>> data={data} />

    <h3>Style Customization</h3>
    <ul>
      <li>
        Label changes between uppercase/lowercase based on the expanded state.
      </li>
      <li>Array keys are styled based on their parity.</li>
      <li>
        The labels of objects, arrays, and iterables are customized as &quot;//
        type&quot;.
      </li>
      <li>See code for details.</li>
    </ul>
    <div>
      <JSONTree<Record<string, any>>
        data={data}
        getItemString={getItemString}
      />
    </div>
    <h3>More Fine Grained Rendering</h3>
    <p>
      Pass <code>labelRenderer</code> or <code>valueRenderer</code>.
    </p>
    <div>
      <JSONTree<Record<string, any>>
        data={data}
        labelRenderer={([raw]) => <span>(({raw})):</span>}
        valueRenderer={(raw) => (
          <em>
            <span role="img" aria-label="mellow">
              😐
            </span>{' '}
            {raw as string}{' '}
            <span role="img" aria-label="mellow">
              😐
            </span>
          </em>
        )}
      />
    </div>
    <p>
      Sort object keys with <code>sortObjectKeys</code> prop.
    </p>
    <div>
      <JSONTree<Record<string, any>> data={data} sortObjectKeys />
    </div>
    <p>Collapsed root node</p>
    <div>
      <JSONTree<Record<string, any>>
        data={data}
        shouldExpandNodeInitially={() => false}
      />
    </div>
  </div>
);

export default App;
