import { MapAction, PolylineData } from 'entities/map-actions';
import React from 'react';
import { MarkerProps, Polyline } from 'react-leaflet';
import { isLatLng } from 'shared/common/isLatLng';

export function OMEPolyline({
	action,
	children,
	...rest
}: {
	action: MapAction<PolylineData>;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	// TO-DO refactor types
	const latlng = action.data?.coordinates;

	return isLatLng(latlng) ? (
		<Polyline positions={latlng} {...rest}>
			{children}
		</Polyline>
	) : null;
}
