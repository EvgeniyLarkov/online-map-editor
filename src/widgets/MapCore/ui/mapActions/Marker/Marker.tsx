import { MapAction } from 'entities/map-actions/model/types';
import React from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import { isLatLng } from 'shared/common/isLatLng';

export function LocationMarker({
	action,
	children,
	...rest
}: {
	action: MapAction;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	// TO-DO refactor types
	const latlng = [action.lat, action.lng];

	return isLatLng(latlng) ? (
		<Marker position={latlng} {...rest}>
			{children}
		</Marker>
	) : null;
}
