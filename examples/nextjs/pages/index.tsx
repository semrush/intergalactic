import Link from 'next/link';

export default function IndexPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href="/accordion">
        <a>Accordion example</a>
      </Link>
      <Link href="/button">
        <a>Button example</a>
      </Link>
      <Link href="/d3-chart">
        <a>D3-chart example</a>
      </Link>
    </div>
  );
}
