import { render } from '@testing-library/react-native';
import MapStack from "../../src/screens/MuseoMap";
import { NavigationContainer } from "@react-navigation/native";

test('Renders the <MuseoMap /> component', () => {
  render(
    <NavigationContainer>
      <MapStack />
    </NavigationContainer>
  );
});
