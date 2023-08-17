import { MAP_EDIT_PERMISSIONS } from 'widgets/MapCore/model';
import * as Yup from 'yup';

export const mapPermissionEditRulesValidation = {
	edit_rules: Yup.number().oneOf(Object.values(MAP_EDIT_PERMISSIONS)),
};

export const mapPermissionAnonymousViewValidation = {
	edit_rules: Yup.boolean(),
};
