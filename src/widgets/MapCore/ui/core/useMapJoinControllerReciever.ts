import { shallow } from 'zustand/shallow';
import React from 'react';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { useMapActionsStore } from 'entities/map-actions';
import { useSockets } from 'shared/api/transport';
import { useEmit } from 'widgets/MapCore/api';
import { JoinMapResponseDTO } from './RecieveController/types';

export function useMapJoinController(mapHash: string | null) {
	const { addActions } = useMapActionsStore((state) => ({
		addActions: state.add,
	}));

	const sendEvent = useEmit();

	const { io } = useSockets(
		(state) => ({
			io: state.io,
		}),
		shallow
	);

	React.useEffect(() => {
		if (mapHash) {
			sendEvent(MAP_EVENTS.join_map, mapHash);
		}
	}, [mapHash, sendEvent]);

	React.useEffect(() => {
		const onGetActionsListener = (data: JoinMapResponseDTO) => {
			console.log(data);
			addActions(data.actions);
		};

		io?.on(MAP_EVENTS.get_actions, onGetActionsListener);

		return () => {
			io?.off(MAP_EVENTS.get_actions, onGetActionsListener);
		};
	}, [io]);
}
