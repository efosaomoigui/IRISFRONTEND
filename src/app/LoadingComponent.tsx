import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

import { Content } from '../_iris/layout/components/Content';

interface Props {
    inverted?: boolean;
    content?: string
}

export default function LoadingComponent ({inverted=true, content = 'Loading...'} : Props) {
  return (
  <Dimmer active={true} inverted={inverted}>
      <Loader content={Content} />
  </Dimmer>);
}