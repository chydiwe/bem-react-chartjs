import React, { Fragment } from 'react';
import { decl } from 'bem-react-core';

import LineGraph from 'b:LineGraph';

export default decl({
  block: 'App',
  tag: 'div',
  content() {
    return (
      <Fragment>
        <LineGraph/>
      </Fragment>
    );
  }
});
