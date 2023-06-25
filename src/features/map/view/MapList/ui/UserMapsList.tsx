import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ScrollableList } from 'shared/uikit';
import { OMEMap } from 'entities/map/index';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getMapsList } from '../model';

export function UserMapsList() {
	const { t } = useTranslation();

	const transformResults = React.useCallback((data: Array<OMEMap>) => {
		return data.map((map) => {
			return (
				<Flex px={4} py={2} flexDir="column" key={map.hash}>
					<Heading as={Link} overflow="hidden" to={`/map/${map.hash}`}>
						{map.name}
					</Heading>
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
	}, []);

	return (
		<Box height="100%" overflow="hidden">
			<ScrollableList
				fetchFunction={getMapsList}
				transformResults={transformResults}
			/>
		</Box>
	);
}
