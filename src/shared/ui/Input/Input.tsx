import { useId, type ComponentPropsWithoutRef } from 'react';
import styles from './Input.module.css';

function Input(props: InputProps) {
  const { label, className = '', id, ...restProps } = props;
  const generatedId = useId();
  const inputId = id || generatedId;

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
        {...restProps}
      />
    </div>
  );
}

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
};

export default Input;
