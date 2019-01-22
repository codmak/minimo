import React, { PureComponent } from 'react';
import WordsWantSayToYou from '../component/WordsWantSayToYou';

export default class Summer extends PureComponent {
  render = () => {
    return (
      <div className="season-wrap summer">
        <WordsWantSayToYou />
      </div>
    );
  };
}
