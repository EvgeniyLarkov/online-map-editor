import L, { LatLng } from 'leaflet';

export function calcArea(coordinates: LatLng[]) {
	return L.GeometryUtil.geodesicArea(coordinates);
}
