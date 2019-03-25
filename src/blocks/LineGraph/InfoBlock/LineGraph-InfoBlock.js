import React from 'react';
import { decl, Bem } from 'bem-react-core';

export default decl({
  block: 'InfoBlock',
  tag: 'div',
  content({func,text}) {
    return (
      <Bem elem='text'>{text}</Bem>
    );
  }
});
