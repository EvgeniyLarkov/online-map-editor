import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikHelpers } from 'formik';
import { UnsuccssesRequest } from 'shared/api/types';
import { useSession } from 'entities/session';
import { Button, Flex } from '@chakra-ui/react';
import { FieldInput } from 'shared/uikit';
import { useUserStore } from 'entities/user';
import { makeLogin } from '../../model/login';
import { validationShema } from '../../model/loginFormSchema';

type FormValues = {
	email: string;
	password: string;
};

type LoginBoxInterface = {
	successCallback: () => void;
};

export function LoginForm({ successCallback }: LoginBoxInterface) {
	const { t } = useTranslation();
	const [loginPending, setLoginPending] = useState(false);

	const initialValues: FormValues = { email: '', password: '' };
	const setSessionData = useSession((session) => session.setSessionData);
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
		setLoginPending(true);

		makeLogin({
			email: values.email,
			password: values.password,
		})
			.then((result) => {
				setSessionData(result.session);

				if (result.user) {
					successCallback();
					setUserData(result.user);
				} else {
					handleSetServerError(result, formikHelpers);
				}
			})
			.finally(() => {
				setLoginPending(false);
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
						name="email"
						type="email"
						autoComplete="on"
						label={t('login.email')}
						isDisabled={loginPending}
					/>
					<FieldInput
						name="password"
						type="password"
						autoComplete="on"
						label={t('login.password')}
						isDisabled={loginPending}
					/>
					<Button
						type="submit"
						colorScheme="gray"
						width="100%"
						isLoading={loginPending}
						isDisabled={loginPending}
					>
						{t('login.login')}
					</Button>
				</Flex>
			</Form>
		</Formik>
	);
}
