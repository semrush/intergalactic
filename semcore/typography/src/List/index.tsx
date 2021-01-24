import React, { HTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';

import Text, { ITextProps } from '../Text';

import style from './style/list.shadow.css';

export interface IListProps extends ITextProps {
  /** Marker of the entire list
   * @default • */
  marker?: React.ReactNode;
}

export interface IListItemProps extends ITextProps {
  /** Individual marker of a list item */
  marker?: React.ReactNode;
}

export interface IListContext extends IListProps {
  getItemProps?: PropGetter<List['getItemProps']>;
}

class List extends Component<IListProps> {
  static displayName = 'List';
  static style = style;
  static defaultProps = {
    marker: '•',
  };

  getItemProps() {
    const { marker } = this.asProps;
    return {
      marker,
    };
  }

  render() {
    const SList = this.Root;
    const { styles } = this.asProps;
    return styled(styles)(<SList render={Text} tag="ul" />);
  }
}

function Item(props: IFunctionProps<IListItemProps>) {
  const SItem = Text;
  const { styles, forwardRef, children, marker: markerNode, ...other } = props;
  const SMarker = 'span';
  const SContent = 'div';

  return styled(styles)(
    <SItem tag="li" ref={forwardRef} {...other}>
      {isNode(markerNode) && <SMarker>{markerNode}</SMarker>}
      <SContent>{children}</SContent>
    </SItem>,
  );
}

export default createComponent<
  Merge<IListProps, HTMLAttributes<HTMLUListElement>>,
  {
    Item: Merge<IListItemProps, HTMLAttributes<HTMLLIElement>>;
  },
  IListContext
>(List, { Item });
