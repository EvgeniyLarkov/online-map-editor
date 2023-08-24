import { MapAction, PolygoneData } from 'entities/map-actions';
import React from 'react';
import { MarkerProps } from 'react-leaflet';
import { isLatLngArray } from 'shared/common/isLatLngArray';
import { LatLng } from 'leaflet';
import { EditablePolygone } from './EditablePolygon';
import { DumbPolygone } from './DumbPolygon';

export function OMEPolygone({
	action,
	children,
	editing,
	onChangeHandler,
	setEditing,
	...rest
}: {
	action: MapAction<PolygoneData>;
	editing: boolean;
	onChangeHandler: (
		actionHash: string,
		coordinates?: LatLng,
		data?: PolygoneData
	) => void;
	setEditing: (action: string | null) => void;
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

	const handleSetEditing = React.useCallback(() => {
		setEditing(action.hash);
	}, [setEditing, action.hash]);

	const handleDiscardEditing = React.useCallback(() => {
		setEditing(null);
	}, [setEditing]);

	return (
		isLatLngArray(latlng) &&
		(editing ? (
			<EditablePolygone
				coordinates={latlng}
				discardEditing={handleDiscardEditing}
				onChange={onChange}
				{...rest}
			>
				{children}
			</EditablePolygone>
		) : (
			<DumbPolygone
				coordinates={latlng}
				setEditing={handleSetEditing}
				{...rest}
			>
				{children}
			</DumbPolygone>
		))
	);
}
