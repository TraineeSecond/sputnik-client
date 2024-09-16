import React from 'react';
import {View, Text} from 'react-native';
import {ProfilePageStyles as styles} from './Profile.styles';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

export default Profile;
