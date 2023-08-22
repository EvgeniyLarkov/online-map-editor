import { useThrottle } from '@uidotdev/usehooks';
import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { LatLng, LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import { MAP_EVENTS, useEmit } from 'widgets/MapCore/api';

export function MarkerController({
	map,
	mapHash,
	onEndCallback,
}: {
	map: Map;
	mapHash: string;
	onEndCallback: () => void;
}) {
	const sendEvent = useEmit();
	const [mousePosition, setMousePosition] = React.useState<null | LatLng>(null);
	const markerPos = useThrottle(mousePosition, 10);

	const clickListener = React.useCallback(
		(e: LeafletMouseEvent) => {
			const coordinates = e.latlng;
			sendEvent(MAP_EVENTS.new_action, mapHash, {
				type: MAP_ACTION_TYPES.marker,
				coordinates,
			});

			onEndCallback();
		},
		[mapHash, sendEvent, onEndCallback]
	);

	React.useEffect(() => {
		map.on('click', clickListener);

		const onMove = (e: LeafletMouseEvent) => {
			return setMousePosition(e.latlng);
		};

		map.on('mousemove', onMove);

		return () => {
			map.off('click', clickListener);
			map.off('move', onMove);
		};
	}, [map, clickListener]);

	const MarkerLatLng: LatLng | null = React.useMemo(
		() => markerPos || null,
		[markerPos]
	);

	return MarkerLatLng ? <Marker position={MarkerLatLng} /> : null;
}
