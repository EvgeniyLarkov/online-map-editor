import { Center, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import { MapJoinController } from 'widgets/MapCore/ui/core/MapJoinController';

function MapPage() {
	const params = useParams();

	return params.hash ? (
		<MapJoinController mapHash={params.hash} />
	) : (
		<Center bg="gray.100" h="100vh">
			<Flex direction="column" gap={2}>
				<Heading as="h2" size="xl">
					Provide map hash
				</Heading>
			</Flex>
		</Center>
	);
}

export default MapPage;
