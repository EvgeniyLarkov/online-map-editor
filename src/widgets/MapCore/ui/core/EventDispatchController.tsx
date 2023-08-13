import { useMapStore } from 'entities/map';
import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { useEmit } from 'widgets/MapCore/api';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { MAP_UI_MODE, useMapUIStore } from 'widgets/MapCore/model';

export function EventDispatchController({ map }: { map: Map }) {
	const { mapHash } = useMapStore((mapData) => ({
		mapHash: mapData.hash,
	}));
	const { selectedMode, selectedAction } = useMapUIStore((state) => ({
		selectedMode: state.mode,
		selectedAction: state.selectedAction,
	}));
	const sendEvent = useEmit();

	React.useEffect(() => {
		const clickListener = (e: LeafletMouseEvent) => {
			if (
				!mapHash ||
				selectedMode !== MAP_UI_MODE.action_select ||
				selectedAction === null
			) {
				return;
			}

			const coordinates = e.latlng;

			switch (selectedAction) {
				case MAP_ACTION_TYPES.marker:
					sendEvent(MAP_EVENTS.new_action, mapHash, {
						type: MAP_ACTION_TYPES.marker,
						coordinates,
					});
					break;
				default:
					break;
			}
		};

		map.on('click', clickListener);

		return () => {
			map.off('click', clickListener);
		};
	}, [map, mapHash, selectedMode, selectedAction]);

	return null;
}
