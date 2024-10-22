import { Marker, Popup, TileLayer } from 'react-leaflet';

import { StyledMapContainer } from './Map.styles';

import { usePointsStore } from '../model/pointsStore';

const Map = () => {
  const { points } = usePointsStore();

  if (points.length === 0) {
    return null;
  }

  return (
    <StyledMapContainer
      style={{ flex: 1 }}
      center={[points[0].lat, points[0].lon]}
      zoom={13}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {points.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lon]}>
          <Popup>
            <strong>{point.name}</strong>
            <br />
            {point.address}
          </Popup>
        </Marker>
      ))}
    </StyledMapContainer>
  );
};

export default Map;
