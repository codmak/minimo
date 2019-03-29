import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import { random, createLoop } from '../util/';
import { photos, getColor } from '../componentUtil/photoShow/data';

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
        state: 3,
        x: random(width - 300, 30),
        y: random(height - 200, 20),
        rotate: random(30, -30),
        backgroundColor: getColor(),
        image: photos[index]
      })),
      // 0 - 初始状态 所有卡片隐藏
      // 1 - 卡片随意摆放
      // 2 - 卡片全部合并到一起
      // 3 - 球形组合完毕视角在球外
      // 4 - 球形组合完毕视角在球内
      allCardState: 3,
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
  }

  componentDidMount() {
    this.createOutRotate();
    this.createInRotate();
  }

  getCardStateClass = cardState => {
    switch (cardState) {
      case 0:
        return 'init';
      case 1:
        return 'flat';
      case 2:
        return 'show-init';
      case 3:
      case 4:
        return 'circle';
      default:
        return '';
    }
  };

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
                className={`pwa-cel ${this.getCardStateClass(
                  item.state
                )} cel-${index}`}
                style={this.getCardStyle(item)}
                key={index}
                onClick={() => this.showCard(item)}
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
    this.setState({
      allCardState: 1
    });
    Promise.resolve()
      .then(this.cardShow)
      .then(this.initCard)
      .then(() => {
        this.outLoop.start();
        this.createBall();
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
   * @description    获取卡片的样式
   * @param          {Object}    card
   * @return         {Object}    卡片的样式
   */
  getCardStyle = card => {
    if (card.state === 1) {
      return {
        top: card.y,
        left: card.x,
        transform: `rotate(${card.rotate}deg)`,
        backgroundColor: card.backgroundColor
      };
    }

    if (card.state === 4) {
      return {
        transform: `rotateY(${-this.inRotateData.y}deg) rotateX(${-this
          .inRotateData.x}deg) translateZ(-100px)`,
        backgroundColor: card.backgroundColor
      };
    }

    return {
      backgroundColor: card.backgroundColor
    };
  };

  /**
   * @description    将之前显示的照片归位
   */
  unShowCard = () => {
    if (this.showCardInfo) {
      this.showCardInfo.state = 3;
      this.setState({
        flag: !this.state.flag
      });
      this.showCardInfo = null;
      return true;
    }
  };

  /**
   * @description    当视角在球内时，控制卡片的呈现
   * @param          {Object}    card
   */
  showCard = card => {
    const { allCardState } = this.state;
    if (allCardState !== 4) return;

    if (this.showCardInfo === card) {
      this.showCardInfo.state = 3;
      this.setState({
        flag: !this.state.flag
      });
      return;
    }

    this.changeAnimateState(false);

    if (this.showCardInfo) {
      this.showCardInfo.state = 3;
    }
    card.state = 4;
    this.setState({
      flag: !this.state.flag
    });
    this.showCardInfo = card;
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
      const { cardInfo } = this.state;
      // eslint-disable-next-line
      this.state.allCardState = 2;
      let index = cardInfo.length - 1;
      let timer = setInterval(() => {
        if (index === -1) {
          clearInterval(timer);
          this.setState({
            allCardState: 3
          });
          setTimeout(() => {
            resolve();
          }, 1000);
          return;
        }
        cardInfo[index].state = 3;
        this.setState(state => ({
          flag: !state.flag
        }));
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
      let index = cardInfo.length - 1;
      let timer = setInterval(() => {
        if (index === -1) {
          clearInterval(timer);
          setTimeout(() => {
            resolve();
          }, 1000);
          return;
        }
        cardInfo[index].state = 2;
        this.setState(state => ({
          flag: !state.flag
        }));
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
      let index = 0;
      let timer = setInterval(() => {
        if (index === cardInfo.length) {
          clearInterval(timer);
          setTimeout(() => {
            resolve();
          }, 1000);
          return;
        }
        cardInfo[index].state = 1;
        this.setState(state => ({
          flag: !state.flag
        }));
        index++;
      }, 200);
    });
}
