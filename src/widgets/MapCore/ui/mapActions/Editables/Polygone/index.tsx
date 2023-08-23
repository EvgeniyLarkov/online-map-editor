import { MapAction, PolygoneData } from 'entities/map-actions';
import React from 'react';
import { MarkerProps } from 'react-leaflet';
import { isLatLngArray } from 'shared/common/isLatLngArray';
import { LatLng } from 'leaflet';
import { EditablePolygone } from './EditablePolygon';

export function OMEPolygone({
	action,
	children,
	onChangeHandler,
	...rest
}: {
	action: MapAction<PolygoneData>;
	onChangeHandler: (
		actionHash: string,
		coordinates?: LatLng,
		data?: PolygoneData
	) => void;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	// TO-DO refactor types
	const latlng = action.data?.coordinates;

	const onChange = React.useCallback(
		(coordinates?: LatLng, data?: PolygoneData) => {
			onChangeHandler(action.hash, coordinates, data);
		},
		[onChangeHandler, action.hash]
	);

	return isLatLngArray(latlng) ? (
		<EditablePolygone coordinates={latlng} onChange={onChange} {...rest}>
			{children}
		</EditablePolygone>
	) : null;
}
