import React from 'react';
import FormatText from '@semcore/format-text';

export default () => (
  <FormatText>
    <h1>
      H1, <small>48px</small>
    </h1>
    <p>
      But I do love the taste of a <strong>good burger</strong>. Mm-mm-mm.
    </p>
    <h2>
      H2, <small>36px</small>
    </h2>
    <p>
      But I do love the taste of a <em>good burger</em>. Mm-mm-mm.
    </p>
    <h3>
      H3, <small>33px</small>
    </h3>
    <p>
      But I do love the taste of a <a>good burger</a> . Mm-mm-mm.
    </p>
    <h4>
      H4, <small>25px</small>
    </h4>
    <p>
      But I do love the taste of a <abbr>good burger</abbr>. Mm-mm-mm.
    </p>
    <h5>
      H5, <small>19px</small>
    </h5>
    <p>
      But I do love the taste of a <s>good burger</s>. Mm-mm-mm.
    </p>
    <h6>
      H6, <small>16px</small>
    </h6>
    <ul>
      <li>I'm gonna make him an offer he can't refuse.</li>
      <li>Carpe diem. Seize the day, boys. Make your lives extraordinary.</li>
    </ul>
    <ol>
      <li>I'm gonna make him an offer he can't refuse.</li>
      <li>Carpe diem. Seize the day, boys. Make your lives extraordinary.</li>
    </ol>
    <blockquote>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod
      tincidunt ut lacreet dolore magna aliguam erat volutpat. Ut wisis enim ad minim veniam, quis
      nostrud exerci tution ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
      <cite>Author Author</cite>
    </blockquote>
  </FormatText>
);
