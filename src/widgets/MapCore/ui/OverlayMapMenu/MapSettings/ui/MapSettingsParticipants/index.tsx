import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Popover,
	PopoverTrigger,
	Portal,
	Text,
} from '@chakra-ui/react';
import { MapParticipant, mapParticipantTypes } from 'entities/map-participant';
import { MapParticipantsStore } from 'entities/map-participants';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
import { MapSettingsParticipantEditPopover } from './MapSettingsParticipantEditPopover';

export function MapSettingsParticipants({
	editorType,
	canChangeParticipants,
	canBanParticipants,
	canInviteParticipants,
	canChangeParticipantsPermissions,
}: {
	editorType: mapParticipantTypes | null;
	canChangeParticipants: boolean;
	canBanParticipants: boolean;
	canInviteParticipants: boolean;
	canChangeParticipantsPermissions: boolean;
}) {
	const { t } = useTranslation();
	const ref = React.useRef<HTMLElement | null>(null);
	const { participants, participantsByHash } = MapParticipantsStore(
		(state) => ({
			participants: state.paricipantsList,
			participantsByHash: state.paricipantsByHash,
		}),
		shallow
	);

	React.useEffect(() => {
		const element = document.getElementById('chakra-modal-ome-map-menu'); // TO-DO. Hack, use forwardRef instead
		ref.current = element;
	}, []);

	const getParticiapantCard = React.useCallback(
		(participant: MapParticipant) => {
			return (
				<Box position="relative" key={participant.hash}>
					<Popover placement="right-start">
						<PopoverTrigger>
							<Button
								px={0}
								py={0}
								colorScheme="blackAlpha"
								variant="ghost"
								rounded="md"
								position="absolute"
								h="100%"
								top={0}
								left={0}
								bottom={0}
								right={0}
								borderLeftRadius="2xl"
							/>
						</PopoverTrigger>
						<Portal containerRef={ref}>
							<MapSettingsParticipantEditPopover
								participant={participant}
								editorType={editorType}
								canChangeParticipants={canChangeParticipants}
								canChangeParticipantsPermissions={
									canChangeParticipantsPermissions
								}
								canBanParticipants={canBanParticipants}
							/>
						</Portal>
					</Popover>

					<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
						<Avatar
							name={participant.name}
							{...(participant.avatar && {
								src: participant.avatar,
								backgroundColor: 'white',
							})}
						/>

						<Box>
							<Heading size="sm">{participant.name}</Heading>
							<Text>{t(`maps.participant.type.${participant.type}`)}</Text>
						</Box>
					</Flex>
				</Box>
			);
		},
		[t]
	);

	const participantsList = React.useMemo(() => {
		const participantsByType = participants
			.map((pHash) => participantsByHash[pHash])
			.sort((a, b) => b.type - a.type);

		return participantsByType.map((item) => getParticiapantCard(item));
	}, [participants, participantsByHash, getParticiapantCard]);

	return (
		<Flex direction="column" gap={6} align="stretch" justify="stretch">
			{participantsList}
		</Flex>
	);
}
