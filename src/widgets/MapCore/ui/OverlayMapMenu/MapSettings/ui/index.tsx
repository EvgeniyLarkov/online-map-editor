import {
	Box,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	IoMapOutline,
	IoPeopleOutline,
	IoSettingsOutline,
} from 'react-icons/io5';
import { MapParticipantPermissionsStore } from 'entities/map-participant-permissions';
import { MapParticipantStore } from 'entities/map-participant';
import { MapSettingsIconButton } from './MapSettingsIconButton';
import {
	MAP_SETTINGS_MENU_CATEGORIES,
	mapSettingsMenuCategoriesTypes,
} from '../types';
import { MapSettingsUIStore } from '../model';
import { MapSettingsMapForm } from './MapSettingsMap';
import { MapSettingsDefaultForm } from './MapSettingsDefault';
import { MapSettingsParticipants } from './MapSettingsParticipants';

export function MapSettingsSidemenu() {
	const { t } = useTranslation();
	const { category, opened, close, open } = MapSettingsUIStore((state) => ({
		category: state.category,
		opened: state.opened,
		close: state.close,
		open: state.open,
	}));

	const {
		canChangeMapDescription,
		canChangeMapProperties,
		canChangeParticipants,
		canBanParticipants,
		canInviteParticipants,
		canChangeParticipantsPermissions,
	} = MapParticipantPermissionsStore((state) => ({
		canChangeMapProperties: !!state.change_map_properties,
		canChangeMapDescription: !!state.change_map_description,
		canChangeParticipants: !!state.modify_participants,
		canBanParticipants: !!state.ban_participants,
		canInviteParticipants: !!state.invite_participants,
		canChangeParticipantsPermissions: !!state.set_permissions,
	}));

	const { editorType } = MapParticipantStore((state) => ({
		editorType: state.type,
	}));

	const setCategoryHandler = React.useCallback(
		(cat: mapSettingsMenuCategoriesTypes) => () => {
			open(cat);
		},
		[open]
	);

	return (
		<Drawer
			placement="left"
			size="md"
			onClose={close}
			isOpen={opened}
			id="ome-map-menu"
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader borderBottomWidth="1px">
					{t(`maps.settings.${category}.label`)}
				</DrawerHeader>
				<DrawerBody>
					<Flex align="stretch" justify="stretch" height="100%">
						<Flex
							direction="column"
							gap={2}
							borderRightWidth="1px"
							borderRightColor="gray.200"
							paddingRight={4}
							shrink={0}
						>
							<MapSettingsIconButton
								selected={category === MAP_SETTINGS_MENU_CATEGORIES.default}
								message={t(
									`maps.settings.${MAP_SETTINGS_MENU_CATEGORIES.default}.label`
								)}
								icon={<IoSettingsOutline size="24px" />}
								onClick={setCategoryHandler(
									MAP_SETTINGS_MENU_CATEGORIES.default
								)}
							/>
							{(canChangeMapDescription || canChangeMapProperties) && (
								<MapSettingsIconButton
									selected={category === MAP_SETTINGS_MENU_CATEGORIES.map}
									message={t(
										`maps.settings.${MAP_SETTINGS_MENU_CATEGORIES.map}.label`
									)}
									icon={<IoMapOutline size="24px" />}
									onClick={setCategoryHandler(MAP_SETTINGS_MENU_CATEGORIES.map)}
								/>
							)}
							<MapSettingsIconButton
								selected={
									category === MAP_SETTINGS_MENU_CATEGORIES.participants
								}
								message={t(
									`maps.settings.${MAP_SETTINGS_MENU_CATEGORIES.participants}.label`
								)}
								icon={<IoPeopleOutline size="24px" />}
								onClick={setCategoryHandler(
									MAP_SETTINGS_MENU_CATEGORIES.participants
								)}
							/>
						</Flex>
						<Box h="100%" flex={1} p={4}>
							{category === MAP_SETTINGS_MENU_CATEGORIES.default && (
								<MapSettingsDefaultForm />
							)}
							{category === MAP_SETTINGS_MENU_CATEGORIES.map && (
								<MapSettingsMapForm
									canChangeProperties={canChangeMapProperties}
								/>
							)}
							{category === MAP_SETTINGS_MENU_CATEGORIES.participants && (
								<MapSettingsParticipants
									editorType={editorType}
									canChangeParticipants={canChangeParticipants}
									canBanParticipants={canBanParticipants}
									canInviteParticipants={canInviteParticipants}
									canChangeParticipantsPermissions={
										canChangeParticipantsPermissions
									}
								/>
							)}
						</Box>
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}
