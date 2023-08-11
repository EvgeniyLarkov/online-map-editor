import { LatLng } from 'leaflet';

export function isLatLng(latlng: unknown): latlng is LatLng {
	return (
		Array.isArray(latlng) &&
		typeof latlng[0] === 'number' &&
		typeof latlng[1] === 'number' &&
		Number.isFinite(latlng[0]) &&
		Number.isFinite(latlng[1])
	);
}
