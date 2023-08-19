import { shallow } from 'zustand/shallow';
import { MapAction, MapActionsStore } from 'entities/map-actions';
import React from 'react';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { useSockets } from 'shared/api/transport';
import { MapParticipantsStore } from 'entities/map-participants';
import { MapParticipant } from 'entities/map-participant';
import {
	ParticipantJoinResponseDTO,
	ParticipantLeaveResponseDTO,
} from './types';

export function useEventRecieveController() {
	const { addActions, dropActions } = MapActionsStore(
		(state) => ({
			addActions: state.add,
			dropActions: state.drop,
		}),
		shallow
	);

	const { addParticipant, dropParticipant } = MapParticipantsStore((state) => ({
		addParticipant: state.add,
		dropParticipant: state.drop,
	}));

	const { io } = useSockets(
		(state) => ({
			io: state.io,
		}),
		shallow
	);

	React.useEffect(() => {
		const onModifyActionsListener = (data: MapAction[]) => {
			addActions(data);
		};

		const onDropActionsListender = (data: MapAction[]) => {
			dropActions(data);
		};

		const onNewParticipantJoin = (data: ParticipantJoinResponseDTO) => {
			addParticipant(data.participant);
		};

		const onParticipantLeave = (data: ParticipantLeaveResponseDTO) => {
			dropParticipant(data.participantHash);
		};

		io?.on(MAP_EVENTS.new_action, onModifyActionsListener); // TO-DO add types check (DTOs) and error handling
		io?.on(MAP_EVENTS.drop_action, onDropActionsListender);
		io?.on(MAP_EVENTS.change_action, onModifyActionsListener);
		io?.on(MAP_EVENTS.participant_join, onNewParticipantJoin);
		io?.on(MAP_EVENTS.participant_leave, onParticipantLeave);

		return () => {
			io?.off(MAP_EVENTS.new_action, onModifyActionsListener);
			io?.off(MAP_EVENTS.drop_action, onDropActionsListender);
			io?.off(MAP_EVENTS.change_action, onModifyActionsListener);
			io?.off(MAP_EVENTS.participant_join, onNewParticipantJoin);
			io?.off(MAP_EVENTS.participant_leave, onParticipantLeave);
		};
	}, [io]);
}
