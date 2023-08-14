import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Flex,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { errorsStore } from 'shared/stores/errors';
import { MapOverlayBox } from 'shared/uikit';
import { shallow } from 'zustand/shallow';

export function NotificationsModule() {
	const { t } = useTranslation();
	const [activeErrors, setActiveErrors] = useState<Record<string, boolean>>({});
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

	useEffect(() => {
		const addHashes: Record<string, boolean> = {};

		const makeErrorsExpire = (hashes: Record<string, boolean>) => {
			setTimeout(() => {
				const expiredHashes: Record<string, boolean> = hashes;

				setExpiredErrors((items) => ({ ...items, ...expiredHashes }));
				setActiveErrors((items) => {
					const newActiveErrors = { ...items };

					Object.keys(hashes).forEach((key) => {
						delete newActiveErrors[key];
					});

					return newActiveErrors;
				});
			}, EXPIRE_TIMEOUT);
		};

		let addHashCount = 0;
		errorsList.forEach((errorHash) => {
			const exist = !!expiredErrors[errorHash] || !!activeErrors[errorHash];

			if (!exist) {
				addHashes[errorHash] = true;
			}
			addHashCount += 1;
		});

		if (addHashCount > 0) {
			setActiveErrors((items) => ({ ...items, ...addHashes }));
			makeErrorsExpire(addHashes);
		}
	}, [activeErrors, expiredErrors, errorsList]);

	const errorsElements = useMemo(() => {
		return Object.keys(activeErrors).map((key) => {
			return errorsById[key] || null;
		});
	}, [activeErrors, errorsById]); // TO-DO

	return (
		<Flex
			direction="column"
			gap={2}
			position="fixed"
			right={0}
			bottom={0}
			display={errorsElements.length > 0 ? 'flex' : 'none'}
		>
			{errorsElements.map((error) => {
				return (
					<MapOverlayBox>
						<Alert status="error">
							<AlertIcon />
							<AlertTitle>{t('errors.label')}</AlertTitle>
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
