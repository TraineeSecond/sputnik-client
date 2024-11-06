import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, View} from 'react-native';

import {Appeal} from 'entities/appeal';
import {useUserStore} from 'entities/user';
import {AppealItem} from 'shared/ui';

import {useAppealsSeller} from '../model/store';
import {AppealsSellerStyles as styles} from './AppealsSeller.styles';

export const AppealsSeller = () => {
  const {appeals, getAppeals, refreshing, setRefreshing, sendResultAppeal} =
    useAppealsSeller();

  const {user} = useUserStore();

  useEffect(() => {
    getAppeals(user.id);
  }, [user.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    getAppeals(user.id);
    setRefreshing(false);
  };

  const renderCardAppeal = ({item}: {item: Appeal}) => {
    const onAccept = () => sendResultAppeal(item.id, 'accepted');
    const onReject = () => sendResultAppeal(item.id, 'rejected');
    const hasNoAnswer = item.status === 'pending';
    return (
      <AppealItem
        hasNoAnswer={hasNoAnswer}
        item={item}
        onAccept={onAccept}
        onReject={onReject}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appeals}
        initialNumToRender={20}
        renderItem={renderCardAppeal}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
