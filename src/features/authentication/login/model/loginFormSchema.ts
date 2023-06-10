import { t } from 'i18next';
import * as Yup from 'yup';

export const validationShema = Yup.object().shape({
	email: Yup.string()
		.email(t('login.errors.email-incorrect'))
		.required(t('login.errors.email-empty')),
	password: Yup.string().required(t('login.errors.password-empty')),
});
