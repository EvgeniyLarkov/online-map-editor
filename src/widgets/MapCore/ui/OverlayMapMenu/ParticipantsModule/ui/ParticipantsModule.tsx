import { Avatar, AvatarGroup, Tooltip } from '@chakra-ui/react';
import { MapParticipantsStore } from 'entities/map-participants';
import React from 'react';
import { MapInvisibleOverlay } from 'shared/uikit';
import { shallow } from 'zustand/shallow';

export function ParticipantsModule() {
	const { participants, participantsByHash } = MapParticipantsStore(
		(state) => ({
			participants: state.paricipantsList,
			participantsByHash: state.paricipantsByHash,
		}),
		shallow
	);

	const ParticipantsWidget = React.useMemo(() => {
		const pData = participants
			.map((pHash) => participantsByHash[pHash])
			.filter((item) => !!item);

		return (
			<AvatarGroup size="md" max={3}>
				{pData.map((participant) => {
					return (
						<Tooltip
							hasArrow
							label={participant.name}
							key={participant.hash}
							bg="gray.300"
							color="black"
							placement="auto"
						>
							<Avatar
								name={participant.name}
								shadow="base"
								{...(participant.avatar && { src: participant.avatar })}
							/>
						</Tooltip>
					);
				})}
			</AvatarGroup>
		);
	}, [participants, participantsByHash]);

	return (
		<MapInvisibleOverlay top={4} left={4}>
			{ParticipantsWidget}
		</MapInvisibleOverlay>
	);
}
