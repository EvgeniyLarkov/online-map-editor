import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikHelpers } from 'formik';
import { SessionStore } from 'entities/session';
import { Button, Center, Flex, Spinner } from '@chakra-ui/react';
import {
	FieldCheckbox,
	FieldInput,
	FieldRadioStack,
	FieldTextarea,
} from 'shared/uikit';
import {
	MAP_EDIT_PERMISSIONS,
	MapParticipantStore,
	mapsEditPermissions,
} from 'widgets/MapCore/model';
import * as Yup from 'yup';
import {
	ChangeMapDto,
	MapStore,
	changeMapLogined,
	changeMapUnlogined,
	mapDescriptionValidation,
	mapNameValidation,
	mapPublicValidation,
} from 'entities/map';
import {
	ChangeMapPermissionsDto,
	MapPermissionsStore,
	changeMapPermissionsLogined,
	changeMapPermissionsUnlogined,
	getMapPermissionsLogined,
	getMapPermissionsUnlogined,
	mapPermissionAnonymousViewValidation,
	mapPermissionEditRulesValidation,
} from 'entities/map-permissions';

type FormValues = {
	name: string;
	description: string;
	public: boolean;
	anonymousView: boolean;
	editRules: mapsEditPermissions;
};

export function MapSettingsMapForm({
	canChangeProperties,
}: {
	canChangeProperties: boolean;
}) {
	const { t } = useTranslation();
	const [pending, setPending] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const { selfHash } = MapParticipantStore((state) => ({
		selfHash: state.participantHash,
	}));
	const logined = SessionStore((session) => session.isAuthorized);
	const { mapHash, mapName, mapDescription, mapPublic, setMap } = MapStore(
		(state) => ({
			mapHash: state.hash,
			mapName: state.name,
			mapDescription: state.description,
			mapPublic: state.public,
			setMap: state.update,
		})
	);

	const { anonymousView, editRules, setPermissions } = MapPermissionsStore(
		(store) => ({
			anonymousView: store.anonymous_view,
			editRules: store.edit_rules,
			setPermissions: store.set,
		})
	);

	const initialValues: FormValues = React.useMemo(
		() => ({
			name: mapName || '',
			description: mapDescription || '',
			public: !!mapPublic,
			editRules: editRules || 0,
			anonymousView: !!anonymousView,
		}),
		[mapName, mapDescription, mapPublic, anonymousView, editRules]
	);

	// const initialValues = {
	// 	name: mapName || '',
	// 	description: mapDescription || '',
	// 	public: !!mapPublic,
	// 	editRules: editRules || 0,
	// 	anonymousView: !!anonymousView,
	// };

	const editRulesValues: [string, string][] = React.useMemo(
		() =>
			Object.keys(MAP_EDIT_PERMISSIONS).map((key) => [
				MAP_EDIT_PERMISSIONS[key].toString(),
				t(`maps.settings.map.editRules.${key}`),
			]),
		[t]
	);

	React.useEffect(() => {
		if (mapHash && canChangeProperties) {
			const request = logined
				? getMapPermissionsLogined(mapHash)
				: getMapPermissionsUnlogined(mapHash);

			request
				.then((result) => {
					setPermissions(result.data);
					setLoaded(true);
				})
				.catch(() => {
					setLoaded(false);
				});

			return () => {
				request.abort();
			};
		}

		return () => {
			setLoaded(false);
		};
	}, [canChangeProperties, logined, mapHash, setPermissions]);

	const handleSubmit = (
		values: FormValues,
		formikHelpers: FormikHelpers<FormValues>
	) => {
		if (selfHash && mapHash) {
			let needToUpdateProperties = false;

			const mapPermissions: ChangeMapPermissionsDto = {};

			const mapFields: ChangeMapDto = {};
			let needToUpdateDescription = false;

			if (canChangeProperties) {
				if (initialValues.anonymousView !== values.anonymousView) {
					mapPermissions.anonymous_view = values.anonymousView;
					needToUpdateProperties = true;
				}

				if (initialValues.editRules !== values.editRules) {
					mapPermissions.edit_rules = values.editRules;
					needToUpdateProperties = true;
				}
			}

			if (initialValues.name !== values.name) {
				mapFields.name = values.name;
				needToUpdateDescription = true;
			}

			if (initialValues.description !== values.description) {
				mapFields.description = values.description;
				needToUpdateDescription = true;
			}

			if (initialValues.public !== values.public) {
				mapFields.public = values.public;
				needToUpdateDescription = true;
			}

			if (needToUpdateDescription || needToUpdateProperties) {
				setPending(true);

				const requests = [
					needToUpdateDescription &&
						(logined
							? changeMapLogined(mapHash, mapFields)
							: changeMapUnlogined(mapHash, mapFields)),
					needToUpdateProperties &&
						(logined
							? changeMapPermissionsLogined(mapHash, mapPermissions)
							: changeMapPermissionsUnlogined(mapHash, mapPermissions)),
				] as const;

				Promise.all(requests)
					.catch(() => {})
					.then((res) => {
						if (res) {
							const [MapRes, MapPermissionsRes] = res;

							console.log(MapRes, MapPermissionsRes);

							if (MapRes) {
								setMap(MapRes.data);
							}

							if (MapPermissionsRes) {
								setPermissions(MapPermissionsRes.data);
							}
						}
					})
					.finally(() => {
						setPending(false);
					});
			}
		}
	};

	const validationSchema = React.useMemo(
		() =>
			Yup.object().shape({
				...mapNameValidation,
				...mapDescriptionValidation,
				...mapPublicValidation,

				...(canChangeProperties && {
					...mapPermissionAnonymousViewValidation,
					...mapPermissionEditRulesValidation,
				}),
			}),
		[canChangeProperties]
	);

	if (canChangeProperties && !loaded) {
		return (
			<Center h="200px" w="100%">
				<Spinner size="md" />
			</Center>
		);
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			validateOnChange
			onSubmit={handleSubmit}
		>
			<Form>
				<Flex flexDir="column" gap={6}>
					<FieldInput
						name="name"
						type="text"
						autoComplete="off"
						label={t('maps.settings.map.name')}
						placeholder={t('maps.settings.map.placeholders.name')}
						isDisabled={pending}
					/>
					<FieldTextarea
						name="description"
						autoComplete="off"
						label={t('maps.settings.map.description')}
						placeholder={t('maps.settings.map.placeholders.description')}
						isDisabled={pending}
					/>
					<FieldCheckbox
						label={t('maps.settings.map.public')}
						name="public"
						disabled={pending}
					/>
					{canChangeProperties && (
						<>
							<FieldCheckbox
								label={t('maps.settings.map.anonView')}
								name="anonymousView"
								disabled={pending}
							/>
							<FieldRadioStack
								label={t('maps.settings.map.editRules.label')}
								name="editRules"
								values={editRulesValues}
							/>
						</>
					)}
					<Button
						type="submit"
						colorScheme="gray"
						width="100%"
						isLoading={pending}
						isDisabled={pending}
					>
						{t('maps.settings.save')}
					</Button>
				</Flex>
			</Form>
		</Formik>
	);
}
