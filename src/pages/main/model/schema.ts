import * as yup from 'yup';

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const userSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Must start with uppercase'),
  age: yup
    .number()
    .required('Age is required')
    .min(0, 'Age must be non-negative'),
  email: yup
    .string()
    .required('Email is required')
    .email('Expected format: user@example.com'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must contain at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character.'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Select gender'),
  terms: yup.boolean().oneOf([true], 'You must accept T&C').required(),
  country: yup.string().required('Select country'),
  pictureBase64: yup.string().required('Picture is required'),
});

export type FormValues = yup.InferType<typeof userSchema>;
