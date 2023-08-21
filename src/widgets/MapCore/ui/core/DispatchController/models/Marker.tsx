import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
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

	const clickListener = (e: LeafletMouseEvent) => {
		const coordinates = e.latlng;
		sendEvent(MAP_EVENTS.new_action, mapHash, {
			type: MAP_ACTION_TYPES.marker,
			coordinates,
		});

		onEndCallback();
	};

	React.useEffect(() => {
		map.on('click', clickListener);

		return () => {
			map.off('click', clickListener);
		};
	}, [map]);

	return null;
}
