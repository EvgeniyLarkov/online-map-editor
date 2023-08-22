import { LatLng } from 'leaflet';

export const isSameCoordinates = (
	a: LatLng,
	b: LatLng,
	tolerance = 0.01
): boolean => {
	return (
		Math.abs(a.lat - b.lat) < tolerance && Math.abs(a.lng - b.lng) < tolerance
	);
};
