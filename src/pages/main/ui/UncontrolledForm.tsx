import { useRef, useState, type ChangeEvent } from 'react';
import * as yup from 'yup';
import FormInput from '../../../shared/ui/inputs/FormInput';
import { useFormStore } from '../../../store/store';
import type { UserFormData } from '../../../store/types';
import { userSchema } from '../model/schema';
import {
  type PasswordStrength,
  checkPasswordStrength,
} from '../utils/checkPasswordStrength';
import { validateFile, readFileAsBase64 } from '../utils/fileUtils';

export type UncontrolledFormProps = { onSuccess: () => void };

export default function UncontrolledForm({ onSuccess }: UncontrolledFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const { countries } = useFormStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>(null);

  const addUncontrolledFormData = useFormStore(
    (store) => store.addUncontrolledFormData
  );

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordStrength(checkPasswordStrength(e.target.value));
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrors((prev) => ({ ...prev, pictureBase64: error }));
      return;
    }

    try {
      const base64 = await readFileAsBase64(file);
      setPreview(base64);
      setErrors((prev) => {
        const { pictureBase64, ...rest } = prev;
        return rest;
      });
    } catch {
      setErrors((prev) => ({ ...prev, pictureBase64: 'Failed to read file' }));
    }
  };

  const validate = async () => {
    const values = {
      name: nameRef.current?.value,
      age: ageRef.current?.value ? Number(ageRef.current.value) : undefined,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: maleRef.current?.checked
        ? 'male'
        : femaleRef.current?.checked
          ? 'female'
          : '',
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value,
      pictureBase64: pictureRef.current?.files?.[0] ? 'uploaded' : '',
    };

    try {
      await userSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const newErrors: Record<string, string> = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
      }
      return newErrors;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = await validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const file = pictureRef.current?.files?.[0];
      let pictureBase64 = '';

      if (file) {
        const error = validateFile(file);
        if (error) {
          setErrors((prev) => ({ ...prev, pictureBase64: error }));
          return;
        }
        pictureBase64 = await readFileAsBase64(file);
        setPreview(pictureBase64);
      }

      const data: UserFormData = {
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value),
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        gender: maleRef.current?.checked ? 'male' : 'female',
        terms: termsRef.current?.checked || false,
        country: countryRef.current?.value || '',
        pictureBase64,
      };

      addUncontrolledFormData(data);
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 min-w-[500px] max-w-md"
    >
      <FormInput inputRef={nameRef} name="name" label="Name" errors={errors} />
      <FormInput
        inputRef={ageRef}
        name="age"
        type="number"
        label="Age"
        errors={errors}
      />
      <FormInput
        inputRef={emailRef}
        name="email"
        type="email"
        label="Email"
        errors={errors}
      />

      <div className="flex flex-col gap-1">
        <FormInput
          inputRef={passwordRef}
          name="password"
          type="password"
          label="Password"
          errors={errors}
          onChange={handlePasswordChange}
          autoComplete="new-password"
        />
        {passwordStrength && (
          <p
            className={`text-sm ${passwordStrength === 'weak' ? 'text-red-500' : passwordStrength === 'medium' ? 'text-yellow-500' : 'text-green-600'}`}
          >
            Strength: {passwordStrength}
          </p>
        )}
      </div>

      <FormInput
        inputRef={confirmPasswordRef}
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        errors={errors}
      />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Gender</legend>
        <div className="flex gap-4">
          <FormInput
            inputRef={maleRef}
            type="radio"
            name="gender"
            value="male"
            label="Male"
          />
          <FormInput
            inputRef={femaleRef}
            type="radio"
            name="gender"
            value="female"
            label="Female"
          />
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </fieldset>

      <FormInput
        inputRef={termsRef}
        type="checkbox"
        name="terms"
        label="Accept Terms & Conditions"
        errors={errors}
      />

      <FormInput
        inputRef={pictureRef}
        type="file"
        name="pictureBase64"
        label="Upload picture"
        onChange={handleFile}
        errors={errors}
      />
      {preview && (
        <img src={preview} alt="preview" className="h-16 w-16 object-cover" />
      )}

      <FormInput
        inputRef={countryRef}
        name="country"
        label="Country"
        errors={errors}
        options={countries}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
