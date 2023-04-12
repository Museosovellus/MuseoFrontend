import { render } from "@testing-library/react-native";
import LoggedIn from "../../src/components/LoggedIn";
import { getAuth } from "firebase/auth";

test('Renders the <LoggedIn /> component', () => {
  const auth = getAuth();
  render(<LoggedIn />);
});
