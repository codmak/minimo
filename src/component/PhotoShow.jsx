import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import { random, createLoop } from '../util/';

import { getColor } from '../componentUtil/photoShow/data/color';
import { getPhoto } from '../componentUtil/photoShow/data/photo';

export default class PhotoShow extends PureComponent {
  constructor(props) {
    super(props);
    const { width, height } = document.body.getBoundingClientRect();
    this.stageRef = React.createRef();
    this.ballSplit = [12, 17, 21, 24, 27, 29, 30, 29, 27, 24, 21, 17, 12];
    this.state = {
      cardInfo: new Array(290).fill(0).map((_, index) => ({
        name: index,
        // 0 - 卡片隐藏
        // 1 - 卡片随意摆放
        // 2 - 卡片全部合并到一起
        // 3 - 球形组成的一部分
        // 4 - 视角在球内，卡片在眼前
        state: 0,
        x: random(width / 2 - 150, -width / 2 + 150),
        y: random(height / 2 - 100, -height / 2 + 100),
        rotate: random(30, -30),
        backgroundColor: getColor(),
        image: getPhoto(index)
      })),
      // 0 - 初始状态 所有卡片隐藏
      // 1 - 卡片随意摆放
      // 2 - 卡片全部合并到一起
      // 3 - 球形组合完毕视角在球外
      // 4 - 球形组合完毕视角在球内
      allCardState: 0,
      flag: true
    };
    this.outRotateData = {
      x: 0,
      y: 0
    };
    this.inRotateData = {
      x: 0,
      y: 0,
      speedY: 4
    };
    this.rotateLoop = 'outLoop';
    this.isInBall = false;
    this.ballXGutter = 120 / 13;
    this.ballYGutter = 20;
    this.transitionListen = null;
    this.showCardInfo = null;
    this.showCardDom = null;
  }

  componentDidMount() {
    this.createOutRotate();
    this.createInRotate();
    this.stageRef.current.addEventListener('click', e => {
      const { allCardState } = this.state;
      if (allCardState !== 4) return;
      let cardDom = null;
      for (let i = 0; i < e.path.length; i++) {
        if (e.path[i].className.includes('pwa-cel')) {
          cardDom = e.path[i];
          break;
        }
      }
      console.log(cardDom === this.showCardDom);
      if (cardDom === this.showCardDom) {
        cardDom.style.transform = '';
        this.showCardDom = null;
        return;
      }

      if (this.showCardDom) {
        this.showCardDom.style.transform = '';
        this.showCardDom = null;
      }
      this.changeAnimateState(false);
      cardDom.style.transform = `rotateY(${-this.inRotateData
        .y}deg) rotateX(${-this.inRotateData.x}deg) translateZ(-100px)`;
      this.showCardDom = cardDom;
    });
  }

