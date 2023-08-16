import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikHelpers } from 'formik';
import { UnsuccssesRequest } from 'shared/api/types';
import { SessionStorage } from 'entities/session';
import { Button, Flex } from '@chakra-ui/react';
import { FieldInput } from 'shared/uikit';
import { useUserStore } from 'entities/user';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { useMapParticipantStore } from 'widgets/MapCore/model';
import { makeLogin } from '../../model/login';
import { validationShema } from '../../model/loginFormSchema';

type FormValues = {
	name: string;
};

export function MapSettingsMapForm() {
	const { t } = useTranslation();
	const [pending, setPending] = useState(false);

	const { name } = useMapParticipantStore((state) => ({ name: state.name }));

	const initialValues: FormValues = React.useMemo(
		() => ({ name: name || '' }),
		[name]
	);
	const setSessionData = SessionStorage((session) => session.setSessionData);
	const setUserData = useUserStore((user) => user.update);

	const handleSetServerError = (
		result: UnsuccssesRequest,
		formikHelpers: FormikHelpers<FormValues>
	): void => {
		if (result.data?.errors?.email === 'emailNotExists') {
			formikHelpers.setErrors({
				email: t('login.errors.incorrect-credentials'),
			});
		} else if (result.data?.errors?.password === 'incorrectPassword') {
			formikHelpers.setErrors({
				password: t('login.errors.incorrect-password'),
			});
		}
	};

	const handleSubmit = (
		values: FormValues,
		formikHelpers: FormikHelpers<FormValues>
	) => {
		setPending(true);

		makeLogin({
			email: values.email,
			password: values.password,
		})
			.then((result) => {
				setSessionData(result.session);

				if (isSuccessRequest(result)) {
					successCallback();
					setUserData(result.user);
				} else {
					handleSetServerError(result, formikHelpers);
				}
			})
			.finally(() => {
				setPending(false);
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationShema}
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
						isDisabled={pending}
					/>
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
