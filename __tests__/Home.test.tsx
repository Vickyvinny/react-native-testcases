import {render} from '@testing-library/react-native';
import Home from '../src/screens/Home';

describe('should render correctly', () => {
  it('should render home page', () => {
    const {getByTestId} = render(<Home />);
    const text = getByTestId('homeText');
    expect(text).toBeTruthy();
  });
});
