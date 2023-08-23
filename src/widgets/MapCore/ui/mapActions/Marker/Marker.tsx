import { MapAction } from 'entities/map-actions';
import React from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import { isLatLng } from 'shared/common/isLatLng';

export function OMEMarker({
	action,
	children,
	onChangeHandler,
	...rest
}: {
	action: MapAction;
	onChangeHandler: (actionHash: string) => void;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	// TO-DO refactor types
	const latlng = { lat: action.lat, lng: action.lng };

	return isLatLng(latlng) ? (
		<Marker position={latlng} {...rest}>
			{children}
		</Marker>
	) : null;
}
