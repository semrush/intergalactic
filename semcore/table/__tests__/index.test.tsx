import React from 'react';
import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
const { render, cleanup, axe } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Table from '../src';

describe('Table', () => {
  afterEach(cleanup);

  shouldSupportClassName(Table);
  shouldSupportRef(Table);

  test('should support correct render border inside table use primary', async () => {
    const component = (
      <>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.CellHead colSpan={2} />
              <Table.CellHead rowSpan={2}>head 3</Table.CellHead>
            </Table.Row>
            <Table.Row>
              <Table.CellHead>head 1</Table.CellHead>
              <Table.CellHead>head 2</Table.CellHead>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            <Table.Row>
              <Table.Cell>cell 1</Table.Cell>
              <Table.Cell>cell 2</Table.Cell>
              <Table.Cell>cell 3</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <br />
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.CellHead rowSpan={2}>head 1</Table.CellHead>
              <Table.CellHead rowSpan={2}>head 2</Table.CellHead>
              <Table.CellHead colSpan={2} />
            </Table.Row>
            <Table.Row>
              <Table.CellHead>head 3</Table.CellHead>
              <Table.CellHead>head 4</Table.CellHead>
            </Table.Row>
          </Table.Head>
        </Table>

        <br />
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.CellHead colSpan={2} />
              <Table.CellHead colSpan={2} />
            </Table.Row>
            <Table.Row>
              <Table.CellHead>head 1</Table.CellHead>
              <Table.CellHead>head 2</Table.CellHead>
              <Table.CellHead>head 3</Table.CellHead>
              <Table.CellHead>head 4</Table.CellHead>
            </Table.Row>
          </Table.Head>
        </Table>

        <br />
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.CellHead>head 1</Table.CellHead>
              <Table.CellHead>head 2</Table.CellHead>
              <Table.CellHead>head 3</Table.CellHead>
            </Table.Row>
          </Table.Head>
        </Table>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support correct render border inside table use secondary', async () => {
    const component = (
      <Table use="secondary">
        <Table.Head>
          <Table.Row>
            <Table.CellHead>head 1</Table.CellHead>
            <Table.CellHead>head 2</Table.CellHead>
            <Table.CellHead>head 3</Table.CellHead>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>cell 1</Table.Cell>
            <Table.Cell>cell 2</Table.Cell>
            <Table.Cell>cell 3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.CellHead>head 1</Table.CellHead>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          <Table.Row>
            <Table.Cell>cell 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Table.Head', () => {
  afterEach(cleanup);

  shouldSupportClassName(Table.Head, Table);
  shouldSupportRef(Table.Head, Table);
});

describe('Table.Body', () => {
  afterEach(cleanup);

  shouldSupportClassName(Table.Body, Table);
  shouldSupportRef(Table.Body, Table);
});

describe('Table.Row', () => {
  afterEach(cleanup);

  shouldSupportClassName(Table.Row, (props) => (
    <Table>
      <Table.Body {...props} />
    </Table>
  ));
  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <Table>
        <Table.Body>
          <Table.Row ref={ref} />
        </Table.Body>
      </Table>,
    );
    expect(ref.current.nodeName).toBe('TR');
  });
});

describe('Table.CellHead', () => {
  afterEach(cleanup);

  shouldSupportClassName(Table.CellHead, (props) => (
    <Table>
      <Table.Head>
        <Table.Row {...props} />
      </Table.Head>
    </Table>
  ));
  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.CellHead tag="th" ref={ref} />
          </Table.Row>
        </Table.Head>
      </Table>,
    );
    expect(ref.current.nodeName).toBe('TH');
  });

  test('should support active state', async () => {
    const component = (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.CellHead active>head 1</Table.CellHead>
            <Table.CellHead>head 2</Table.CellHead>
          </Table.Row>
        </Table.Head>
      </Table>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support text alignment', async () => {
    const component = (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.CellHead w={100}>head 1</Table.CellHead>
            <Table.CellHead w={100} align="center">
              head 2
            </Table.CellHead>
            <Table.CellHead w={100} textAlign="right">
              head 3
            </Table.CellHead>
          </Table.Row>
        </Table.Head>
      </Table>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support sorting icons', async () => {
    const component = (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.CellHead sorting="desc">head 1</Table.CellHead>
            <Table.CellHead sorting="asc">head 2</Table.CellHead>
          </Table.Row>
        </Table.Head>
      </Table>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Table.Cell', () => {
  afterEach(cleanup);

  shouldSupportClassName(Table.Cell, (props) => (
    <Table>
      <Table.Body>
        <Table.Row {...props} />
      </Table.Body>
    </Table>
  ));
  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell tag="td" ref={ref} />
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(ref.current.nodeName).toBe('TD');
  });
});

describe('Table.StickyHead', () => {
  afterEach(cleanup);

  shouldSupportClassName(Table.StickyHead, Table);
  shouldSupportRef(Table.StickyHead, Table);
  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Table>
        <Table.StickyHead data-testid="sticky" name="sticky" />
      </Table>,
    );

    expect(getByTestId('sticky').attributes['name'].value).toBe('sticky');
  });

  test('should support children', () => {
    const component = (
      <Table>
        <Table.StickyHead>
          <p data-testid="child">Test</p>
        </Table.StickyHead>
        <Table.Head />
      </Table>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });

  test('should added classes to Table, Head', () => {
    const { container } = render(
      <Table>
        <Table.StickyHead />
        <Table.Head>
          <Table.Row>
            <Table.CellHead width="200" />
          </Table.Row>
        </Table.Head>
      </Table>,
    );

    expect(container.querySelector('table').attributes.class.value).toContain('Table-parent');
    expect(container.querySelector('thead').attributes.class.value).toContain('Header-hidden');
  });
});
