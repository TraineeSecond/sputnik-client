import React, {useState} from 'react';
import {Alert, Image} from 'react-native';

import YaMap, {Marker} from 'react-native-yamap';

import {MapPageStyles as styles} from './Map.styles';

const markerImage = require('shared/assets/images/mark.jpg');

const points = [
  {
    id: 1,
    name: 'Пункт выдачи 1',
    rating: 5.0,
    coordinate: {lat: 56.454732, lon: 84.969882},
    address: 'Томск, Улица Нахимова, 13б',
  },
  {
    id: 2,
    name: 'Пункт выдачи 2',
    rating: 4.89,
    coordinate: {lat: 56.463366, lon: 84.973323},
    address: 'Томск, Улица Усова, 23',
  },
  {
    id: 3,
    name: 'Пункт выдачи 3',
    rating: 4.96,
    coordinate: {lat: 56.476528, lon: 84.957207},
    address: 'Томск, проспект Фрунзе, 18',
  },
];

export const Map = () => {
  const [filteredPoints, setFilteredPoints] = useState(points);

  return (
    <YaMap
      showUserPosition
      style={styles.map}
      initialRegion={{
        lat: 56.484611,
        lon: 84.947956,
        zoom: 12,
      }}>
      {filteredPoints.map(point => (
        <Marker
          key={point.id}
          scale={2}
          point={{lat: point.coordinate.lat, lon: point.coordinate.lon}}
          onPress={() => {
            Alert.alert(
              `Пункт: ${point.name}`,
              `Рейтинг: ${point.rating}\nАдрес: ${point.address}`,
            );
          }}>
          <Image source={markerImage} style={{width: 20, height: 20}} />
        </Marker>
      ))}
    </YaMap>
  );
};
