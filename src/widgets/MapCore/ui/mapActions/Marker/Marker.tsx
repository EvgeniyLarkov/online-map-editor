import { MapAction, MarkerData } from 'entities/map-actions';
import { LatLng, LeafletEvent, LeafletEventHandlerFnMap } from 'leaflet';
import React from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import { isLatLng } from 'shared/common/isLatLng';

export function OMEMarker({
	action,
	children,
	editing,
	onChangeHandler,
	setEditing,
	...rest
}: {
	action: MapAction<MarkerData>;
	editing: boolean;
	onChangeHandler: (
		actionHash: string,
		coordinates?: LatLng,
		data?: MarkerData
	) => void;
	setEditing: (action: string | null) => void;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	// TO-DO refactor types
	const latlng = { lat: action.lat, lng: action.lng };

	const eventHandlers: LeafletEventHandlerFnMap = React.useMemo(
		() => ({
			click: () => {
				if (editing) {
					setEditing(null);
				} else {
					setEditing(action.hash);
				}
			},
			dragend(event: LeafletEvent) {
				const coordinates = event.target.getLatLng();

				onChangeHandler(action.hash, coordinates);
			},
		}),
		[setEditing, onChangeHandler, action.hash, editing]
	);

	return isLatLng(latlng) ? (
		<Marker position={latlng} eventHandlers={eventHandlers} {...rest}>
			{children}
		</Marker>
	) : null;
}
