import { Flex } from '@chakra-ui/react';
import {
	MAP_ACTION_TYPES,
	mapActionTypes,
} from 'entities/map-actions/model/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapOverlayBox } from 'shared/uikit';
import { MAP_UI_MODE, useMapUIStore } from 'widgets/MapCore/model';
import {
	IoLocationOutline,
	IoSettingsOutline,
	IoSquareSharp,
} from 'react-icons/io5';
import { TbBackslash } from 'react-icons/tb';
import { ActionsMenuIcon } from './ActionMenuButton';
import { MapSettingsUIStore } from '../MapSettings';

export function ActionsMenu() {
	const { t } = useTranslation();
	const { selectedMode, selectedAction, changeMode, selectAction } =
		useMapUIStore((state) => ({
			selectedMode: state.mode,
			selectedAction: state.selectedAction,
			changeMode: state.changeMode,
			selectAction: state.selectAction,
		}));

	const { opened, open } = MapSettingsUIStore((state) => ({
		opened: state.opened,
		open: state.open,
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

	const onOpenSettingsMenu = React.useCallback(() => {
		open();
	}, [open]);

	return (
		<MapOverlayBox left={0} right={0} margin="auto" top={4} width="fit-content">
			<Flex gap={2}>
				<ActionsMenuIcon
					message={t(`maps.actions.names.${MAP_ACTION_TYPES.marker}`)}
					icon={<IoLocationOutline size="24px" />}
					selected={selectedAction === MAP_ACTION_TYPES.marker}
					onClick={onChangeActionClick(MAP_ACTION_TYPES.marker)}
				/>
				<ActionsMenuIcon
					message={t(`maps.actions.names.${MAP_ACTION_TYPES.polyline}`)}
					icon={<TbBackslash size="24px" />}
					selected={selectedAction === MAP_ACTION_TYPES.polyline}
					onClick={onChangeActionClick(MAP_ACTION_TYPES.polyline)}
				/>
				<ActionsMenuIcon
					message={t(`maps.actions.names.${MAP_ACTION_TYPES.polygone}`)}
					icon={<IoSquareSharp size="24px" />}
					selected={selectedAction === MAP_ACTION_TYPES.polygone}
					onClick={onChangeActionClick(MAP_ACTION_TYPES.polygone)}
				/>
				<ActionsMenuIcon
					message={t(`maps.settings.default.label`)}
					icon={<IoSettingsOutline size="24px" />}
					selected={opened}
					onClick={onOpenSettingsMenu}
				/>
			</Flex>
		</MapOverlayBox>
	);
}
