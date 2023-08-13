import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { useMapStore } from 'entities/map';
import { MapAction } from 'entities/map-actions/model/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popup } from 'react-leaflet';
import { useEmit } from 'widgets/MapCore/api';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';

export function ActionMenu({
	action,
}: { action: MapAction } & React.PropsWithChildren) {
	const { t } = useTranslation();
	const sendEvent = useEmit();
	const { mapHash } = useMapStore((mapData) => ({
		mapHash: mapData.hash,
	}));

	const onDropClick = () => {
		sendEvent(MAP_EVENTS.drop_action, mapHash || '', {
			hash: action.hash,
		});
	};

	const actionDescription = React.useMemo(() => {
		const result = {
			name: t(`maps.actions.names.${action.type}`),
			description: t(`maps.actions.description_placeholder`),
		};

		if (!action.data) {
			result.name = t(`maps.actions.names.${action.type}`);
			result.description = t(`maps.actions.description_placeholder`);
		} else {
			result.name =
				typeof action.data.name === 'string' ? action.data.name : result.name;
			result.description =
				typeof action.data.description === 'string'
					? action.data.description
					: result.description;
		}

		return result;
	}, [action, t]);

	return (
		<Popup>
			<Flex w="200px" direction="column">
				<Heading size="md" mx="0">
					{actionDescription.name}
				</Heading>
				<Text>{actionDescription.description}</Text>
				<Flex gap={1} justifyContent="flex-end">
					<Tooltip hasArrow label={t('maps.actions.tips.edit')} placement="top">
						<IconButton
							aria-label={t('maps.actions.tips.edit')}
							icon={<EditIcon />}
						/>
					</Tooltip>
					<Tooltip hasArrow label={t('maps.actions.tips.drop')} placement="top">
						<IconButton
							aria-label={t('maps.actions.tips.drop')}
							icon={<DeleteIcon />}
							onClick={onDropClick}
						/>
					</Tooltip>
				</Flex>
			</Flex>
		</Popup>
	);
}
