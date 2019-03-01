import React, { PureComponent } from 'react';
import WordsWantSayToYou from '../component/WordsWantSayToYou';

export default class Spring extends PureComponent {
  render = () => {
    return (
      <div className="all">
        <WordsWantSayToYou />
      </div>
    );
  };
}
