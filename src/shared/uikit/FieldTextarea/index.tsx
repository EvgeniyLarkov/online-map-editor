import React from 'react';
import { useField } from 'formik';
import { Text, Textarea, TextareaProps } from '@chakra-ui/react';

type FieldTextareInterface = { label: string; name: string } & TextareaProps;

export function FieldTextarea({ label, ...props }: FieldTextareInterface) {
	const [field, meta] = useField(props.name);

	return (
		<label htmlFor={props.name} className="field-input">
			<Text fontSize="lg" fontWeight={500}>
				{label}
			</Text>
			<Textarea {...field} {...props} />
			{meta.touched && meta.error ? (
				<Text color="red.500">{meta.error}</Text>
			) : null}
		</label>
	);
}
