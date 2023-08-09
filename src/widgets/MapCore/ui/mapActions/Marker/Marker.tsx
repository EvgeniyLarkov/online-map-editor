import { LatLng } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';

export function LocationMarker({ position }: { position: LatLng }) {
	return <Marker position={position} />;
}
