/* eslint-disable react/jsx-props-no-spreading */
import './index.css';

import React from 'react';
import { useField } from 'formik';
import { Input, InputProps, Text } from '@chakra-ui/react';

type FieldInputInterface = { label: string; name: string } & InputProps;

export function FieldInput({ label, ...props }: FieldInputInterface) {
	const [field, meta] = useField(props.name);

	return (
		<label htmlFor={props.name} className="field-input">
			<Text fontSize="lg" fontWeight={500}>
				{label}
			</Text>
			<Input {...field} {...props} />
			{meta.touched && meta.error ? (
				<Text color="red.500">{meta.error}</Text>
			) : null}
		</label>
	);
}
