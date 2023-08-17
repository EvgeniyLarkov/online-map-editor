import React from 'react';
import { MenuItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SessionStore } from 'entities/session';
import { UserStore } from 'entities/user';

export function MenuLogoutListItem() {
	const { t } = useTranslation();

	const dropUserSession = SessionStore((session) => session.clear);
	const dropUserData = UserStore((user) => user.clear);

	const handleLogoutUser = () => {
		dropUserData();
		dropUserSession();
	};

	return <MenuItem onClick={handleLogoutUser}>{t('menu.logout')}</MenuItem>;
}
