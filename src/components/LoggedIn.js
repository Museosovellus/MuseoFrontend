import { signOut } from "firebase/auth";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
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
    <View
      style={styles.container2}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Image
            style={styles.userImg}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
          />
          <Text style={styles.profileName}>{user.displayName}</Text>
          <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}