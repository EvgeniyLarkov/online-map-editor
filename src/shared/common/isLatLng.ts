import { LatLng } from 'leaflet';
import { isLatLngAsObject } from './isLatLngAsObject';
import { isLatLngTuple } from './isLatLngTuple';

export function isLatLng(latlng: unknown): latlng is LatLng {
	return Array.isArray(latlng)
		? latlng.every((item) => isLatLngTuple(item)) ||
				latlng.every((item) => isLatLngAsObject(item))
		: isLatLngAsObject(latlng);
}
