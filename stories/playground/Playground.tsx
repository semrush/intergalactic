import React from 'react';

function createFunctionalComponent<PublicProps extends Record<string, unknown>, InternalProps extends Record<string, unknown> = {}>(Component: React.FC<PublicProps & InternalProps>) {
  return (props: PublicProps) => {
    return <Component {...props as PublicProps & InternalProps} />;
  };
}

type Props = {
  prop1: string;
};

type InternalProps = {
  internalProp1: string;
};

const Foo = createFunctionalComponent<Props, InternalProps>((props) => {
  const { internalProp1 } = props;
  return <p>Foo</p>;
});

const Demo = () => {
  return <Foo prop1='test' />;
};

export default Demo;
