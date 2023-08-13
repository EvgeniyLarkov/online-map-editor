import { ReactIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import {
	MAP_ACTION_TYPES,
	mapActionTypes,
} from 'entities/map-actions/model/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapOverlayBox } from 'shared/uikit';
import { MAP_UI_MODE, useMapUIStore } from 'widgets/MapCore/model';

export function ActionsMenu() {
	const { t } = useTranslation();
	const { selectedMode, selectedAction, changeMode, selectAction } =
		useMapUIStore((state) => ({
			selectedMode: state.mode,
			selectedAction: state.selectedAction,
			changeMode: state.changeMode,
			selectAction: state.selectAction,
		}));

	const onChangeActionClick = React.useCallback(
		(actionType: mapActionTypes) => () => {
			if (selectedMode !== MAP_UI_MODE.action_select) {
				changeMode(MAP_UI_MODE.action_select);
			}
			if (selectedAction === actionType) {
				changeMode(MAP_UI_MODE.intial);
				selectAction(null);
			} else {
				selectAction(actionType);
			}
		},
		[selectedMode, selectedAction, changeMode, selectAction]
	);

	return (
		<MapOverlayBox left={0} right={0} margin="auto" top={4} width="fit-content">
			<Flex gap={2}>
				<IconButton
					aria-label={t('maps.actions.tips.drop')}
					icon={<ReactIcon />}
					size="lg"
					colorScheme={
						selectedAction === MAP_ACTION_TYPES.marker ? 'blue' : 'teal'
					}
					onClick={onChangeActionClick(MAP_ACTION_TYPES.marker)}
				/>
			</Flex>
		</MapOverlayBox>
	);
}
