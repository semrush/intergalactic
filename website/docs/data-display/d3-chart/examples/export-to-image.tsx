import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Line, minMax, Plot, XAxis, YAxis } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';

const extensions = ['png', 'jpeg', 'webp'];

const data = Array(20)
  .fill({})
  .map((_, i) => ({
    x: i,
    y: Math.random() * 10,
  }));

const Demo = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const width = 500;
  const height = 300;
  const MARGIN = 40;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const downloadImage = React.useCallback(
    (extention: string) => async () => {
      const svgElement = svgRef.current.cloneNode(true) as typeof svgRef.current;
      [...svgElement.querySelectorAll('animate')].forEach((animate) => animate.remove());
      let svgText = svgElementToSvgText(svgElement);
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
    },
    [],
  );

  return (
    <Flex>
      <Plot ref={svgRef} data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks()}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis ticks={xScale.ticks()}>
          <XAxis.Ticks />
        </XAxis>
        <Line x='x' y='y'>
          <Line.Dots display />
        </Line>
      </Plot>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button}>
          <Button.Addon>
            <FileExportM />
          </Button.Addon>
          <Button.Text>Export</Button.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax='257px' aria-label={'Extensions'}>
          <DropdownMenu.List>
            {extensions.map((name) => (
              <DropdownMenu.Item onClick={downloadImage(name)}>{name}</DropdownMenu.Item>
            ))}
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
    </Flex>
  );
};

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
    } catch (e) {
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
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      const img = canvas.toDataURL(`image/${format}`);
      resolve(img);
    };
    image.onerror = reject;

    image.src = imgsrc;
  });

export default Demo;
