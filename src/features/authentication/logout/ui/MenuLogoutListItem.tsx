import React from 'react';
import { MenuItem, MenuList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSession } from 'entities/session';
import { useUserStore } from 'entities/user';

export function MenuLogoutListItem() {
	const { t } = useTranslation();

	const dropUserSession = useSession((session) => session.clear);
	const dropUserData = useUserStore((user) => user.clear);

	const handleLogoutUser = () => {
		dropUserData();
		dropUserSession();
	};

	return (
		<MenuList>
			<MenuItem onClick={handleLogoutUser}>{t('menu.logout')}</MenuItem>
		</MenuList>
	);
}
