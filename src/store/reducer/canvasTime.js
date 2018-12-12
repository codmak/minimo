const canvasTime = (state, action) => {
  switch (action.type) {
    case 'changeStyle':
      return {
        ...state,
        style: {
          ...state.style,
          ...action.payload
        }
      };
    default:
      return {
        style: {
          width: '100%',
          height: '100%',
          right: 0,
          bottom: 0
        }
      };
  }
};

export default canvasTime;
