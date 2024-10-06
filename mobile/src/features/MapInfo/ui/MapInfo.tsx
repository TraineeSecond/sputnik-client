import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, Text, View} from 'react-native';

import YaMap, {Marker} from 'react-native-yamap';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useCartStore} from 'shared/stores/CartStore';

import {useMapStore} from '../model/store';
import {MapInfoStyles as styles} from './MapInfo.styles';

const markerImage = require('shared/assets/images/mark.jpg');

export const MapInfo = () => {
  const {points, fetchPoints} = useMapStore();

  const {selectedPoint, setSelectedPoint} = useCartStore();

  const {t} = useTranslation();

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <View style={{flex: 1}}>
      {selectedPoint && (
        <View style={styles.selectedPointContainer}>
          <Text
            style={[
              TextStyles.p1.changeColor(Colors.Black100),
              styles.selectedPointText,
            ]}>
            {t('Выбранный пункт находится по адресу')}:
          </Text>
          <Text
            style={[
              TextStyles.p1.changeColor(Colors.Black100),
              styles.selectedPointText,
            ]}>
            {selectedPoint.address}
          </Text>
        </View>
      )}
      <YaMap
        showUserPosition
        style={styles.map}
        initialRegion={{
          lat: 56.484611,
          lon: 84.947956,
          zoom: 12,
        }}>
        {points.map(point => (
          <Marker
            key={point.id}
            scale={0.1}
            point={{lat: point.lat, lon: point.lon}}
            source={markerImage}
            onPress={() => {
              Alert.alert(
                `${t('Пункт')}: ${point.name}`,
                `${t('Рейитнг')}: ${point.rating.toFixed(2)}\n${t('Адрес')}: ${
                  point.address
                }`,
                [
                  {text: t('Отмена')},
                  {
                    text: t('Выбрать'),
                    onPress: () => {
                      setSelectedPoint(point);
                    },
                  },
                ],
              );
            }}></Marker>
        ))}
      </YaMap>
    </View>
  );
};
