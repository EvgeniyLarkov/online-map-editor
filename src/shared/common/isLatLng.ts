import { LatLng } from 'leaflet';

export function isLatLng(latlng: unknown): latlng is LatLng {
	return (
		Array.isArray(latlng) &&
		typeof latlng[0] === 'number' &&
		typeof latlng[1] === 'number' &&
		latlng[0] >= 0 &&
		latlng[1] >= 0 &&
		Number.isFinite(latlng[0]) &&
		Number.isFinite(latlng[1])
	);
}
