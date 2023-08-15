import { Center } from '@chakra-ui/react';
import React from 'react';

export function ControllerPlaceholderScreen({ children }) {
	return (
		<Center bg="gray.100" h="100vh">
			{children}
		</Center>
	);
}
