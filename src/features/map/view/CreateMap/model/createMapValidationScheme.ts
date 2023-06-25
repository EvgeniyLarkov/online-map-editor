import { t } from 'i18next';
import * as Yup from 'yup';

export const createMapValidationShema = Yup.object().shape({
	name: Yup.string().required(t('login.errors.email-empty')).max(100),
	description: Yup.string().optional(),
	public: Yup.boolean().optional(),
});
