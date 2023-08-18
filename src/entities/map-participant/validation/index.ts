import { t } from 'i18next';
import * as Yup from 'yup';

export const mapParticipantNameValidation = {
	name: Yup.string()
		.min(2, t('errors.templates.min-field', { min: 2 }))
		.max(100, t('errors.templates.max-field', { max: 100 }))
		.required(t('errors.templates.required'))
		.trim(),
};
