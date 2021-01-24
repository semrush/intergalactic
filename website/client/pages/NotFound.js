import React from 'react';
import Helmet from 'react-helmet';
import Error from '../components/Error';

export default (props) => (
  <>
    <Helmet>
      <title>Sorry 🤷‍</title>
    </Helmet>
    <Error title="Oh no! It's 404!" {...props} />
  </>
);
