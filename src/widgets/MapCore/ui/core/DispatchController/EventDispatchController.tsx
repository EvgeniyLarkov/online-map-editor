import { MapStore } from 'entities/map';
import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { Map } from 'leaflet';
import React from 'react';
import { MAP_UI_MODE, useMapUIStore } from 'widgets/MapCore/model';
import { MarkerController } from './models/Marker';
import { PolylineController } from './models/Polyline';

export function EventDispatchController({ map }: { map: Map }) {
	const { mapHash } = MapStore((mapData) => ({
		mapHash: mapData.hash,
	}));
	const { selectedMode, selectedAction } = useMapUIStore((state) => ({
		selectedMode: state.mode,
		selectedAction: state.selectedAction,
	}));

	const onEndCallback = React.useCallback(() => {
		console.log('finish');
	}, []);

	const enableControllers =
		mapHash && selectedMode === MAP_UI_MODE.action_select;

	const result = React.useMemo(() => {
		if (enableControllers) {
			if (selectedAction === MAP_ACTION_TYPES.marker) {
				return (
					<MarkerController
						map={map}
						mapHash={mapHash}
						onEndCallback={onEndCallback}
					/>
				);
			}
			if (selectedAction === MAP_ACTION_TYPES.polyline) {
				return (
					<PolylineController
						map={map}
						mapHash={mapHash}
						onEndCallback={onEndCallback}
					/>
				);
			}
		}

		return null;
	}, [enableControllers, map, mapHash, selectedAction, onEndCallback]);

	return result;
}
