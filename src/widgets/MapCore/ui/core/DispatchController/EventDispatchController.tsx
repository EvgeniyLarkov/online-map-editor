import { MapStore } from 'entities/map';
import { MAP_ACTION_TYPES } from 'entities/map-actions';
import React from 'react';
import { MAP_UI_MODE, useMapUIStore } from 'widgets/MapCore/model';
import { useMap } from 'react-leaflet';
import { MarkerController } from './models/Marker';
import { PolylineController } from './models/Polyline';
import { PolygoneController } from './models/Editable';

export function EventDispatchController() {
	const map = useMap();

	const { mapHash } = MapStore((mapData) => ({
		mapHash: mapData.hash,
	}));
	const { selectedMode, selectedAction } = useMapUIStore((state) => ({
		selectedMode: state.mode,
		selectedAction: state.selectedAction,
	}));

	const onEndCallback = React.useCallback(() => {}, []);

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
			if (selectedAction === MAP_ACTION_TYPES.polygone) {
				return (
					<PolygoneController
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
