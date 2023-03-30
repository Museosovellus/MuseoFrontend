import { signOut } from "firebase/auth";
import { View, Text, Button } from "react-native";
import { auth } from "../firebaseConfig";

export default function LoggedIn() {
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View>
            <Text></Text>
            <Button title="Log out" onPress={logout} />
        </View>
    );
}