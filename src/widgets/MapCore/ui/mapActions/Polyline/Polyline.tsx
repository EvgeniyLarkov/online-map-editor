import { MapAction, PolylineData } from 'entities/map-actions';
import React from 'react';
import { MarkerProps, Polyline } from 'react-leaflet';
import { isLatLng } from 'shared/common/isLatLng';

export function OMEPolyline({
	action,
	children,
	onChangeHandler,
	...rest
}: {
	action: MapAction<PolylineData>;
	onChangeHandler: (actionHash: string) => void;
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
