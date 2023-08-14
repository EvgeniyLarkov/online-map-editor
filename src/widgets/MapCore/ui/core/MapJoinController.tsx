import { Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useMapStore } from 'entities/map';
import React from 'react';
import { MAP_EVENTS, connectToMapLogined, useEmit } from 'widgets/MapCore/api';
import {
	useMapParticipantStore,
	useMapPermissionsStore,
} from 'widgets/MapCore/model';
import { UnifiedError } from 'shared/stores/errors';
import { transformOMEError } from 'shared/common/transformOMEError';
import { useTranslation } from 'react-i18next';
import { MapCore } from './MapCore';
import { useMapJoinControllerReciever } from './useMapJoinControllerReciever';

export function MapJoinController({ mapHash }: { mapHash: string }) {
	const sendEvent = useEmit();
	const { t } = useTranslation();
	const [loading, setLoading] = React.useState(true);
	const [errorReason, setErrorReason] = React.useState<null | string>(null);

	const { setMapData } = useMapStore((mapData) => ({
		setMapData: mapData.update,
	}));

	const { canView, setPermissions } = useMapPermissionsStore((store) => ({
		canView: store.view,
		setPermissions: store.set,
	}));

	const { setParticipant } = useMapParticipantStore((store) => ({
		setParticipant: store.set,
	}));

	useMapJoinControllerReciever();

	React.useEffect(() => {
		setLoading(true);

		const fetchPromise = connectToMapLogined(mapHash);
		fetchPromise
			.then((res) => {
				const { permissions, map, participant } = res.data;

				setMapData(map);
				setPermissions(permissions);
				setParticipant(participant);

				return res.data;
			})
			.then((res) => {
				const participantCanView = res.permissions.view;

				if (participantCanView) {
					sendEvent(MAP_EVENTS.join_map, mapHash);
				} else {
					setLoading(false);
				}
				return res;
			})
			.catch((err: UnifiedError) => {
				console.log(err);
				const error = transformOMEError(err);
				console.log(error);
				setErrorReason(
					error.type === 'default'
						? t('errors.description.default')
						: error.message
				);
			})
			.finally(() => {
				setLoading(false);
			});

		return () => {
			fetchPromise.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapHash]);

	if (loading) {
		return (
			<Center bg="gray.100" h="100vh">
				<Flex direction="column" gap={2} align="center" justify="center">
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
