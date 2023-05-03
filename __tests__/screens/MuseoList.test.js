import { render } from "@testing-library/react-native";
import MuseoList from "../../src/screens/MuseoList";
import { NavigationContainer } from "@react-navigation/native";

test('Renders the <Muselist /> component', () => {
  render(
    <NavigationContainer>
      <MuseoList />
    </NavigationContainer>
  );
});
