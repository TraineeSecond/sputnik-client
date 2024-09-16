import React from 'react';
import {View, Text} from 'react-native';
import {HomePageStyles as styles} from './Home.styles';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;
