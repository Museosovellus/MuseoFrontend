import { render } from "@testing-library/react-native";
import LoginStack from '../../src/components/Login';
import { NavigationContainer } from "@react-navigation/native";

test('Renders the <LoginStack /> component', () => {
  render(
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  );
});
