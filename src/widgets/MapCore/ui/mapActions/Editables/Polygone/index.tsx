import { MapAction, PolygoneData } from 'entities/map-actions';
import React from 'react';
import { MarkerProps } from 'react-leaflet';
import { isLatLngArray } from 'shared/common/isLatLngArray';
import { EditablePolygone } from './EditablePolygon';

export function OMEPolygone({
	action,
	children,
	...rest
}: {
	action: MapAction<PolygoneData>;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	// TO-DO refactor types
	const latlng = action.data?.coordinates;

	return isLatLngArray(latlng) ? (
		<EditablePolygone coordinates={latlng} {...rest}>
			{children}
		</EditablePolygone>
	) : null;
}
