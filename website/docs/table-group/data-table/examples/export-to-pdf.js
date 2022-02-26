import React, { useState, useEffect } from 'react';
import { Flex } from '@semcore/flex-box';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import FileExportXS from '@semcore/icon/FileExport/m';
import DataTable from '@semcore/data-table';

const EXPORTS = ['PNG', 'JPEG', 'WEBP'];

export default () => {
  const [visible, updateVisible] = useState(false);
  const [linkElements, updateLinkElements] = useState(
    EXPORTS.map((name) => ({ key: name, children: name })),
  );

  const svg = React.createRef();
  const download = React.createRef();
  const width = 500;
  const height = 300;

  const renderImage = () => {
    const svgElement = svg.current;
    let svgString = getSVGString(svgElement);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

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
  };
  return (
    <Flex>
      <svg ref={svg} xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
        <foreignObject width="100%" height="100%">
          <DataTable data={data}>
            <DataTable.Head>
              <DataTable.Column name="keyword" children="Keyword" />
              <DataTable.Column name="kd" children="KD,%" />
              <DataTable.Column name="cpc" children="CPC" />
              <DataTable.Column name="vol" children="Vol." />
            </DataTable.Head>
            <DataTable.Body onResize={renderImage} />
          </DataTable>
        </foreignObject>
      </svg>
      <DropdownMenu onVisibleChange={updateVisible}>
        <DropdownMenu.Trigger tag={Button} ml={4}>
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

function getSVGString(svgNode) {
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  const cssStyleText = getCSSStyles(svgNode);
  appendCSS(cssStyleText, svgNode);

  const serializer = new XMLSerializer();

  let svgString = serializer.serializeToString(svgNode);
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
  image.onload = function () {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const img = canvas.toDataURL(`image/${format}`);
    callback(img);
  };

  image.src = imgsrc;
}
