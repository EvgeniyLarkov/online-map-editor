import { MapAction } from 'entities/map-actions/model/types';
import React from 'react';
import { Marker } from 'react-leaflet';
import { isLatLng } from 'shared/common/isLatLng';

export function LocationMarker({ action }: { action: MapAction }) {
	const latlng = [action.lat, action.lng];

	return isLatLng(latlng) ? <Marker position={latlng} /> : null;
}
