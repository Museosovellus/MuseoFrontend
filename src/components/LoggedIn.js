import { signOut } from "firebase/auth";
import { View, Text, Button } from "react-native";
import styles from "../../Styles";
import { auth } from "./firebaseConfig";

export default function LoggedIn() {

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
          <Text style={styles.profileName}>Hei {user.displayName}!</Text>

          <Text>{user.email}</Text>
        </>
      ) : (
        <Text></Text>
      )}
      <Button title="Log out" onPress={logout} />
    </View>
  );
}