import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Flex,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { errorsStore } from 'shared/stores/errors';
import { MapOverlayBox } from 'shared/uikit';
import { shallow } from 'zustand/shallow';

export function NotificationsModule() {
	const { t } = useTranslation();
	const [activeErrors, setActiveErrors] = useState<string[]>([]);
	const [expiredErrors, setExpiredErrors] = useState<Record<string, boolean>>(
		{}
	);
	const EXPIRE_TIMEOUT = 5000;

	const { errorsList, errorsById } = errorsStore(
		(state) => ({
			errorsList: state.errorsList,
			errorsById: state.errorsById,
		}),
		shallow
	);

	console.log(errorsById);

	const newErrorsList = useMemo(() => {
		return errorsList.filter(
			(errorHash) =>
				!expiredErrors[errorHash] && !activeErrors.includes(errorHash)
		);
	}, [errorsList]);

	useEffect(() => {
		setActiveErrors((state) => [...state, ...newErrorsList]);

		const timeoutId = setTimeout(() => {
			const expiredHashes: Record<string, boolean> = newErrorsList.reduce(
				(acc, item) => ({ ...acc, [item]: true }),
				{}
			);

			setExpiredErrors((items) => ({ ...items, ...expiredHashes }));
			setActiveErrors((items) => items.filter((item) => !expiredHashes[item]));
		}, EXPIRE_TIMEOUT);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [newErrorsList]);

	const errorsElements = useMemo(() => {
		return activeErrors.map((key) => {
			return errorsById[key] || null;
		});
	}, [activeErrors]); // TO-DO

	return (
		<Flex
			direction="column"
			gap={2}
			position="fixed"
			right={4}
			bottom={4}
			display={errorsElements.length > 0 ? 'flex' : 'none'}
		>
			{errorsElements.map((error) => {
				return (
					<MapOverlayBox key={error.id} pos="relative" bg="red.100" p={2}>
						<Alert
							status="error"
							display="flex"
							flexDirection="column"
							alignItems="flex-start"
							gap={2}
						>
							<Flex>
								<AlertIcon />
								<AlertTitle>{t('errors.label')}</AlertTitle>
							</Flex>

							<AlertDescription>
								{error.type === 'default'
									? t('errors.description.default')
									: error.message}
							</AlertDescription>
						</Alert>
					</MapOverlayBox>
				);
			})}
		</Flex>
	);
}
