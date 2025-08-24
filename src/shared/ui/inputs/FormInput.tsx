import { type ChangeEvent, type InputHTMLAttributes, useId } from 'react';
import type {
  FieldValues,
  Path,
  UseFormRegister,
  RegisterOptions,
  FieldErrors,
} from 'react-hook-form';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type { Option } from '../../../store/store';

function FormInput<T extends FieldValues>({
  label,
  name,
  type = 'text',
  register,
  rules,
  errors,
  onChange,
  options,
  inputRef,
  ...rest
}: FormInputProps<T>) {
  const errorMessage = errors?.[name]
    ? getErrorMessage(errors[name])
    : undefined;
  const isCheckboxOrRadio = type === 'checkbox' || type === 'radio';
  const id = useId();
  const inputId = `${String(name)}-${id}`;
  const listId = options ? `${inputId}-list` : undefined;

  let inputProps: InputHTMLAttributes<HTMLInputElement> = { ...rest };
  if (register) {
    inputProps = { ...register(name, rules), ...rest };
    if (isCheckboxOrRadio || type === 'file') inputProps.onChange = onChange;
  } else {
    inputProps.onChange = onChange;
  }

  if (isCheckboxOrRadio) {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2">
          <input
            id={inputId}
            name={String(name)}
            type={type}
            ref={inputRef}
            {...inputProps}
            className="w-4 h-4 border-gray-300 rounded-sm"
          />
          {label}
        </label>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={String(name)}
        type={type}
        ref={inputRef}
        list={listId}
        {...inputProps}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          errorMessage ? 'border-red-500' : ''
        }`}
      />
      {options && (
        <datalist id={listId}>
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt} />
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            )
          )}
        </datalist>
      )}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}

type FormInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T> | Record<string, string>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  options?: Option[];
  inputRef?: React.Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export default FormInput;
