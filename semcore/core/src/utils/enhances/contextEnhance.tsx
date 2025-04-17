import React from 'react';

function contextEnhance(context: React.Context<any>, setOnProp: string) {
  return (props: any) => {
    const { ...other } = props;
    const value = React.useContext(context);
    return {
      ...other,
      [setOnProp]: value,
    };
  };
}

export default contextEnhance;
