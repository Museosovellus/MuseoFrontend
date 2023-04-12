import { render } from "@testing-library/react-native";
import ProfileScreen from '../../src/screens/Profile';
import { NavigationContainer } from "@react-navigation/native";

test('Renders the <ProfileScreen /> component', () => {
  render(
    <NavigationContainer>
      <ProfileScreen />
    </NavigationContainer>
  );
});
