import React from 'react';
import { IconButton, Menu, MenuButton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MenuLogoutListItem } from 'features/authentication/logout';
import { HamburgerIcon } from '@chakra-ui/icons';

export function HeaderUserActionsMenu() {
	const { t } = useTranslation();

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Header Menu"
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<MenuLogoutListItem />
		</Menu>
	);
}
