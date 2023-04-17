import { React, useContext } from 'react';
import { Text, View, Button, useColorScheme, Switch } from 'react-native';
import themeContext from '../../config/themeContext';
import styles from '../../Styles';

export default function Home({ navigation }) {
  const theme = useContext(themeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.letter}>M</Text>
      <Text style={[styles.header, { color: theme.color }]}>MUSEOÄPPI</Text>
    </View>
  );
};