  render() {
    const { cardInfo, allCardState } = this.state;
    return (
      <div className="photo-wrap-all">
        <Motion
          defaultStyle={{ x: 0 }}
          style={{
            x: spring(allCardState === 0 ? 100 : 0)
          }}
        >
          {value =>
            value.x > 4 && (
              <span
                className="btn pwa-start"
                style={{
                  transform: `scale(${value.x / 100})`
                }}
                onClick={this.startChange}
              >
                <svg className="pwa-icon" aria-hidden="true">
                  <use xlinkHref="#icon-bofang" />
                </svg>
              </span>
            )
          }
        </Motion>
        <div
          className={`pwa-circle-control cc-left x-row column avg ${
            allCardState === 3 || allCardState === 4 ? 'show' : ''
          }`}
        >
          <div className="x-row avg">
            <span className="btn" onClick={() => this.changeAnimateState(true)}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-bofang" />
              </svg>
            </span>
            <span
              className="btn"
              onClick={() => this.changeAnimateState(false)}
            >
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-zanting" />
              </svg>
            </span>
          </div>
          <div className="x-row avg">
            <span className="btn" onClick={this.showIn}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-up" />
              </svg>
            </span>
            <span className="btn" onClick={this.showOut}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-down" />
              </svg>
            </span>
          </div>
        </div>
        <div className="p-r pwa-stage">
          <div className={`p-a pwa-view`} ref={this.stageRef}>
            {cardInfo.map((item, index) => (
              <div
                className={`pwa-cel cel-${index} init`}
                style={{
                  backgroundColor: item.backgroundColor
                }}
                key={index}
              >
                <div className="image-wrap x-center">
                  <img src={item.image} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`pwa-circle-control cc-right x-row ${
            allCardState === 4 ? 'show' : ''
          }`}
        >
          <div className="x-row avg">
            <span className="btn" onClick={this.viewLeft}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-left" />
              </svg>
            </span>
          </div>
          <div className="x-row column avg">
            <span className="btn" onClick={this.viewUpper}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-up" />
              </svg>
            </span>
            <span className="btn" onClick={this.viewDown}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-down" />
              </svg>
            </span>
          </div>
          <div className="x-row avg">
            <span className="btn" onClick={this.viewRight}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-right" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /**
   * @description    整体开始动画
   */
  startChange = () => {
    Promise.resolve()
      .then(() => {
        this.setState({
          allCardState: 1
        });
      })
      .then(this.cardShow)
      .then(() => {
        this.setState({
          allCardState: 2
        });
      })
      .then(this.initCard)
      .then(() => {
        this.outLoop.start();
        return this.createBall();
      })
      .then(() => {
        this.setState({
          allCardState: 3
        });
      });
  };

  /**
   * @description    改变球的运动
   */
  changeAnimateState = state => {
    if (state) {
      if (this[this.rotateLoop].getStatus() === 'stop') {
        this[this.rotateLoop].start();
        this.unShowCard();
      }
    } else {
      this[this.rotateLoop].stop();
    }
  };

  /**
   * @description    将视角切球内
   */
  showIn = () => {
    if (this.isInBall) return;
    this.isInBall = true;
    this.rotateLoop = 'inLoop';
    this.outLoop.stop();
    this.changBallState(
      `translateZ(800px) rotateX(${this.inRotateData.x}deg) rotateY(${
        this.inRotateData.y
      }deg)`,
      () => {
        this.inLoop.start();
        this.setState({
          allCardState: 4
        });
      }
    );
  };

  /**
   * @description    将视角切回球外
   */
  showOut = () => {
    if (!this.isInBall) return;
    this.isInBall = false;
    this.rotateLoop = 'outLoop';
    this.inLoop.stop();
    this.changBallState(
      `rotateX(${this.outRotateData.x}deg) rotateY(${this.outRotateData.y}deg)`,
      () => {
        this.outLoop.start();
        this.unShowCard();
        this.setState({
          allCardState: 3
        });
      }
    );
  };

  /**
   * @description    将之前显示的照片归位
   */
  unShowCard = () => {
    if (this.showCardDom) {
      this.showCardDom.style.transform = '';
      this.showCardDom = null;
    }
  };

  viewUpper = () => {
    this.tapDirection('up');
  };

  viewDown = () => {
    this.tapDirection('down');
  };

  viewLeft = () => {
    this.tapDirection('left');
  };

  viewRight = () => {
    this.tapDirection('right');
  };

  /**
   * @description    当视角在球形内部时，控制视角移动
   * @param          {'left'|'right'|'up'|'down'}    direction
   * @param          {Function}    call    动画结束后的回调
   */
  tapDirection = (direction, call = () => {}) => {
    if (direction === 'left') {
      this.inRotateData.y = this.inRotateData.y - this.ballYGutter;
    }
    if (direction === 'right') {
      this.inRotateData.y = this.inRotateData.y + this.ballYGutter;
    }
    if (direction === 'up') {
      if (this.inRotateData.x > 60) return;
      this.inRotateData.x = this.inRotateData.x + this.ballXGutter;
    }
    if (direction === 'down') {
      if (this.inRotateData.x < -60) return;
      this.inRotateData.x = this.inRotateData.x - this.ballXGutter;
    }
    this.inLoop.stop();
    this.changBallState(
      `translateZ(800px) rotateX(${this.inRotateData.x}deg) rotateY(${
        this.inRotateData.y
      }deg)`,
      call,
      '1s'
    );
  };

  /**
   * @description    改变当前 3D 舞台的呈现
   * @param          {string}    state      需要切换的 transform
   * @param          {Function}  cb         transition 结束的回调
   * @param          {Function}  time       transition 的时间
   */
  changBallState = (state, cb, time = '5s') => {
    let stage = this.stageRef.current;
    if (this.transitionListen) {
      stage.removeEventListener('transitionend', this.transitionListen);
    }
    stage.style.transition = time;
    stage.style.transform = state;
    this.transitionListen = () => {
      stage.style.transition = 'unset';
      cb && cb();
      stage.removeEventListener('transitionend', this.transitionListen);
    };
    stage.addEventListener('transitionend', this.transitionListen);
  };

  /**
   * @description    创建视角在外部时，球的运动，this.outLoop
   */
  createOutRotate = () => {
    let stage = this.stageRef.current;
    this.outLoop = createLoop(() => {
      stage.style.transform = `rotateX(${this.outRotateData.x}deg) rotateY(${
        this.outRotateData.y
      }deg)`;
      this.outRotateData.x = (this.outRotateData.x + 0.2) % 360;
      this.outRotateData.y = (this.outRotateData.y + 0.2) % 360;
    });
  };

  /**
   * @description    创建视角在内部时，球的运动，this.inLoop
   */
  createInRotate = () => {
    let stage = this.stageRef.current;
    this.inLoop = createLoop(() => {
      stage.style.transform = `translateZ(800px) rotateX(${
        this.inRotateData.x
      }deg) rotateY(${this.inRotateData.y}deg)`;
      this.inRotateData.y += this.inRotateData.speedY / 100;
    });
  };

  /**
   * @description    将卡片以球形呈现
   * @return         {Promise<any>}
   */
  createBall = () =>
    new Promise(resolve => {
      // eslint-disable-next-line
      this.state.allCardState = 2;
      const { cardInfo } = this.state;
      const stage = this.stageRef.current;
      const cels = stage.childNodes;
      let index = cardInfo.length - 1;
      let timer = setInterval(() => {
        if (index === -1) {
          clearInterval(timer);
          setTimeout(() => {
            resolve();
          }, 1000);
          return;
        }
        let cel = cels[index];
        cel.style.transform = ``;
        cel.style.transition = ``;
        cel.className += ' circle';
        cel.childNodes[0].style.opacity = 1;
        index--;
      }, 200);
    });

  /**
   * @description    将卡片聚集起来
   * @return         {Promise<any>}
   */
  initCard = () =>
    new Promise(resolve => {
      const { cardInfo } = this.state;
      const stage = this.stageRef.current;
      const cels = stage.childNodes;
      let index = cardInfo.length - 1;
      let timer = setInterval(() => {
        if (index === -1) {
          clearInterval(timer);
          setTimeout(() => {
            resolve();
          }, 1000);
          return;
        }
        cels[index].style.transform = `none`;
        cels[index].style.transition = `.4s`;
        index--;
      }, 20);
    });

  /**
   * @description    将卡片呈现出来随处安放
   * @return         {Promise<any>}
   */
  cardShow = () =>
    new Promise(resolve => {
      const { cardInfo } = this.state;
      const stage = this.stageRef.current;
      const cels = stage.childNodes;
      let index = 0;
      let timer = setInterval(() => {
        if (index === cels.length) {
          clearInterval(timer);
          setTimeout(() => {
            resolve();
          }, 1000);
          return;
        }
        if (index >= 40) {
          cels[index - 40].childNodes[0].style.opacity = 0;
        }
        let cel = cels[index];
        cel.style.transform = `translateX(${cardInfo[index].x}px) translateY(${
          cardInfo[index].y
        }px) rotate(${cardInfo[index].rotate}deg)`;
        cel.style.opacity = 1;
        cel.style.transition = 'transform 1s, opacity 0.5s 0.5s';
        cel.className = cel.className.replace(/ ?init ?/, '');
        index++;
      }, 200);
    });
}
