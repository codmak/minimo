import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import { random, createLoop } from '../util/';
import { getColor } from '../componentUtil/loading/data/color';

export default class PhotoShow extends PureComponent {
  constructor(props) {
    super(props);
    const { width, height } = document.body.getBoundingClientRect();
    this.stageRef = React.createRef();
    this.ballSplit = [12, 17, 21, 24, 27, 29, 30, 29, 27, 24, 21, 17, 12];
    this.state = {
      cardInfo: new Array(290).fill(0).map((_, index) => ({
        name: index,
        state: 0,
        x: random(width - 300, 30),
        y: random(height - 200, 20),
        rotate: random(30, -30),
        backgroundColor: getColor()
      })),
      // 0 - 初始状态 所有卡片隐藏
      // 1 - 卡片随意摆放
      // 2 - 开始组成球形
      // 3 - 球形组合完毕
      allCardState: 0,
      flag: true
    };
    this.outRotateData = {
      x: 0,
      y: 0
    };
    this.inRotateData = {
      x: 0,
      y: 0
    };
    this.rotateLoop = 'outLoop';
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
        return 'circle-before';
      case 3:
        return 'circle';
      default:
        return '';
    }
  };

  changeAnimateState = state => {
    if (state) {
      if (this[this.rotateLoop].getStatus() === 'stop') {
        this[this.rotateLoop].start();
      }
    } else {
      this[this.rotateLoop].stop();
    }
  };

  showIn = () => {
    this.rotateLoop = 'inLoop';
    this.outLoop.stop();
    this.changBallState(
      `translateZ(800px) rotateX(${this.inRotateData.x}deg) rotateY(${
        this.inRotateData.y
      }deg)`,
      () => {
        this.inLoop.start();
      }
    );
  };

  showOut = () => {
    this.rotateLoop = 'outLoop';
    this.inLoop.stop();
    this.changBallState(
      `rotateX(${this.outRotateData.x}deg) rotateY(${this.outRotateData.y}deg)`,
      () => {
        this.outLoop.start();
      }
    );
  };

  changBallState = (state, cb) => {
    let stage = this.stageRef.current;
    let lastTransition = stage.style.transition;
    stage.style.transition = '10s';
    stage.style.transform = state;
    stage.addEventListener('transitionend', function listen() {
      stage.style.transition = lastTransition;
      stage.removeEventListener('transitionend', listen);
      cb && cb();
    });
  };

  changCardState = allCardState => {
    this.setState({
      allCardState
    });
  };

  startChange = () => {
    this.setState({
      allCardState: 1
    });
    Promise.resolve()
      .then(this.cardShow)
      .then(this.initBall)
      .then(() => {
        this.outLoop.start();
        this.createBall();
      });
  };

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

  createInRotate = () => {
    let stage = this.stageRef.current;
    this.inLoop = createLoop(() => {
      stage.style.transform = `translateZ(800px) rotateX(${
        this.inRotateData.x
      }deg) rotateY(${this.inRotateData.y}deg)`;
      this.inRotateData.y += 0.08;
    });
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
        <div className="pwa-btns x-row column avg">
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
                <use xlinkHref="#icon-in" />
              </svg>
            </span>
            <span className="btn" onClick={this.showOut}>
              <svg className="pwa-icon" aria-hidden="true">
                <use xlinkHref="#icon-out" />
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
                style={
                  item.state === 1
                    ? {
                        top: item.y,
                        left: item.x,
                        transform: `rotate(${item.rotate}deg)`,
                        backgroundColor: item.backgroundColor
                      }
                    : {
                        backgroundColor: item.backgroundColor
                      }
                }
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  createBall = () =>
    new Promise(resolve => {
      const { cardInfo } = this.state;
      // eslint-disable-next-line
      this.state.allCardState = 2;
      let index = 0;
      let timer = setInterval(() => {
        if (index === cardInfo.length) {
          clearInterval(timer);
          this.setState({
            allCardState: 3
          });
          resolve();
          return;
        }
        cardInfo[index].state = 3;
        this.setState(state => ({
          flag: !state.flag
        }));
        index++;
      }, 200);
    });

  initBall = () =>
    new Promise(resolve => {
      const { cardInfo } = this.state;
      let index = cardInfo.length - 1;
      let timer = setInterval(() => {
        if (index === -1) {
          clearInterval(timer);
          resolve();
          return;
        }
        cardInfo[index].state = 2;
        this.setState(state => ({
          flag: !state.flag
        }));
        index--;
      }, 20);
    });

  cardShow = () =>
    new Promise(resolve => {
      const { cardInfo } = this.state;
      let index = 0;
      let timer = setInterval(() => {
        if (index === cardInfo.length) {
          clearInterval(timer);
          resolve();
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
