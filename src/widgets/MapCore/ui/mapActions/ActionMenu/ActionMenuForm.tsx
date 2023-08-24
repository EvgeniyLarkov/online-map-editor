import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
	Flex,
	Grid,
	GridItem,
	Heading,
	IconButton,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { MapAction, isActionPolygone } from 'entities/map-actions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { calcArea } from 'shared/common/calcArea';
import { MapOverlayBox } from 'shared/uikit';
import { useEmit } from 'widgets/MapCore/api';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import L from 'leaflet';
import { m2ToKm2Str } from 'shared/common/areaUtils';

type ActionMenuData = {
	name: string;
	description: string;
	area?: string;
	length?: number;
};

export function ActionMenuForm({
	action,
	mapHash,
}: {
	action: MapAction;
	mapHash: string;
}) {
	const { t } = useTranslation();
	const sendEvent = useEmit();

	const onDropClick = () => {
		sendEvent(MAP_EVENTS.drop_action, mapHash || '', {
			hash: action.hash,
		});
	};

	const actionDescription = React.useMemo(() => {
		const result: ActionMenuData = {
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

			if (isActionPolygone(action)) {
				result.area = t('templates.area.km2', {
					num: m2ToKm2Str(calcArea(action.data.coordinates)),
				});
			}
		}

		return result;
	}, [action, t]);

	return (
		<MapOverlayBox right={4} top="200px">
			<Flex w="200px" direction="column">
				<Heading size="md" mx="0">
					{actionDescription.name}
				</Heading>
				<Text>{actionDescription.description}</Text>
				<Grid templateColumns="repeat(2, 1fr)" gap={2}>
					{actionDescription.area && (
						<>
							<GridItem w="100%">
								<Text>{t('maps.actions.area.label')}</Text>
							</GridItem>
							<GridItem w="100%">
								<Text>{actionDescription.area}</Text>
							</GridItem>
						</>
					)}
				</Grid>

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
		</MapOverlayBox>
	);
}
