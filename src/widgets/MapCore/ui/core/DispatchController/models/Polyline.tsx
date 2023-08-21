import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { LatLng, LatLngExpression, LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { MAP_EVENTS, useEmit } from 'widgets/MapCore/api';

export function PolylineController({
	map,
	mapHash,
	onEndCallback,
}: {
	map: Map;
	mapHash: string;
	onEndCallback: () => void;
}) {
	const [initialCoordinates, setInitialCoordinates] =
		React.useState<null | LatLng>(null);

	const sendEvent = useEmit();

	const clickListener = React.useCallback(
		(e: LeafletMouseEvent) => {
			if (!initialCoordinates) {
				const coordinates = e.latlng;

				setInitialCoordinates(coordinates);
			} else {
				const finalCoordinates: LatLngExpression = e.latlng;
				sendEvent(MAP_EVENTS.new_action, mapHash, {
					type: MAP_ACTION_TYPES.polyline,
					coordinates: initialCoordinates,
					data: {
						coordinates: [initialCoordinates, finalCoordinates],
					},
				});

				setInitialCoordinates(null);

				onEndCallback();
			}
		},
		[mapHash, onEndCallback, initialCoordinates, sendEvent]
	);

	React.useEffect(() => {
		map.on('click', clickListener);

		return () => {
			map.off('click', clickListener);
		};
	}, [map, clickListener]);

	return null;
}
