import { shallow } from 'zustand/shallow';
import React from 'react';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { MapActionsStore } from 'entities/map-actions';
import { useSockets } from 'shared/api/transport';
import { useEmit } from 'widgets/MapCore/api';
import { JoinMapResponseDTO } from './RecieveController/types';

export function useMapJoinController(mapHash: string | null) {
	const [connectedMap, setConnectedMap] = React.useState<string | null>(null);
	const [connectingMap, setConnectingMap] = React.useState<boolean>(false);

	const { addActions, clearActions } = MapActionsStore((state) => ({
		addActions: state.add,
		clearActions: state.clear,
	}));

	const sendEvent = useEmit();

	const { io } = useSockets(
		(state) => ({
			io: state.io,
		}),
		shallow
	);

	React.useEffect(() => {
		if (mapHash && !connectingMap && connectedMap !== mapHash) {
			setConnectingMap(true);
			sendEvent(MAP_EVENTS.join_map, mapHash);
		}

		return () => {
			if (connectedMap) {
				clearActions();
				sendEvent(MAP_EVENTS.leave_map, connectedMap);
				setConnectingMap(false);
			}
		};
	}, [mapHash, sendEvent, connectingMap, connectedMap]);

	React.useEffect(() => {
		const onGetActionsListener = (data: JoinMapResponseDTO) => {
			addActions(data.actions);
			setConnectedMap(data.mapHash);
			setConnectingMap(false);
		};

		io?.on(MAP_EVENTS.join_map, onGetActionsListener);

		return () => {
			io?.off(MAP_EVENTS.join_map, onGetActionsListener);
		};
	}, [io]);
}
