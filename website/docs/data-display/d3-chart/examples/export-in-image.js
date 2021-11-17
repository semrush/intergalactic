import React, { useState, useEffect } from 'react';
import { scaleLinear } from 'd3-scale';
import { Line, minMax, Plot, XAxis, YAxis } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import FileExportXS from '@semcore/icon/lib/FileExport/xs';

const EXPORTS = ['PNG', 'JPEG', 'WEBP'];

export default () => {
  const [visible, updateVisible] = useState(false);
  const [linkElements, updateLinkElements] = useState(
    EXPORTS.map((name) => ({ key: name, children: name })),
  );

  const svg = React.createRef();
  const download = React.createRef();
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  useEffect(() => {
    const svgElement = svg.current;
    const svgString = getSVGString(svgElement);
    EXPORTS.forEach((name, ind) => {
      const format = name.toLowerCase();
      svgString2Image(svgString, 2 * width, 2 * height, format, save);
      function save(image) {
        linkElements[ind] = {
          ...linkElements[ind],
          download: `image.${format}`,
          href: image,
        };

        updateLinkElements([...linkElements]);
      }
    });
  }, []);
  return (
    <Flex>
      <Plot ref={svg} data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks()}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis ticks={xScale.ticks()}>
          <XAxis.Ticks />
        </XAxis>
        <Line x="x" y="y">
          <Line.Dots display />
        </Line>
      </Plot>
      <DropdownMenu onVisibleChange={updateVisible}>
        <DropdownMenu.Trigger tag={Button}>
          <Button.Addon tag={FileExportXS} />
          <Button.Text>Export</Button.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax="257px">
          <DropdownMenu.List ref={download}>
            {EXPORTS.map((name, ind) => (
              <DropdownMenu.Item tag="a" {...linkElements[ind]} />
            ))}
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
    </Flex>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random().toFixed(1) * 10,
  }));

function getSVGString(svgNode) {
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  const cssStyleText = getCSSStyles(svgNode);
  appendCSS(cssStyleText, svgNode);

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgNode);
  svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
  svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

  return svgString;

  function getCSSStyles(parentElement) {
    const selectorTextArr = [];

    for (let c = 0; c < parentElement.classList.length; c++) {
      if (!contains('.' + parentElement.classList[c], selectorTextArr))
        selectorTextArr.push('.' + parentElement.classList[c]);
    }

    // Add Children element Ids and Classes to the list
    const nodes = parentElement.getElementsByTagName('*');
    for (let i = 0; i < nodes.length; i++) {
      const id = nodes[i].id;
      if (!contains('#' + id, selectorTextArr)) selectorTextArr.push('#' + id);

      const classes = nodes[i].classList;
      for (let c = 0; c < classes.length; c++)
        if (!contains('.' + classes[c], selectorTextArr)) selectorTextArr.push('.' + classes[c]);
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

      const cssRules = s.cssRules;
      for (let r = 0; r < cssRules.length; r++) {
        if (
          cssRules[r].selectorText &&
          selectorTextArr.some((s) => cssRules[r].selectorText.includes(s))
        )
          extractedCSSText += cssRules[r].cssText;
      }
    }

    return extractedCSSText;

    function contains(str, arr) {
      return arr.indexOf(str) === -1 ? false : true;
    }
  }

  function appendCSS(cssText, element) {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    styleElement.innerHTML = cssText;
    const refNode = element.hasChildNodes() ? element.children[0] : null;
    element.insertBefore(styleElement, refNode);
  }
}

function svgString2Image(svgString, width, height, format, callback) {
  format = format ? format : 'png';
  const imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  const image = new Image();
  image.onload = function() {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const img = canvas.toDataURL(`image/${format}`);
    callback(img);
  };

  image.src = imgsrc;
}
