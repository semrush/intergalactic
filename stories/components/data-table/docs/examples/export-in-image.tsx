import React from 'react';
import { Flex } from '@semcore/flex-box';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';
import { DataTable } from '@semcore/data-table';

const extensions = ['png', 'jpeg', 'webp'];

const Demo = () => {
  const tableRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<SVGForeignObjectElement>(null);
  const width = 500;
  const height = 300;

  const downloadImage = React.useCallback(
    (extention: string) => async () => {
      if (tableRef.current) {
        ref.current?.append(tableRef.current.cloneNode(true));

        const svgElement = ref.current?.parentElement;

        if (svgElement) {
          let svgText = svgElementToSvgText(svgElement);
          svgText = svgText.replace('xmlns="http://www.w3.org/1999/xhtml"', '');
          svgText = svgText.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
          svgText = svgText.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

          const downloadUrl = await svgText2DownloadUrl(svgText, 2 * width, 2 * height, extention);

          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `image.${extention}`;

          link.dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window,
            }),
          );

          setTimeout(() => {
            link.remove();
          }, 100);
        }
      }
    },
    [],
  );

  return (
    <Flex>
      <div style={{ display: 'none' }}>
        <svg xmlns='http://www.w3.org/2000/svg' width='500' height='300' aria-hidden='true'>
          <foreignObject width='100%' height='100%' ref={ref} />
        </svg>
      </div>

      <DataTable
        data={data}
        aria-label={'Export in image'}
        ref={tableRef}
        w={500}
        columns={[
          { name: 'keyword', children: 'Keyword' },
          { name: 'kd', children: 'KD %' },
          { name: 'cpc', children: 'CPC' },
          { name: 'vol', children: 'Vol.' },
        ]}
      />

      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button} ml={4}>
          <Button.Addon>
            <FileExportM />
          </Button.Addon>
          <Button.Text>Export</Button.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax='257px' aria-label={'Extensions'}>
          <DropdownMenu.List>
            {extensions.map((name) => (
              <DropdownMenu.Item key={name} onClick={downloadImage(name)}>
                {name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
    </Flex>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

const getCSSStyles = (parentElement: Element) => {
  const selectorTextArr: string[] = [];

  for (let c = 0; c < parentElement.classList.length; c++) {
    if (!selectorTextArr.includes(`.${parentElement.classList[c]}`))
      selectorTextArr.push(`.${parentElement.classList[c]}`);
  }

  // Add Children element Ids and Classes to the list
  const nodes = parentElement.getElementsByTagName('*');
  for (let i = 0; i < nodes.length; i++) {
    const id = nodes[i].id;
    if (!selectorTextArr.includes(`#${id}`)) selectorTextArr.push(`#${id}`);

    const classes = nodes[i].classList;
    for (let c = 0; c < classes.length; c++)
      if (!selectorTextArr.includes(`.${classes[c]}`)) selectorTextArr.push(`.${classes[c]}`);
  }

  // Extract CSS Rules
  let extractedCSSText = '';
  for (let i = 0; i < document.styleSheets.length; i++) {
    const s = document.styleSheets[i];

    try {
      if (!s.cssRules) continue;
    } catch (e: any) {
      if (e.name !== 'SecurityError') throw e; // for Firefox
      continue;
    }

    const cssRules: any = s.cssRules;
    for (let r = 0; r < cssRules.length; r++) {
      if (
        cssRules[r].selectorText &&
        selectorTextArr.some((s) => cssRules[r].selectorText.includes(s))
      )
        extractedCSSText += cssRules[r].cssText;
    }
  }
  return extractedCSSText;
};

const appendCSS = (cssText: string, element: Element) => {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = cssText;
  const refNode = element.hasChildNodes() ? element.children[0] : null;
  element.insertBefore(styleElement, refNode);
};

const svgElementToSvgText = (svgNode: Element) => {
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  const cssStyleText = getCSSStyles(svgNode);
  appendCSS(cssStyleText, svgNode);

  const serializer = new XMLSerializer();

  const svgString = serializer.serializeToString(svgNode);

  return svgString;
};

const svgText2DownloadUrl = async (svg: string, width: number, height: number, format: string) =>
  new Promise<string>((resolve, reject) => {
    const imgsrc = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.onload = function () {
      context?.clearRect(0, 0, width, height);
      context?.drawImage(image, 0, 0, width, height);

      const img = canvas.toDataURL(`image/${format}`);
      resolve(img);
    };
    image.onerror = reject;

    image.src = imgsrc;
  });

export default Demo;
