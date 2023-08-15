import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { ControllerPlaceholderScreen } from './ControllerPlaceholderScreen';

export function ControllerWarnScreen({ message }: { message: string }) {
	return (
		<ControllerPlaceholderScreen>
			<Flex direction="column" gap={4} align="center" justify="center">
				<WarningTwoIcon h={16} w={16} color="orange.500" />
				<Heading as="h2" size="xl">
					{message}
				</Heading>
			</Flex>
		</ControllerPlaceholderScreen>
	);
}
