import React, { PureComponent } from 'react';
import WordsWantSayToYou from '../component/WordsWantSayToYou';

export default class Spring extends PureComponent {
  toSummer = () => {
    this.props.history.push('/season/summer');
  };

  render = () => {
    return (
      <div className="all spring">
        <WordsWantSayToYou next={this.toSummer} />
      </div>
    );
  };
}
