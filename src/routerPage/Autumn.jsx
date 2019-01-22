import React, { PureComponent } from 'react';
import Video from '../component/Video';

export default class Autumn extends PureComponent {
  render = () => {
    return (
      <div className="season-wrap autumn">
        <Video />
      </div>
    );
  };
}
