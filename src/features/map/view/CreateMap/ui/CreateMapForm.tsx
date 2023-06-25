import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikHelpers } from 'formik';
import { UnsuccssesRequest } from 'shared/api/types';
import { Button, Flex } from '@chakra-ui/react';
import { FieldCheckbox, FieldInput } from 'shared/uikit';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { createMapValidationShema } from '../model/createMapValidationScheme';
import { createMap } from '../model';

type FormValues = {
	name: string;
	description?: string;
	public?: boolean;
};

type CreateMapFormInterface = {
	successCallback: () => void;
};

export function CreateMapForm({ successCallback }: CreateMapFormInterface) {
	const { t } = useTranslation();
	const [mapCreationPending, setMapCreationPending] = useState(false);

	const initialValues: FormValues = { name: '', description: '' };

	const handleSetServerError = (
		result: UnsuccssesRequest,
		formikHelpers: FormikHelpers<FormValues>
	): void => {
		console.log(result);
		// if (result.data?.errors?.name === 'emailNotExists') {
		// 	formikHelpers.setErrors({
		// 		name: t('login.errors.incorrect-credentials'),
		// 	});
		// } else if (result.data?.errors?.description === 'incorrectPassword') {
		// 	formikHelpers.setErrors({
		// 		description: t('login.errors.incorrect-password'),
		// 	});
		// }
	};

	const handleSubmit = (
		values: FormValues,
		formikHelpers: FormikHelpers<FormValues>
	) => {
		setMapCreationPending(true);

		createMap({
			name: values.name,
			description: values.description,
			public: values.public,
		})
			.then((result) => {
				if (isSuccessRequest(result)) {
					successCallback();
				} else {
					handleSetServerError(result, formikHelpers);
				}
			})
			.finally(() => {
				setMapCreationPending(false);
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={createMapValidationShema}
			validateOnChange
			onSubmit={handleSubmit}
		>
			<Form>
				<Flex flexDir="column" gap={6}>
					<FieldInput
						name="name"
						type="string"
						autoComplete="off"
						label={t('maps.create.name')}
						isDisabled={mapCreationPending}
					/>
					<FieldInput
						name="description"
						type="string"
						autoComplete="off"
						label={t('maps.create.description')}
						isDisabled={mapCreationPending}
					/>
					<FieldCheckbox name="public" label={t('maps.create.public')} />
					<Button
						type="submit"
						colorScheme="gray"
						width="100%"
						isLoading={mapCreationPending}
						isDisabled={mapCreationPending}
					>
						{t('maps.create.save')}
					</Button>
				</Flex>
			</Form>
		</Formik>
	);
}
