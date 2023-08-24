import { shallow } from 'zustand/shallow';
import { MapActionsStore } from 'entities/map-actions';
import React from 'react';
import { LatLng, LeafletEvent } from 'leaflet';
import { useEmit } from 'widgets/MapCore/api';
import { MapStore } from 'entities/map';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { useMap } from 'react-leaflet';
import { OMEActionsData } from 'entities/map-actions/model/action.types';
import { MapEditingUIStore } from 'widgets/MapCore/model';
import { MapActionElement } from '../mapActions';

function MapActionsRendererPure() {
	const { actionsList, actionsByHash } = MapActionsStore(
		(state) => ({
			actionsList: state.actionsList,
			actionsByHash: state.actionsByHash,
		}),
		shallow // TO-DO need function to prevent rerenders
	);

	const map = useMap();

	const { mapHash } = MapStore((mapData) => ({
		mapHash: mapData.hash,
	}));
	const sendEvent = useEmit();

	const { editingActionHash, setEditingAction } = MapEditingUIStore(
		(state) => ({
			editingActionHash: state.action,
			setEditingAction: state.setEditing,
		})
	);

	const onChangeHandler = React.useCallback(
		(actionHash: string, coordinates?: LatLng, data?: OMEActionsData) => {
			if (mapHash) {
				sendEvent(MAP_EVENTS.change_action, mapHash, {
					hash: actionHash,
					...(coordinates && { coordinates }),
					...(data && { data }),
				});
			}
		},
		[sendEvent, mapHash]
	);

	console.log(
		Object.keys(map._events).reduce((acc, key) => {
			return acc + map._events[key].length;
		}, 0)
	);

	return (
		<>
			{actionsList.map((actionHash: string) => {
				const action = actionsByHash[actionHash];

				return (
					<MapActionElement
						key={actionHash}
						action={action}
						editing={action.hash === editingActionHash}
						// eventHandlers={eventHandlers(actionHash)}
						setEditing={setEditingAction}
						onChangeHandler={onChangeHandler}
					/>
				);
			})}
		</>
	);
}

export const MapActionsRenderer = React.memo(MapActionsRendererPure);
