import { shallow } from 'zustand/shallow';
import { MAP_ACTION_DRAGGABLES, MapActionsStore } from 'entities/map-actions';
import React from 'react';
import { LatLng, LeafletEvent } from 'leaflet';
import { useEmit } from 'widgets/MapCore/api';
import { MapStore } from 'entities/map';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { useMap } from 'react-leaflet';
import { OMEActionsData } from 'entities/map-actions/model/action.types';
import { GetMapActionByType } from '../mapActions/getMapActionByType';
import { ActionMenu } from '../mapActions';

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

	// const { selectedMode } = useMapUIStore((state) => ({
	// 	selectedMode: state.mode,
	// }));

	// const canActionsBeDraggable = selectedMode === MAP_UI_MODE.intial;

	const eventHandlers = React.useCallback(
		(actionHash: string) => ({
			dragend(event: LeafletEvent) {
				if (mapHash) {
					const coordinates = event.target.getLatLng();

					sendEvent(MAP_EVENTS.change_action, mapHash, {
						hash: actionHash,
						coordinates,
					});
				}
			},
		}),
		[sendEvent, mapHash]
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
				const ActionElement = GetMapActionByType(action);

				const canDrag = MAP_ACTION_DRAGGABLES[action.type];

				return ActionElement ? (
					<ActionElement
						action={action}
						key={actionHash}
						draggable={canDrag}
						eventHandlers={eventHandlers(actionHash)}
						onChangeHandler={onChangeHandler}
					>
						<ActionMenu action={action} />
					</ActionElement>
				) : null;
			})}
		</>
	);
}

export const MapActionsRenderer = React.memo(MapActionsRendererPure);
