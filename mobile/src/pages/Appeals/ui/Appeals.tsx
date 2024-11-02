import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {AppealsBuyer} from 'features/AppealsBuyer/ui/AppealsBuyer';
import {AppealsSeller} from 'features/AppealsSeller/ui/AppealsSeller';

import {AppealsStyles as styles} from './Appeals.styles';

type AppealsRouteParams = RouteProp<ProfileStackParamsList, Screens.APPEALS>;

export const Appeals = () => {
  const route = useRoute<AppealsRouteParams>();

  const {isSeller, product} = route.params;

  console.log('параметры на страницу', route.params);

  return (
    <View style={styles.container}>
      {isSeller ? <AppealsSeller /> : <AppealsBuyer product={product} />}
    </View>
  );
};
