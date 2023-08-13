import { Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useMapStore } from 'entities/map';
import { getMapByHash } from 'features/map/core/GetMap';
import React from 'react';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { MAP_EVENTS, useEmit } from 'widgets/MapCore/api';
import { useMapPermissionsStore } from 'widgets/MapCore/model';
import { MapCore } from './MapCore';
import { useMapJoinControllerReciever } from './useMapJoinControllerReciever';

export function MapJoinController({ mapHash }: { mapHash: string }) {
	const sendEvent = useEmit();
	const [loading, setLoading] = React.useState(false);
	const [errorReason, setErrorReason] = React.useState<null | string>(null);

	const { setMapData } = useMapStore((mapData) => ({
		setMapData: mapData.update,
	}));

	const { canView } = useMapPermissionsStore((store) => ({
		canView: store.view,
	}));

	useMapJoinControllerReciever();

	React.useEffect(() => {
		setLoading(true);

		getMapByHash(mapHash || '')
			.then(
				(res) => {
					if (isSuccessRequest(res)) {
						setMapData(res);

						return res;
					}
					return false;
				},
				() => {
					return false;
				}
			)
			.then((res) => {
				if (res) {
					sendEvent(MAP_EVENTS.join_map, mapHash);
				}
			})
			.finally(() => {
				setLoading(false);
			});

		return () => {
			if (mapHash) {
				sendEvent(MAP_EVENTS.leave_map, mapHash);
			}
		};
	}, [mapHash, setMapData, sendEvent]);

	if (loading) {
		return (
			<Center bg="gray.100" h="100vh">
				<Flex direction="column" gap={2}>
					<Heading as="h2" size="xl">
						Loading map data
					</Heading>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				</Flex>
			</Center>
		);
	}

	if (errorReason) {
		return (
			<Center bg="gray.100" h="100vh">
				<Flex direction="column" gap={2}>
					<Heading as="h2" size="xl">
						{errorReason}
					</Heading>
				</Flex>
			</Center>
		);
	}

	if (canView === false) {
		return (
			<Center bg="gray.100" h="100vh">
				<Flex direction="column" gap={2}>
					<Heading as="h2" size="xl">
						You are not allowed to view this map
					</Heading>
				</Flex>
			</Center>
		);
	}

	return <MapCore />;
}