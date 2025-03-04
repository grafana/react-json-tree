// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>
import JSONNode from './JSONNode.js';
import type {
  CommonExternalProps,
  GetItemString,
  IsCustomNode,
  LabelRenderer,
  ShouldExpandNodeInitially,
} from './types.js';

import styles from "./styles/tree.module.scss"

interface Props extends Partial<CommonExternalProps> {
  data: unknown;
}

const identity = (value: any) => value;
const expandRootNode: ShouldExpandNodeInitially = (keyPath, data, level) =>
  level === 0;
const defaultItemString: GetItemString = (type, data, itemType, itemString) => (
  <span>
    {itemType} {itemString}
  </span>
);
const defaultLabelRenderer: LabelRenderer = ([label]) => <span>{label}:</span>;
const noCustomNode: IsCustomNode = () => false;

export function JSONTree({
  data: value,
  keyPath = ['root'],
  labelRenderer = defaultLabelRenderer,
  valueRenderer = identity,
  shouldExpandNodeInitially = expandRootNode,
  hideRoot = false,
  getItemString = defaultItemString,
  postprocessValue = identity,
  isCustomNode = noCustomNode,
  collectionLimit = 50,
  sortObjectKeys = false,
}: Props) {
  console.log('hellloo world??????')

  return (
     <ul role={'group'} className={styles.tree}>
      <JSONNode
        keyPath={hideRoot ? [] : keyPath}
        value={postprocessValue(value)}
        isCustomNode={isCustomNode}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
        shouldExpandNodeInitially={shouldExpandNodeInitially}
        hideRoot={hideRoot}
        getItemString={getItemString}
        postprocessValue={postprocessValue}
        collectionLimit={collectionLimit}
        sortObjectKeys={sortObjectKeys}
      />
    </ul>
  );
}

export type {
  Key,
  KeyPath,
  GetItemString,
  LabelRenderer,
  ValueRenderer,
  ShouldExpandNodeInitially,
  PostprocessValue,
  IsCustomNode,
  SortObjectKeys,
  CommonExternalProps,
} from './types.js';
