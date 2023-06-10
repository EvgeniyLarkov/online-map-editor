import { Box, Button } from '@chakra-ui/react';
import { LoginForm } from 'features/authentication/login';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseModal } from 'shared/uikit';

export function MainOverlayMapMenu() {
	const { t } = useTranslation();

	const [modalOpen, setModalOpen] = useState(false);

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
				<Button colorScheme="messenger" onClick={onLoginClick}>
					{t('login.login')}
				</Button>
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
