import { render } from "@testing-library/react-native";
import Home from "../../src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";

test('Renders the <Home /> component', () => {
  render(
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
});
