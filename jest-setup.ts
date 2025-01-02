jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: jest.fn(({children}) => children),
    GestureHandler: jest.fn(),
    TapGestureHandler: jest.fn(),
    LongPressGestureHandler: jest.fn(),
    PanGestureHandler: jest.fn(),
    PinchGestureHandler: jest.fn(),
    RotationGestureHandler: jest.fn(),
    FlingGestureHandler: jest.fn(),
    GestureDetector: jest.fn(),
  };
});
