import { shallow } from 'zustand/shallow';
import React from 'react';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { useMapActionsStore } from 'entities/map-actions';
import { useSockets } from 'shared/api/transport';
import { useEmit } from 'widgets/MapCore/api';
import { JoinMapResponseDTO } from './RecieveController/types';

export function useMapJoinController(mapHash: string | null) {
	const [connectedMap, setConnectedMap] = React.useState<string | null>(null);
	const [connectingMap, setConnectingMap] = React.useState<boolean>(false);

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
		console.log(
			'!!!!!!!!!!!!!!!!!',
			connectedMap,
			connectingMap,
			mapHash,
			mapHash !== connectedMap
		);

		if (mapHash && !connectingMap && connectedMap !== mapHash) {
			setConnectingMap(true);
			sendEvent(MAP_EVENTS.join_map, mapHash);
		}

		return () => {
			if (connectedMap) {
				sendEvent(MAP_EVENTS.leave_map, connectedMap);
				setConnectingMap(false);
			}
		};
	}, [mapHash, sendEvent, connectingMap, connectedMap]);

	React.useEffect(() => {
		const onGetActionsListener = (data: JoinMapResponseDTO) => {
			console.log(data);
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
