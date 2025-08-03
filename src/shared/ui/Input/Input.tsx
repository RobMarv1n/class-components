import { useId, type ComponentPropsWithoutRef } from 'react';
import styles from './Input.module.css';

function Input(props: InputProps) {
  const { label, className = '', id, onClick, onChange, ...restProps } = props;
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
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${styles.label} ${className || ''}`}
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`${styles.input} ${className || ''}`}
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
