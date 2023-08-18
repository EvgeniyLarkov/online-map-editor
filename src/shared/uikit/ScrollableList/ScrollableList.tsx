import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { RequestAdditionalOptions } from 'shared/api/types';
import { IPaginationOptions } from 'shared/types';

type ScrollableList<T> = {
	fetchFunction: (
		options: IPaginationOptions,
		additionalOptions: RequestAdditionalOptions
	) => Promise<T>;
	onFetch: (data: T) => number;
	items: React.ReactNode[];
	page?: number;
	limit?: number;
	noResultsPlaceholder?: React.ReactNode | string;
	scrollThreeshold?: number;
};

export function ScrollableList<T>(data: ScrollableList<T>) {
	const { fetchFunction, onFetch, page, limit, scrollThreeshold, items } = data;

	const [scrollThs] = useState(
		typeof scrollThreeshold !== 'undefined' ? scrollThreeshold : 100
	);
	const [isLimitReached, setLimitReached] = useState(false);
	const [fetchingInProgress, setFetchingInProgress] = useState(false);
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
				const resultsLength = onFetch(result);

				if (resultsLength < currentLimit) {
					setLimitReached(true);
				} else {
					setCurrentPage(currentPage + 1);
					setLimitReached(false);
				}
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
			{...items}
		</Flex>
	);
}

ScrollableList.whyDidYouRender = true;
