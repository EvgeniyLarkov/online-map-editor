import { LatLng } from 'leaflet';
import { isLatLngAsObject } from './isLatLngAsObject';

export function isLatLngArray(latlng: unknown): latlng is LatLng {
	if (Array.isArray(latlng)) {
		return latlng.every((item) => isLatLngAsObject(item));
	}
	return false;
}
