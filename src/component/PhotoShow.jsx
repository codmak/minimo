import React, { PureComponent } from 'react';

export default class PhotoShow extends PureComponent {
  constructor(props) {
    super(props);
    this.stageRef = React.createRef();
    this.ballSplit = [12, 17, 21, 24, 27, 29, 30, 29, 27, 24, 21, 17, 12];
    this.state = {
      cardInfo: new Array(290)
        .fill(0)
        .map((_, index) => ({ name: index, state: 0 })),
      ballState: 0,
      flag: true
    };

    // this.createBall();
  }

  createBall = () => {
    const { cardInfo } = this.state;
    let index = 0;
    let timer = setInterval(() => {
      if (index === cardInfo.length) {
        clearInterval(timer);
        this.setState({
          ballState: 1
        });
        return;
      }
      cardInfo[index].state = 1;
      this.setState(state => ({
        flag: !state.flag
      }));
      index++;
    }, 200);
  };

  getCardStateClass = cardState => {
    switch (cardState) {
      case 0:
        return 'flat';
      case 1:
        return 'circle';
      default:
        return '';
    }
  };

  getBallStateClass = ballState => {
    switch (ballState) {
      case 0:
        return '';
      case 1:
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
        stage.addEventListener('transitionend', function listen() {
          stage.style.transform = lateState;
          stage.removeEventListener('transitionend', listen);
          stage.addEventListener('transitionend', function listen2() {
            stage.style.animationName = animationName;
            stage.style.animationDuration = animationDuration;
            stage.style.animationPlayState = 'running';
            stage.removeEventListener('transitionend', listen2);
          });
        });
      });
    }, 500);
  };

  render() {
    const { cardInfo } = this.state;
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
          <div className={`p-a pwa-view`} ref={this.stageRef}>
            {cardInfo.map((item, index) => (
              <div
                className={`pwa-cel ${this.getCardStateClass(
                  item.state
                )} cel-${index}`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
