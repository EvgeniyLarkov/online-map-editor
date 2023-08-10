/* eslint-disable react/jsx-props-no-spreading */
import { Box, HTMLChakraProps } from '@chakra-ui/react';
import React from 'react';

export function MapOverlayBox({
	children,
	...rest
}: HTMLChakraProps<'div'> & React.PropsWithChildren) {
	return (
		<Box
			pos="fixed"
			bg="gray.100"
			borderRadius={4}
			py={4}
			px={8}
			display="flex"
			alignItems="center"
			gap="1rem"
			shadow="dark-lg"
			sx={{ 'z-index': 'var(--map-overlay-menu-z)' }}
			{...rest}
		>
			{children}
		</Box>
	);
}
