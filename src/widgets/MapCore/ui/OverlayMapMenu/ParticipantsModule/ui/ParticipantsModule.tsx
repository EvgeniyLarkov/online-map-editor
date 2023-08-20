import { Avatar, AvatarGroup, Button } from '@chakra-ui/react';
import { MapParticipantsStore } from 'entities/map-participants';
import React from 'react';
import { MapInvisibleOverlay } from 'shared/uikit';
import { shallow } from 'zustand/shallow';
import {
	MAP_SETTINGS_MENU_CATEGORIES,
	MapSettingsUIStore,
} from '../../MapSettings';

export function ParticipantsModule() {
	const { participants, participantsByHash } = MapParticipantsStore(
		(state) => ({
			participants: state.paricipantsList,
			participantsByHash: state.paricipantsByHash,
		}),
		shallow
	);

	const openParticipantsMenu = MapSettingsUIStore((state) => state.open);

	const onParticipantsClick = React.useCallback(() => {
		openParticipantsMenu(MAP_SETTINGS_MENU_CATEGORIES.participants);
	}, [openParticipantsMenu]);

	const ParticipantsWidget = React.useMemo(() => {
		const pData = participants
			.map((pHash) => participantsByHash[pHash])
			.filter((item) => !!item);

		return (
			<AvatarGroup size="md" max={3} spacing={-5}>
				{pData.map((participant) => {
					return (
						<Avatar
							name={participant.name}
							shadow="base"
							key={participant.hash}
							{...(participant.avatar && {
								src: participant.avatar,
								backgroundColor: 'white',
							})}
						/>
						// <Tooltip
						// 	hasArrow
						// 	label={participant.name}
						// 	key={participant.hash}
						// 	bg="gray.300"
						// 	color="black"
						// 	placement="auto"
						// >
						// 	<Avatar
						// 		name={participant.name}
						// 		shadow="base"
						// 		{...(participant.avatar && { src: participant.avatar })}
						// 	/>
						// </Tooltip>
					);
				})}
			</AvatarGroup>
		);
	}, [participants, participantsByHash]);

	return (
		<MapInvisibleOverlay top={4} left={4}>
			<Button
				px={1}
				py={7}
				colorScheme="blackAlpha"
				variant="ghost"
				rounded="3xl"
				onClick={onParticipantsClick}
			>
				{ParticipantsWidget}
			</Button>
		</MapInvisibleOverlay>
	);
}
