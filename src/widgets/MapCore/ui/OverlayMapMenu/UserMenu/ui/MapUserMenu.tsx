import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { SessionStorage } from 'entities/session';
import { useUserStore } from 'entities/user';
import { LoginForm } from 'features/authentication/login';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseModal } from 'shared/uikit';
import { HeaderUserActionsMenu } from './OverlayUserActionsMenu';

export function MapUserMenu() {
	const { t } = useTranslation();

	const [modalOpen, setModalOpen] = useState(false);
	const { firstName, lastName } = useUserStore((user) => ({
		firstName: user.firstName,
		lastName: user.lastName,
	}));
	const hasSession = SessionStorage((session) => session.isAuthorized);

	const onLoginClick = () => {
		setModalOpen(true);
	};

	const onModalClose = () => {
		setModalOpen(false);
	};

	const onSuccessLogin = () => {
		setModalOpen(false);
	};

	return (
		<>
			<Box
				pos="fixed"
				right={4}
				top={4}
				bg="gray.100"
				borderRadius={4}
				py={4}
				px={8}
				display="flex"
				alignItems="center"
				gap="1rem"
				shadow="dark-lg"
				sx={{ 'z-index': 'var(--map-overlay-menu-z)' }}
			>
				{hasSession ? (
					<Flex gap={4} alignItems="center">
						<Text>
							{t('header.greeting')} {firstName} {lastName}
						</Text>
						<HeaderUserActionsMenu />
					</Flex>
				) : (
					<Button colorScheme="messenger" onClick={onLoginClick}>
						{t('header.login')}
					</Button>
				)}
			</Box>
			<BaseModal
				header={t('login.login')}
				isOpen={modalOpen}
				onClose={onModalClose}
			>
				<LoginForm successCallback={onSuccessLogin} />
			</BaseModal>
		</>
	);
}
