import React, {useEffect} from 'react';
import {Alert, Image} from 'react-native';

import YaMap, {Marker} from 'react-native-yamap';

import {useMapStore} from '../model/store';
import {MapInfoStyles as styles} from './MapInfo.styles';

const markerImage = require('shared/assets/images/mark.jpg');

export const MapInfo = () => {
  const {points, fetchPoints} = useMapStore();

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
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
          scale={2}
          point={{lat: point.lat, lon: point.lon}}
          onPress={() => {
            Alert.alert(
              `Пункт: ${point.name}`,
              `Рейтинг: ${point.rating.toFixed(2)}\nАдрес: ${point.address}`,
            );
          }}>
          <Image source={markerImage} style={{width: 20, height: 20}} />
        </Marker>
      ))}
    </YaMap>
  );
};
