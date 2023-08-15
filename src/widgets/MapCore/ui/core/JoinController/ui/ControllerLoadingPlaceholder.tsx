import React from 'react';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ControllerPlaceholderScreen } from './ControllerPlaceholderScreen';

export function ControllerLoadingScreen() {
	const { t } = useTranslation();

	return (
		<ControllerPlaceholderScreen>
			<Flex direction="column" gap={2} align="center" justify="center">
				<Heading as="h2" size="xl">
					{t('maps.join.loading')}
				</Heading>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</Flex>
		</ControllerPlaceholderScreen>
	);
}
