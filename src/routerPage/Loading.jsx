import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import Cake from '../component/Cake';
import { getColor } from '../componentUtil/loading/data/color';
import { $emit } from '../util';

class Load extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rect: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      // 0 - cake 资源未准备好，不显示按钮
      // 1 - 显示按钮，但动画未开始
      // 2 - 动画开始
      // 3 - 动画停止
      cakeProgress: 0,
      // 0 - music 资源未准备好，不显示按钮
      // 1 - 显示按钮，但音乐未开始播放
      // 2 - 音乐播放
      // 3 - 音乐暂停
      musicProgress: 0,
      showNextPage: false
    };
    this.colorRandomArr = new Array(16).fill(0).map(() => getColor());
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.src =
      'http://cdn.acohome.cn/Beautiful%20In%20White%20%28Demo%29%20-%20Westlife.mp3';
    this.audio.addEventListener('canplay', () => {
      this.setState({
        musicProgress: 1
      });
    });
  }

  componentDidMount() {
    let percent = 0;
    let timer = setInterval(() => {
      this.changePercentToArray(percent / 100);
      if (percent >= 100) {
        clearInterval(timer);
      }
      percent += 10;
    }, 1000);
    setTimeout(() => {
      this.setState({
        cakeProgress: 1
      });
    }, 1000);
    setTimeout(() => {
      this.setState({
        showNextPage: true
      });
    }, 1000);
  }

  changePercentToArray = percent => {
    let num = Math.floor(percent * 16);
    let newRect = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    /* eslint-disable */
    loop: {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (i * 4 + j < num) {
            newRect[j][i] = 1;
          } else {
            break loop;
          }
        }
      }
    }
    /* eslint-enable */
    this.setState({
      rect: newRect
    });
  };

  startCake = () => {
    $emit('startCake');
    this.setState({
      cakeProgress: 2
    });
  };

  stopCake = () => {
    $emit('stopCake');
    this.setState({
      cakeProgress: 3
    });
  };

  moreCake = () => {
    const { cakeProgress } = this.state;
    if (cakeProgress !== 2) {
      this.startCake();
    } else {
      $emit('moreCake');
    }
  };

  playMusic = () => {
    const { musicProgress } = this.state;
    if (musicProgress === 2) {
      this.audio.pause();
      this.setState({
        musicProgress: 3
      });
    } else {
      this.audio.play();
      this.setState({
        musicProgress: 2
      });
    }
  };

  getMusicBtnClass = () => {
    const { musicProgress } = this.state;
    let className = ['btn', 'music-btn'];
    if (musicProgress > 1) {
      className.push('music-icon');
    }
    if (musicProgress === 2) {
      className.push('music-stop');
    }
    if (musicProgress === 3) {
      className.push('music-start');
    }
    return className.join(' ');
  };

  toNextPage = () => {
    this.props.history.push('/season/spring');
  };

  render() {
    const { rect, cakeProgress, musicProgress, showNextPage } = this.state;
    return (
      <div className="loading">
        <div className="p-a-all">
          <Cake />
        </div>
        <div className="animate-btn-all p-a-all x-center">
          <div className="animate-wrap">
            {rect.map((col, i) => (
              <div className="col" key={i}>
                {col.map((state, j) => (
                  <div
                    className={`aw-square ${state ? 'loaded' : 'unloaded'}`}
                    key={j}
                    style={{
                      backgroundColor: this.colorRandomArr[i * 4 + j]
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="aba-btn-wrap x-row x-flex-a">
            <div className="x-center">
              <Motion
                defaultStyle={{ x: 0 }}
                style={{
                  x: spring(
                    musicProgress === 1 ? 150 : musicProgress >= 2 ? 40 : 0
                  )
                }}
              >
                {value =>
                  value.x > 4 && (
                    <span
                      className={this.getMusicBtnClass()}
                      style={{
                        color: value.x !== 150 ? 'transparent' : '#fff',
                        width: value.x
                      }}
                      onClick={this.playMusic}
                    >
                      {musicProgress === 1 ? '来点音乐?' : ''}
                    </span>
                  )
                }
              </Motion>
            </div>
            <div className="x-center">
              <Motion
                defaultStyle={{ x: 0 }}
                style={{ x: spring(cakeProgress === 1 ? 150 : 0) }}
              >
                {value =>
                  value.x > 4 && (
                    <span
                      className="btn cake-btn"
                      style={{
                        color: value.x !== 150 ? 'transparent' : '#fff',
                        width: value.x
                      }}
                      onClick={this.startCake}
                    >
                      {cakeProgress === 1 ? '来点蛋糕?' : ''}
                    </span>
                  )
                }
              </Motion>
              <Motion
                defaultStyle={{ x: 0 }}
                style={{ x: spring(cakeProgress > 1 ? 150 : 0) }}
              >
                {value =>
                  value.x > 4 && (
                    <span
                      className="btn cake-btn"
                      style={{
                        color: value.x !== 150 ? 'transparent' : '#fff',
                        width: value.x
                      }}
                      onClick={this.moreCake}
                    >
                      {cakeProgress > 1 ? '多来点嘛~' : ''}
                    </span>
                  )
                }
              </Motion>
              <Motion
                defaultStyle={{ x: 0 }}
                style={{ x: spring(cakeProgress > 1 ? 150 : 0) }}
              >
                {value =>
                  value.x > 4 && (
                    <span
                      className="btn cake-btn"
                      style={{
                        color: value.x !== 150 ? 'transparent' : '#fff',
                        width: value.x
                      }}
                      onClick={this.stopCake}
                    >
                      {cakeProgress > 1 ? '太多啦~' : ''}
                    </span>
                  )
                }
              </Motion>
            </div>
            <div className="x-center">
              <Motion
                defaultStyle={{ x: 0 }}
                style={{ x: spring(showNextPage ? 220 : 0) }}
              >
                {value =>
                  value.x > 4 && (
                    <span
                      className="btn next-btn"
                      style={{
                        color: value.x !== 220 ? 'transparent' : '#fff',
                        width: value.x
                      }}
                      onClick={this.toNextPage}
                    >
                      {showNextPage ? '有些话想对你说呢~' : ''}
                    </span>
                  )
                }
              </Motion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Load;
