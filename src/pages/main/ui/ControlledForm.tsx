import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema, type FormValues } from '../model/schema';
import { useFormStore } from '../../../store/store';
import type { UserFormData } from '../../../store/types';
import FormInput from '../../../shared/ui/inputs/FormInput';
import {
  checkPasswordStrength,
  type PasswordStrength,
} from '../utils/checkPasswordStrength';
import { validateFile, readFileAsBase64 } from '../utils/fileUtils';

type ControlledFormProps = { onSuccess: () => void };

export default function ControlledForm({ onSuccess }: ControlledFormProps) {
  const { addHookFormData } = useFormStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const { countries } = useFormStore();
  const [preview, setPreview] = useState<string | null>(null);

  const passwordValue = watch('password', '');
  const passwordStrength: PasswordStrength =
    checkPasswordStrength(passwordValue);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setValue('pictureBase64', '');
      setPreview(null);
      return;
    }

    const error = validateFile(file);
    if (error) {
      setValue('pictureBase64', '');
      setPreview(null);
      return;
    }

    try {
      const base64 = await readFileAsBase64(file);
      setValue('pictureBase64', base64, { shouldValidate: true });
      setPreview(base64);
    } catch {
      setValue('pictureBase64', '');
      setPreview(null);
    }
  };

  const onSubmit = (data: FormValues) => {
    const entry: UserFormData = {
      ...data,
      gender: data.gender ?? '',
      terms: data.terms ?? false,
      age: Number(data.age),
      pictureBase64: data.pictureBase64 ?? '',
    };
    addHookFormData(entry);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <FormInput name="name" label="Name" register={register} errors={errors} />
      <FormInput
        name="age"
        type="number"
        label="Age"
        register={register}
        errors={errors}
      />
      <FormInput
        name="email"
        type="email"
        label="Email"
        register={register}
        errors={errors}
      />

      <div className="flex flex-col gap-1">
        <FormInput
          name="password"
          type="password"
          label="Password"
          register={register}
          errors={errors}
        />
        {passwordValue && (
          <p
            className={`text-sm ${
              passwordStrength === 'weak'
                ? 'text-red-500'
                : passwordStrength === 'medium'
                  ? 'text-yellow-500'
                  : 'text-green-600'
            }`}
          >
            Strength: {passwordStrength}
          </p>
        )}
      </div>

      <FormInput
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        register={register}
        errors={errors}
      />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-gray-700">Gender:</legend>
        <label className="flex items-center gap-2">
          <FormInput
            name="gender"
            type="radio"
            value="male"
            register={register}
            errors={errors}
          />{' '}
          Male
        </label>
        <label className="flex items-center gap-2">
          <FormInput
            name="gender"
            type="radio"
            value="female"
            register={register}
            errors={errors}
          />{' '}
          Female
        </label>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </fieldset>

      <FormInput
        name="terms"
        type="checkbox"
        label="Accept Terms & Conditions"
        register={register}
        errors={errors}
      />

      <FormInput
        name="pictureBase64"
        type="file"
        label="Upload picture"
        errors={errors}
        onChange={handleFile}
      />
      {preview && (
        <img src={preview} alt="preview" className="h-16 w-16 object-cover" />
      )}

      <FormInput
        name="country"
        label="Country"
        register={register}
        errors={errors}
        options={countries}
      />

      <button
        type="submit"
        disabled={!isValid}
        className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
