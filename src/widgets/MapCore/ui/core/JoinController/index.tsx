import { MapStore } from 'entities/map';
import React from 'react';
import {
	connectToMapLogined,
	connectToMapUnlogined,
} from 'widgets/MapCore/api';
import {
	MapParticipantStore,
	useMapPermissionsStore,
} from 'widgets/MapCore/model';
import { OMEError } from 'shared/stores/errors';
import { useTranslation } from 'react-i18next';
import { SessionStore } from 'entities/session';
import { MapCore } from '../MapCore';
import { ControllerWarnScreen } from './ui/ControllerWarnPlaceholder';
import { ControllerLoadingScreen } from './ui/ControllerLoadingPlaceholder';

export function MapJoinController({ mapHash }: { mapHash?: string }) {
	const { t } = useTranslation();

	const [loading, setLoading] = React.useState(true);
	const [errorReason, setErrorReason] = React.useState<null | OMEError>(null);

	const { setMapData } = MapStore((mapData) => ({
		setMapData: mapData.update,
	}));

	const { canView, setPermissions } = useMapPermissionsStore((store) => ({
		canView: store.view,
		setPermissions: store.set,
	}));

	const { setParticipant } = MapParticipantStore((store) => ({
		setParticipant: store.set,
	}));

	const { logined } = SessionStore((state) => ({
		logined: state.isAuthorized,
	}));

	React.useEffect(() => {
		if (mapHash) {
			setLoading(true);

			const fetchPromise = logined
				? connectToMapLogined(mapHash)
				: connectToMapUnlogined(mapHash);

			fetchPromise
				.then((res) => {
					const { permissions, map, participant } = res.data;

					setMapData(map);
					setPermissions(permissions);
					setParticipant(participant);

					return res.data;
				})
				.catch((err: OMEError) => {
					if (err.type !== 'cancel') {
						setErrorReason(err);
					}
				})
				.finally(() => {
					setLoading(false);
				});

			return () => {
				fetchPromise.abort();
				setErrorReason(null);
				setLoading(true);
			};
		}

		return () => {
			setErrorReason(null);
			setLoading(true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapHash, logined]);

	if (!mapHash) {
		return <ControllerWarnScreen message={t('maps.join.errors.invalidHash')} />;
	}

	if (loading) {
		return <ControllerLoadingScreen />;
	}
	if (errorReason || !canView) {
		let errorMessage = t('errors.description.default');

		if (errorReason?.type === 'custom') {
			errorMessage = errorReason.message;
		} else if (!canView || errorReason?.statusCode === 401) {
			errorMessage = t('maps.join.errors.unauthorized');
		}
		return <ControllerWarnScreen message={errorMessage} />;
	}

	return <MapCore />;
}
