import {
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	Select,
	Text,
} from '@chakra-ui/react';
import {
	MAP_PARTICIPANT_STATUS,
	MAP_PARTICIPANT_TYPE,
	MapParticipant,
	mapParticipantTypes,
} from 'entities/map-participant';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function MapSettingsParticipantEditPopover({
	participant,
	canChangeParticipants,
	canChangeParticipantsPermissions,
	editorType,
	canBanParticipants,
}: {
	participant: MapParticipant;
	canChangeParticipants: boolean;
	canBanParticipants: boolean;
	canChangeParticipantsPermissions: boolean;
	editorType: mapParticipantTypes | null;
}) {
	const { t } = useTranslation();

	const availableSetTypes = editorType
		? Object.values(MAP_PARTICIPANT_TYPE).filter((type) => editorType > type)
		: [];

	const canSetTypeOfThisParticipant =
		canChangeParticipantsPermissions &&
		availableSetTypes.length > 1 &&
		editorType &&
		participant.type < editorType;

	return (
		<PopoverContent>
			<PopoverArrow />
			<PopoverHeader>
				<Flex align="center" justify="space-between">
					<Heading size="sm">{participant.name}</Heading>
					<Text>{participant.participantHash}</Text>
				</Flex>
			</PopoverHeader>
			<PopoverBody>
				<Grid templateColumns="repeat(2, 1fr)" gap={2}>
					<GridItem w="100%">
						<Text>{t('maps.settings.participants.logined')}</Text>
					</GridItem>
					<GridItem w="100%">
						<Text>
							{participant.userHash ? t(`templates.yes`) : t('templates.no')}
						</Text>
					</GridItem>
					<GridItem w="100%">
						<Text>{t('maps.settings.participants.type')}</Text>
					</GridItem>
					<GridItem w="100%">
						{canSetTypeOfThisParticipant ? (
							<Select variant="flushed">
								{availableSetTypes.map((item) => {
									return (
										<option value={item} selected={participant.type === item}>
											{t(`maps.participant.type.${item}`)}
										</option>
									);
								})}
							</Select>
						) : (
							<Text>{t(`maps.participant.type.${participant.type}`)}</Text>
						)}
					</GridItem>
					<GridItem w="100%">
						<Text>{t('maps.settings.participants.status')}</Text>
					</GridItem>
					<GridItem w="100%">
						<Text>{t(`maps.participant.status.${participant.status}`)}</Text>
					</GridItem>
				</Grid>
				{canBanParticipants && (
					<Flex align="center" justify="space-between" mt={4}>
						{participant.status === MAP_PARTICIPANT_STATUS.banned ? (
							<Button size="sm" colorScheme="green">
								{t('maps.participants.actions.unban')}
							</Button>
						) : (
							<Button size="sm" colorScheme="red">
								{t('maps.settings.participants.actions.ban')}
							</Button>
						)}
					</Flex>
				)}
			</PopoverBody>
		</PopoverContent>
	);
}
