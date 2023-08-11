import { shallow } from 'zustand/shallow';
import { useMapActionsStore } from 'entities/map-actions';
import React from 'react';
import { MAP_EVENTS } from 'widgets/MapCore/api/types/map.types';
import { useSockets } from 'shared/api/transport';
import { MapAction } from 'entities/map-actions/model/types';

export function useEventRecieveController() {
	const { addActions, dropActions } = useMapActionsStore(
		(state) => ({
			addActions: state.add,
			dropActions: state.drop,
		}),
		shallow
	);

	const { io } = useSockets(
		(state) => ({
			io: state.io,
		}),
		shallow
	);

	React.useEffect(() => {
		const onGetActionsListener = (data: MapAction[]) => {
			addActions(data);
		};

		const onDropActionsListender = (data: MapAction[]) => {
			dropActions(data);
		};

		io?.on(MAP_EVENTS.get_actions, onGetActionsListener);
		io?.on(MAP_EVENTS.new_action, onGetActionsListener);
		io?.on(MAP_EVENTS.drop_action, onDropActionsListender);
		io?.on(MAP_EVENTS.change_action, onGetActionsListener);

		return () => {
			io?.off(MAP_EVENTS.get_actions, onGetActionsListener);
			io?.off(MAP_EVENTS.new_action, onGetActionsListener);
			io?.off(MAP_EVENTS.drop_action, onDropActionsListender);
			io?.off(MAP_EVENTS.change_action, onGetActionsListener);
		};
	}, [io]);
}
