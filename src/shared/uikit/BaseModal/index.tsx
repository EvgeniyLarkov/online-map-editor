import React from 'react';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

type BaseModalInterface = {
	header: React.ReactNode | string | number;
	onClose?: () => void;
	onOpen?: () => void;
	isOpen: boolean;
};

export function BaseModal(props: React.PropsWithChildren<BaseModalInterface>) {
	const { header, children, isOpen, onOpen, onClose } = props;
	const finalRef = React.useRef(null);

	const onModalClose = () => {
		if (typeof onClose !== 'undefined') {
			onClose();
		}
	};

	return (
		<Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onModalClose}>
			<ModalOverlay />
			<ModalContent pb={4}>
				<ModalHeader>{header}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
}
