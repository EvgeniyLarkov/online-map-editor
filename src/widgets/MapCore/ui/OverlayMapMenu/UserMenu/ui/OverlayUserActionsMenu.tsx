import React from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MenuLogoutListItem } from 'features/authentication/logout';
import { HamburgerIcon } from '@chakra-ui/icons';
import { UserMapsList } from 'features/map/view';
import { BaseModal } from 'shared/uikit';
import { CreateMapForm } from 'features/map/view/CreateMap';

export function HeaderUserActionsMenu() {
	const { t } = useTranslation();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [modalOpen, setModalOpen] = React.useState(false);

	const onCreateMapClick = () => {
		setModalOpen(true);
	};

	const onModalClose = () => {
		setModalOpen(false);
	};

	const onSuccessMapCreation = () => {
		setModalOpen(false);
	};

	return (
		<>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Header Menu"
					icon={<HamburgerIcon />}
					variant="outline"
				/>
				<MenuList>
					<MenuItem onClick={onCreateMapClick}>{t('menu.mapCreate')}</MenuItem>
					<MenuItem onClick={onOpen}>{t('menu.mapsList')}</MenuItem>
					<MenuLogoutListItem />
				</MenuList>
			</Menu>
			<Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						{t('maps.list.header')}
					</DrawerHeader>
					<DrawerBody>
						<UserMapsList />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<BaseModal
				header={t('maps.create.header')}
				isOpen={modalOpen}
				onClose={onModalClose}
			>
				<CreateMapForm successCallback={onSuccessMapCreation} />
			</BaseModal>
		</>
	);
}
