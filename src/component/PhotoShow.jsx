import React, { PureComponent } from 'react';
import { random } from '../util/';
import { getColor } from '../componentUtil/loading/data/color';

export default class PhotoShow extends PureComponent {
  constructor(props) {
    super(props);
    const { width, height } = document.body.getBoundingClientRect();
    console.log(width, height);
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
      // 0 - 初始状态
      // 1 - 开始组成球形
      // 2 - 球形组合完毕
      // 3 - 卡片随意摆放
      allCardState: 0,
      flag: true
    };

    // this.createBall();
    // this.initBall();
    // this.cardShow();

    Promise.resolve()
      .then(this.cardShow)
      .then(this.initBall)
      .then(this.createBall);
  }

  createBall = () =>
    new Promise(resolve => {
      const { cardInfo } = this.state;
      // eslint-disable-next-line
      this.state.allCardState = 1;
      let index = 0;
      let timer = setInterval(() => {
        if (index === cardInfo.length) {
          clearInterval(timer);
          this.setState({
            allCardState: 2
          });
          resolve();
          return;
        }
        cardInfo[index].state = 2;
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
        cardInfo[index].state = 1;
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
        cardInfo[index].state = 3;
        this.setState(state => ({
          flag: !state.flag
        }));
        index++;
      }, 200);
    });

  getCardStateClass = cardState => {
    switch (cardState) {
      case 0:
        return 'init';
      case 1:
        return 'circle-before';
      case 2:
        return 'circle';
      case 3:
        return 'flat';
      default:
        return '';
    }
  };

  getBallStateClass = allCardState => {
    switch (allCardState) {
      case 0:
        return '';
      case 1:
        return 'out-rotate';
      case 2:
        return 'out-rotate';
      default:
        return '';
    }
  };

  changeAnimateState = state => {
    let stage = this.stageRef.current;
    stage.style.animationPlayState = state ? 'running' : 'paused';
  };

  getCardClass = () => {};

  showIn = () => {
    this.changBallState('none', 'translateZ(800px)', 'inRotate-0', '60s');
  };

  showOut = () => {
    this.changBallState('translateZ(800px)', 'none', 'outRotate', '30s');
  };

  changBallState = (initState, lateState, animationName, animationDuration) => {
    let stage = this.stageRef.current;
    stage.style.animationPlayState = 'paused';
    setTimeout(() => {
      stage.style.transform = window.getComputedStyle(stage).transform;
      stage.style.animationName = 'none';
      setTimeout(() => {
        stage.style.transform = initState;
        setTimeout(() => {
          stage.style.transform = lateState;
          stage.addEventListener('transitionend', function listen2() {
            stage.style.animationName = animationName;
            stage.style.animationDuration = animationDuration;
            stage.style.animationPlayState = 'running';
            stage.removeEventListener('transitionend', listen2);
          });
        }, 1000);
      });
    }, 500);
  };

  render() {
    const { cardInfo, allCardState } = this.state;
    return (
      <div className="photo-wrap-all">
        <span
          className="btn btn-stop"
          onClick={() => this.changeAnimateState(false)}
        >
          stop
        </span>
        <span
          className="btn btn-start"
          onClick={() => this.changeAnimateState(true)}
        >
          start
        </span>
        <span className="btn btn-in" onClick={this.showIn}>
          in
        </span>
        <span className="btn btn-out" onClick={this.showOut}>
          out
        </span>
        <div className="p-r pwa-stage">
          <div
            className={`p-a pwa-view ${this.getBallStateClass(allCardState)}`}
            ref={this.stageRef}
          >
            {cardInfo.map((item, index) => (
              <div
                className={`pwa-cel ${this.getCardStateClass(
                  item.state
                )} cel-${index}`}
                style={
                  item.state === 3
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
}
