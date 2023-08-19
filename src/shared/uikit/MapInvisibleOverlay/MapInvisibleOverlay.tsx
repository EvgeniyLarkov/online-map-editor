/* eslint-disable react/jsx-props-no-spreading */
import { Box, HTMLChakraProps } from '@chakra-ui/react';
import React from 'react';

export function MapInvisibleOverlay({
	children,
	...rest
}: HTMLChakraProps<'div'> & React.PropsWithChildren) {
	return (
		<Box pos="fixed" sx={{ 'z-index': 'var(--map-overlay-menu-z)' }} {...rest}>
			{children}
		</Box>
	);
}
