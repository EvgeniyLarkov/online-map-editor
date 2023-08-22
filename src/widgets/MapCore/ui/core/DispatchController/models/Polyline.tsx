import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { LatLng, LatLngExpression, LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { Polyline } from 'react-leaflet';
import { MAP_EVENTS, useEmit } from 'widgets/MapCore/api';
import { useThrottle } from '@uidotdev/usehooks';

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

	const [mousePosition, setMousePosition] = React.useState<null | LatLng>(null);
	const endPolylineCoords = useThrottle(mousePosition, 10);

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

		const onMove = (e: LeafletMouseEvent) => {
			return setMousePosition(e.latlng);
		};

		if (initialCoordinates) {
			map.on('mousemove', onMove);
		} else {
			map.off('mousemove', onMove);
		}

		return () => {
			map.off('click', clickListener);
			map.off('move', onMove);
		};
	}, [map, clickListener, initialCoordinates]);

	const PolylineLatLng: [LatLng, LatLng] | null = React.useMemo(
		() =>
			initialCoordinates && endPolylineCoords
				? [initialCoordinates, endPolylineCoords]
				: null,
		[initialCoordinates, endPolylineCoords]
	);

	return PolylineLatLng ? <Polyline positions={PolylineLatLng} /> : null;
}
