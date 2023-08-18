import { Box, Flex, Grid, Heading, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { ScrollableList } from 'shared/uikit';
import { OMEMap, dropMapLogined, dropMapUnlogined } from 'entities/map/index';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { SessionStore } from 'entities/session';
import { IoClose, IoTrashBinOutline } from 'react-icons/io5';
import { getMapsList } from '../model';

export function UserMapsList() {
	const { t } = useTranslation();
	const [mapsList, setListMaps] = React.useState<
		(OMEMap & { deleting?: boolean })[]
	>([]);

	const logined = SessionStore((session) => session.isAuthorized);

	const onDropMap = React.useCallback(
		(mapHash: string) => () => {
			setListMaps((state) =>
				state.map((map) => {
					return map.hash === mapHash ? { ...map, deleting: true } : map;
				})
			);

			const request = logined
				? dropMapLogined(mapHash)
				: dropMapUnlogined(mapHash);

			request
				.then((res) => {
					const result = res.data;

					if (result) {
						setListMaps((state) => state.filter((map) => map.hash !== mapHash));
					} else {
						return Promise.reject(); // В catch передаем
					}

					return res;
				})
				.catch(() => {
					setListMaps((state) =>
						state.map((map) => {
							return map.hash === mapHash ? { ...map, deleting: false } : map;
						})
					);
				});
		},

		[logined]
	);

	const transformResults = React.useCallback((data: Array<OMEMap>) => {
		setListMaps((state) => [...state, ...data]);

		return data.length;
	}, []);

	const MapItems = React.useMemo(() => {
		return mapsList.map((map) => {
			return (
				<Flex px={4} py={2} flexDir="column" key={map.hash}>
					<Flex gap={2} justify="space-between" align="center">
						<Heading
							as={Link}
							overflow="hidden"
							to={`/map/${map.hash}`}
							flex={1}
						>
							{map.name}
						</Heading>
						<IconButton
							aria-label="Drop map"
							size="sm"
							isLoading={map.deleting}
							icon={<IoClose size="16px" />}
							onClick={onDropMap(map.hash)}
						/>
					</Flex>
					<Flex gap={2} flexDir="column">
						<Grid templateColumns="repeat(2, 1fr)" gap={2}>
							<Text fontWeight={500}>{t('maps.listItem.author')}</Text>
							<Text>
								{map.creator.firstName} {map.creator.lastName}
							</Text>
						</Grid>
						<Grid templateColumns="repeat(2, 1fr)" gap={2}>
							<Text fontWeight={500}>{t('maps.listItem.creationdate')}</Text>
							<Text>{format(new Date(map.createdAt), 'dd LLL yy HH:mm')}</Text>
						</Grid>
					</Flex>
				</Flex>
			);
		});
	}, [mapsList, t, onDropMap]);

	return (
		<Box height="100%" overflow="hidden">
			<ScrollableList
				fetchFunction={getMapsList}
				onFetch={transformResults}
				items={MapItems}
			/>
		</Box>
	);
}
