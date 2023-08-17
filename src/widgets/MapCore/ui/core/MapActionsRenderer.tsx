import { shallow } from 'zustand/shallow';
import {
	MAP_ACTION_DRAGGABLES,
	useMapActionsStore,
} from 'entities/map-actions';
import React from 'react';
// import { useMapUIStore } from 'widgets/MapCore/model/ui';
// import { MAP_UI_MODE } from 'widgets/MapCore/model/ui/types';
import { LeafletEvent } from 'leaflet';
import { useEmit } from 'widgets/MapCore/api';
import { MapStore } from 'entities/map';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { GetMapActionByType } from '../mapActions/getMapActionByType';
import { ActionMenu } from '../mapActions';

function MapActionsRendererPure() {
	const { actionsList, actionsByHash } = useMapActionsStore(
		(state) => ({
			actionsList: state.actionsList,
			actionsByHash: state.actionsByHash,
		}),
		shallow // TO-DO need function to prevent rerenders
	);

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
					>
						<ActionMenu action={action} />
					</ActionElement>
				) : null;
			})}
		</>
	);
}

export const MapActionsRenderer = React.memo(MapActionsRendererPure);
