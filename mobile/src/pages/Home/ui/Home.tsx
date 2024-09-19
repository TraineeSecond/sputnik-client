import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {HomePageStyles as styles} from './Home.styles';
import {useUserStore} from 'entities/user';

const Home = () => {
  const {loadUserData} = useUserStore();
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;
