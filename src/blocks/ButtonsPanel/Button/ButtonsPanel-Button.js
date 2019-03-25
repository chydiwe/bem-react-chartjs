import React from 'react';
import { decl, Bem } from 'bem-react-core';

export default decl({
  block: 'Button',
  content({func,text}) {
    return (
      <Bem elem="Button" tag="button" onClick={func}>{text}</Bem>
    );
  }
});
