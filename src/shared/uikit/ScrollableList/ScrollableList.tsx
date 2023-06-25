import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { RequestAdditionalOptions } from 'shared/api/types';
import { IPaginationOptions } from 'shared/types';

type ScrollableList<T> = {
	fetchFunction: (
		options: IPaginationOptions,
		additionalOptions: RequestAdditionalOptions
	) => Promise<T>;
	transformResults: (data: T) => Array<React.ReactNode>;
	page?: number;
	limit?: number;
	noResultsPlaceholder?: React.ReactNode | string;
	scrollThreeshold?: number;
};

export function ScrollableList<T>(data: ScrollableList<T>) {
	const { fetchFunction, transformResults, page, limit, scrollThreeshold } =
		data;

	const [scrollThs] = useState(
		typeof scrollThreeshold !== 'undefined' ? scrollThreeshold : 100
	);
	const [isLimitReached, setLimitReached] = useState(false);
	const [fetchingInProgress, setFetchingInProgress] = useState(false);
	const [ListItems, setListItems] = useState<React.ReactNode[]>([]);
	// const listRef = useRef<HTMLDivElement>(null);

	const [currentPage, setCurrentPage] = useState(
		typeof page !== 'undefined' ? page : 1
	);
	const [currentLimit] = useState(typeof limit !== 'undefined' ? limit : 20);

	const fetchHandler = (abortController: AbortController) => {
		if (!isLimitReached && !fetchingInProgress) {
			setFetchingInProgress(true);

			fetchFunction(
				{
					page: currentPage,
					limit: currentLimit,
				},
				{
					abortController,
				}
			).then((result) => {
				setFetchingInProgress(false);
				const transformedResults = transformResults(result);

				const resultsLength = transformedResults.length;

				if (resultsLength < currentLimit) {
					setLimitReached(true);
				} else {
					setCurrentPage(currentPage + 1);
					setLimitReached(false);
				}

				setListItems([...ListItems, ...transformedResults]);
			});
		}
	};

	useEffect(() => {
		const abortController: AbortController = new AbortController();

		fetchHandler(abortController);

		return () => {
			abortController.abort();
		};
	}, []);

	const handleListScroll = (event: React.SyntheticEvent) => {
		const scrollEl = event.currentTarget;
		const scrollPos = scrollEl.scrollTop;

		const elHeight = scrollEl.clientHeight;
		const { scrollHeight } = scrollEl;

		const scrollOffset = scrollPos + elHeight + scrollThs;

		if (
			scrollHeight <= scrollOffset &&
			!fetchingInProgress &&
			!isLimitReached
		) {
			const abortController = new AbortController();
			fetchHandler(abortController);
		}
	};

	return (
		<Flex
			flexDirection="column"
			gap={4}
			height="100%"
			overflow="auto"
			onScroll={handleListScroll}
		>
			{...ListItems}
		</Flex>
	);
}

ScrollableList.whyDidYouRender = true;
