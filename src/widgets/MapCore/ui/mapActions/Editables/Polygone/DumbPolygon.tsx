import { LatLng, LeafletEventHandlerFnMap } from 'leaflet';
import React from 'react';
import { MarkerProps, Polygon } from 'react-leaflet';

export function DumbPolygone({
	coordinates,
	children,
	setEditing,
	...rest
}: {
	coordinates: LatLng[];
	setEditing: () => void;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	const eventHandlers: LeafletEventHandlerFnMap = React.useMemo(
		() => ({
			click: () => {
				setEditing();
			},
		}),
		[setEditing]
	);

	return (
		<Polygon positions={coordinates} {...rest} eventHandlers={eventHandlers}>
			{children}
		</Polygon>
	);
}
