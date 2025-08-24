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

  let inputProps: InputHTMLAttributes<HTMLInputElement> = { ...rest };

  if (register) {
    inputProps = { ...register(name, rules), ...rest };

    if (type === 'file' || type === 'checkbox' || type === 'radio') {
      inputProps.onChange = onChange;
    }
  } else {
    inputProps.onChange = onChange;
  }

  const isCheckboxOrRadio = type === 'checkbox' || type === 'radio';
  const id = useId();
  const listId = `${id}-list`;

  return (
    <div className="flex flex-col gap-1">
      {!isCheckboxOrRadio && label && (
        <label
          htmlFor={String(name)}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 ${isCheckboxOrRadio ? 'mt-1' : ''}`}
      >
        <input
          id={`${String(name)}-${id}`}
          name={String(name)}
          type={type}
          ref={inputRef}
          list={options ? listId : undefined}
          {...inputProps}
          className={`${
            isCheckboxOrRadio
              ? 'w-4 h-4 p-0 border-gray-300 rounded-sm'
              : 'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          } ${errorMessage ? 'border-red-500' : ''}`}
        />

        {isCheckboxOrRadio && label && (
          <span className="text-sm text-gray-700">{label}</span>
        )}
      </div>

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
