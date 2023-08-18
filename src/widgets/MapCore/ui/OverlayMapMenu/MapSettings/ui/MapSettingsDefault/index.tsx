import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikHelpers } from 'formik';
import { SessionStore } from 'entities/session';
import { Button, Flex } from '@chakra-ui/react';
import { FieldInput } from 'shared/uikit';
import * as Yup from 'yup';
import {
	changeMapParticipantLogined,
	changeMapParticipantUnlogined,
} from 'widgets/MapCore/api/participant/changeMapParticipant';
import { MapStore } from 'entities/map';
import {
	MapParticipantStore,
	mapParticipantNameValidation,
} from 'entities/map-participant';

type FormValues = {
	name: string;
};

export function MapSettingsDefaultForm() {
	const { t } = useTranslation();
	const [pending, setPending] = useState(false);

	const { name, selfHash, setParticipant } = MapParticipantStore((state) => ({
		name: state.name,
		selfHash: state.participantHash,
		setParticipant: state.set,
	}));
	const logined = SessionStore((session) => session.isAuthorized);
	const mapHash = MapStore((state) => state.hash);

	const initialValues: FormValues = React.useMemo(
		() => ({ name: name || '' }),
		[name]
	);

	const handleSubmit = (
		values: FormValues,
		formikHelpers: FormikHelpers<FormValues>
	) => {
		if (selfHash && mapHash) {
			setPending(true);

			const request = logined
				? changeMapParticipantLogined(selfHash, {
						name: values.name,
						mapHash,
				  })
				: changeMapParticipantUnlogined(selfHash, {
						name: values.name,
						mapHash,
				  });

			request
				.then((result) => {
					setParticipant({ name: result.data.name });
				})
				.catch((err) => {})
				.finally(() => {
					setPending(false);
				});
		}
	};

	const validationSchema = Yup.object().shape({
		...mapParticipantNameValidation,
	});

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
						label={t('maps.settings.default.name')}
						placeholder={t('maps.settings.default.placeholders.name')}
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
