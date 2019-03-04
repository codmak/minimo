import React, { PureComponent } from 'react';
import PhotoShow from '../component/PhotoShow';

export default class Summer extends PureComponent {
  render = () => {
    return (
      <div className="all summer">
        <PhotoShow />
      </div>
    );
  };
}
