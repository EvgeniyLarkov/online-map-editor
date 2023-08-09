import { useMapStore } from 'entities/map';
import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { Map } from 'leaflet';
import React from 'react';
import { useEmit } from 'widgets/MapCore/api';
import { MAP_EVENTS } from 'widgets/MapCore/api/types/map.types';

export function EventDispatchController({ map }: { map: Map }) {
	const { mapHash } = useMapStore((mapData) => ({
		mapHash: mapData.hash,
	}));
	const sendEvent = useEmit();

	React.useEffect(() => {
		map.on('click', (e) => {
			const coordinates = e.latlng;

			if (!mapHash) {
				return;
			}

			if (true) {
				// TO-DO handling multiple events
				sendEvent(MAP_EVENTS.new_action, mapHash, {
					type: MAP_ACTION_TYPES.marker,
					coordinates,
				});
			}
		});

		return () => {
			map.off();
		};
	}, [map, mapHash]);

	return null;
}
