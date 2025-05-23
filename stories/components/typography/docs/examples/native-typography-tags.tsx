import React from 'react';
import { Text } from '@semcore/typography';

const Demo = () => (
    <Text>
            <h1>
                H1, <small>48px, --fs-800</small>
            </h1>
            <p>
                Paragraph example with a <strong>bold text</strong>.
            </p>
            <h2>
                H2, <small>36px, --fs-700</small>
            </h2>
            <p>
                Paragraph example with a <em>italic text</em>.
            </p>
            <h3>
                H3, <small>32px, --fs-600</small>
            </h3>
            <p>
                Paragraph example with a link: <a href='/'>Go to the main page</a> .
            </p>
            <h4>
                H4, <small>24px, --fs-500</small>
            </h4>
            <p>
                Paragraph example with a <abbr>abbreviation</abbr>.
            </p>
            <h5>
                H5, <small>20px, --fs-400</small>
            </h5>
            <p>
                Paragraph example with a <s>strikethrough text</s>.
            </p>
            <h6>
                H6, <small>16px, --fs-300</small>
            </h6>
            <p>
                Paragraph example with a <code>code</code>.
            </p>
            <ul>
                <li>I'm gonna make him an offer he can't refuse.</li>
                <li>Carpe diem. Seize the day, boys. Make your lives extraordinary.</li>
            </ul>
            <ol>
                <li>I'm gonna make him an offer he can't refuse.</li>
                <li>Carpe diem. Seize the day, boys. Make your lives extraordinary.</li>
            </ol>
            <blockquote>
                I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion.
                I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost
                in time, like tears in rain. Time to die.
                <cite>Roy Batty</cite>
            </blockquote>
    </Text>
);

export default Demo;
