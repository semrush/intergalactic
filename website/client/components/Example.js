import React from 'react';
import styled from 'styled-components';
import Code from './Code';
import Copy from './Copy';
import Sandbox from './Sandbox';
import CopyS from '@semcore/icon/lib/Copy/s';

const ExampleWrapper = styled.div`
  margin: 10px auto;
  border-radius: 6px;
  //overflow: hidden;
  box-shadow: rgb(204, 204, 204) 0 0 1px 1px;
`;

const View = styled.div`
  display: flex;
  padding: 24px;
  justify-content: center;
  font-size: 12px;
`;

const CodeView = styled.div`
  max-height: 500px;
  overflow: scroll;
  position: relative;
`;

const stylesIcons = `
  position: absolute;
  top: 16px;
  cursor: pointer;

  & > span {
    display: inline-block;
  }

  & svg {
    width: 22px;
    height: 22px;
    fill: #898d9a;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const IconCopy = styled.div`
  right: 16px;
  ${stylesIcons}
`;

const IconSandBox = styled.div`
  right: 54px;
  ${stylesIcons}
`;

class Example extends React.PureComponent {
  render() {
    const { raw, children } = this.props;
    return (
      <ExampleWrapper className="example">
        <View>
          <div style={{ width: '100%' }}>{children}</div>
        </View>
        <CodeView>
          <IconCopy>
            <Copy text={raw} textTooltip="Click to copy code">
              <CopyS />
            </Copy>
          </IconCopy>
          <IconSandBox>
            <Sandbox raw={raw} />
          </IconSandBox>
          <Code lang="jsx" block copy={false}>
            {raw}
          </Code>
        </CodeView>
      </ExampleWrapper>
    );
  }
}

export default Example;
