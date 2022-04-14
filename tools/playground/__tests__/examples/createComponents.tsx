import createComponent, { Component, CONTEXT_COMPONENT } from '@semcore/core';

const ComponentTest = createComponent(ComponentTestRoot, {
  Item: ComponentTestItem,
});

class ComponentTestAddonRoot extends Component {
  static contextType = ComponentTest[CONTEXT_COMPONENT];
  render() {
    const { Root } = this;
    return <Root render={Box} />;
  }
}

export const ComponentTestChild = createComponent(ComponentTestAddonRoot);
