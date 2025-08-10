import { useId, type ComponentPropsWithoutRef } from 'react';

function Input(props: InputProps) {
  const { label, id, onClick, onChange, ...restProps } = props;
  const generatedId = useId();
  const inputId = id || generatedId;

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onChange?.(event);
  };

  return (
    <div className="">
      {label && (
        <label htmlFor={inputId} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="bg-gray-50 border border-gray-300 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2 rounded transition-colors focus:outline-none focus:ring"
        onClick={handleClick}
        onChange={handleChange}
        {...restProps}
      />
    </div>
  );
}

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
};

export default Input;
