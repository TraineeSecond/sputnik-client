import { MapContainer } from 'react-leaflet';
import styled from 'styled-components';

export const StyledMapContainer = styled(MapContainer)`
  height: 500px;
  width: 500px;
  border-radius: 10px;

  .leaflet-bottom.leaflet-right {
    display: none;
  }
`;
