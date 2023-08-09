import { shallow } from 'zustand/shallow';
import { useMapActionsStore } from 'entities/map-actions';
import React from 'react';
import { MAP_EVENTS } from 'widgets/MapCore/api/types/map.types';
import { useSockets } from 'shared/api/transport';
import { MapAction } from 'entities/map-actions/model/types';

export function useEventRecieveController() {
	const { addActions } = useMapActionsStore(
		(state) => ({
			addActions: state.add,
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
			console.log(data);
			addActions(data);
		};

		io?.on(MAP_EVENTS.get_actions, onGetActionsListener);

		return () => {
			io?.off(MAP_EVENTS.get_actions, onGetActionsListener);
		};
	}, [io]);
}
