import React from 'react';
import {Text, View} from 'react-native';
import YaMap, { Point } from 'react-native-yamap';

import {MapPageStyles as styles} from './Map.styles';

type State = {
  marker?: Point;
  polyline: Point[];
  night: boolean;
  address?: string;
};
const initialState: State = {
  marker: undefined,
  polyline: [],
  night: false,
  address: undefined,
};

export const Map = () => {
  const state = initialState;

  const map = React.createRef<YaMap>();

  
  return (
    <YaMap
      nightMode={true}
      userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
      initialRegion={{
        lat: 50,
        lon: 50,  
        zoom: 10,
        azimuth: 80,
        tilt: 100
      }}
      style={{ flex: 1 }}
    />
  );
};
