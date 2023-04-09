import { signOut } from "firebase/auth";
import { View, Text, Button } from "react-native";
import { auth } from "./firebaseConfig";

export default function LoggedIn({ onVisitedPress, onVisitPress }) {

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };
  const user = auth.currentUser;

  return (
    <View>
      {user ? (
        <>
          <Text>Email: {user.email}</Text>
          <Text>Username: {user.displayName}</Text>
        </>
      ) : (
        <Text></Text>
      )}
      <Button title="Käydyt museot" onPress={onVisitedPress} />
      <Button title="Haluan käydä" onPress={onVisitPress} />
      <Button title="Log out" onPress={logout} />
    </View>
  );
}