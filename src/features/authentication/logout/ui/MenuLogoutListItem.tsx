import React from 'react';
import { MenuItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SessionStorage } from 'entities/session';
import { useUserStore } from 'entities/user';

export function MenuLogoutListItem() {
	const { t } = useTranslation();

	const dropUserSession = SessionStorage((session) => session.clear);
	const dropUserData = useUserStore((user) => user.clear);

	const handleLogoutUser = () => {
		dropUserData();
		dropUserSession();
	};

	return <MenuItem onClick={handleLogoutUser}>{t('menu.logout')}</MenuItem>;
}
