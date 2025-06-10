import propsForElement from '@semcore/core/lib/utils/propsForElement';
import React from 'react';

type FilteredTags<T, ValueType> = {
  [K in keyof T]: K extends ValueType ? K : never
}[keyof T];

type AvailableTags = FilteredTags<JSX.IntrinsicElements, keyof SVGElementTagNameMap>;

type SvgElementProps<T extends AvailableTags> = React.SVGProps<SVGElementTagNameMap[T]> & {
  tag: T;
};

export const SvgElement = <T extends AvailableTags>({ tag: Tag, ...props }: SvgElementProps<T>) => {
  return (
    // @ts-ignore
    <Tag {...propsForElement(props, Tag)} />
  );
};
