import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

class Playground extends Component {
  static widgets = {};

  static createWidget = function (widgetType, fn) {
    Playground.widgets[widgetType] = fn;
  };

  static getState = function (preview, controls) {
    return getState(preview, controls);
  };

  controlsOptionsToControlsWidgets(controls) {
    return controls.map((control, i) => ({
      name: control.name,
      widgets: Object.keys(control.options).reduce((widgets, key) => {
        const { widgetType, ...option } = control.options[key];
        const Widget = Playground.widgets[widgetType];
        const props = {
          ...option,
          onChange: (value) => {
            controls[i].options[key].value = value;
            this.props.onChangeControls(controls);
          },
        };
        widgets.push(<Widget {...props} />);
        return widgets;
      }, []),
    }));
  }

  getState() {
    const { preview, controls: prevControls, filterProps, onChangeControls } = this.props;
    const controls = [];

    const createGroupWidgets = (groupName) => {
      const options = {};
      const control = {
        name: groupName,
        options,
      };
      controls.push(control);
      return Object.keys(Playground.widgets).reduce(
        (widgetsType, type) => {
          widgetsType[type] = (attr) => {
            const { defaultValue, key, ...rest } = attr;
            const prevControl = prevControls.find(
              (control) => control.name === groupName && control.options[key],
            );
            const value = prevControl ? prevControl.options[key].value : defaultValue;
            if (options[key]) {
              throw new Error(`key="${key}" already exists, "key" unique property.`);
            } else {
              options[key] = {
                ...rest,
                widgetType: type,
                value,
                key,
              };
            }
            return value;
          };
          return widgetsType;
        },
        {
          onChange: function (key, value) {
            onChangeControls(
              controls.map((control) => {
                if (control.name === groupName && control.options[key]) {
                  control.options[key].value = value;
                }
                return control;
              }),
            );
          },
        },
      );
    };

    const component = preview(createGroupWidgets);
    return {
      result: component,
      source: reactElementToJSXString(component, {
        showDefaultProps: false,
        useFragmentShortSyntax: false,
        maxInlineAttributesLineLength: 40,
        filterProps,
      }),
      controls,
    };
  }

  render() {
    const state = this.getState();
    return this.props.children({
      ...state,
      widgetControls: this.controlsOptionsToControlsWidgets(state.controls),
    });
  }
}

export default Playground;
