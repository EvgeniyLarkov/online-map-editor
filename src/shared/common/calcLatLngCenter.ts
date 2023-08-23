import { LatLng, latLng } from 'leaflet';

export function calcLatLngCenter(latlng: LatLng[]): LatLng {
	const { length } = latlng;
	let lngSum = 0;
	let latSum = 0;

	latlng.forEach((item) => {
		lngSum += item.lng;
		latSum += item.lat;
	});

	const result = latLng(latSum / length, lngSum / length);

	return result;
}
