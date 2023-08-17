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
import { IoMapOutline, IoSettingsOutline } from 'react-icons/io5';
import { useMapPermissionsStore } from 'widgets/MapCore/model';
import { MapSettingsIconButton } from './MapSettingsIconButton';
import {
	MAP_SETTINGS_MENU_CATEGORIES,
	mapSettingsMenuCategoriesTypes,
} from '../types';
import { MapSettingsUIStore } from '../model';
import { MapSettingsMapForm } from './MapSettingsMap';
import { MapSettingsDefaultForm } from './MapSettingsDefault';

export function MapSettingsSidemenu() {
	const { t } = useTranslation();
	const { category, opened, close, open } = MapSettingsUIStore((state) => ({
		category: state.category,
		opened: state.opened,
		close: state.close,
		open: state.open,
	}));

	const { canChangeMapDescription, canChangeMapProperties } =
		useMapPermissionsStore((state) => ({
			canChangeMapProperties: state.change_map_properties,
			canChangeMapDescription: state.change_map_description,
		}));

	const setCategoryHandler = React.useCallback(
		(cat: mapSettingsMenuCategoriesTypes) => () => {
			open(cat);
		},
		[open]
	);

	return (
		<Drawer placement="left" size="md" onClose={close} isOpen={opened}>
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
						</Flex>
						<Box h="100%" flex={1} p={4}>
							{category === MAP_SETTINGS_MENU_CATEGORIES.default && (
								<MapSettingsDefaultForm />
							)}
							{category === MAP_SETTINGS_MENU_CATEGORIES.map && (
								<MapSettingsMapForm
									canChangeProperties={!!canChangeMapProperties}
								/>
							)}
						</Box>
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}
