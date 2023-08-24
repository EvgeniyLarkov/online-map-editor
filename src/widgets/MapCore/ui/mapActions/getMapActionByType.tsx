import {
	MAP_ACTION_DRAGGABLES,
	MapAction,
	isActionMarker,
	isActionPolygone,
	isActionPolyline,
} from 'entities/map-actions';
import React from 'react';
import { LatLng } from 'leaflet';
import { OMEActionsData } from 'entities/map-actions/model/action.types';
import { OMEMarker } from './Marker/Marker';
import { OMEPolyline } from './Polyline/Polyline';
import { OMEPolygone } from './Editables';

export function MapActionElement({
	action,
	children,
	editing,
	onChangeHandler,
	setEditing,
	...rest
}: {
	action: MapAction<OMEActionsData>;
	editing: boolean;
	onChangeHandler: (
		actionHash: string,
		coordinates?: LatLng,
		data?: OMEActionsData
	) => void;
	setEditing: (action: string | null) => void;
} & React.PropsWithChildren) {
	const canDrag = MAP_ACTION_DRAGGABLES[action.type];

	if (isActionMarker(action)) {
		return (
			<OMEMarker
				action={action}
				editing={editing}
				draggable={canDrag}
				onChangeHandler={onChangeHandler}
				setEditing={setEditing}
				{...rest}
			/>
		);
	}

	if (isActionPolyline(action)) {
		return (
			<OMEPolyline action={action} onChangeHandler={onChangeHandler} {...rest}>
				{children}
			</OMEPolyline>
		);
	}

	if (isActionPolygone(action)) {
		return (
			<OMEPolygone
				action={action}
				editing={editing}
				onChangeHandler={onChangeHandler}
				setEditing={setEditing}
				{...rest}
			>
				{children}
			</OMEPolygone>
		);
	}

	return null;
}
