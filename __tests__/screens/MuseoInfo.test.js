import { render } from "@testing-library/react-native";
import MuseoInfo from "../../src/screens/MuseoInfo";

test('Renders the <MuseoInfo /> component', () => {
  const mockParams = {
    route: {
      params: {
        name: 'testname',
        city: 'testcity',
        province: 'testprovince',
        latitude: 'testlat',
        longitude: 'testlng',
        openingHours: 'testhrs',
        index: 0
      }
    },
    navigation: 'testnav'
  };
  render(<MuseoInfo {...mockParams} />);
});
