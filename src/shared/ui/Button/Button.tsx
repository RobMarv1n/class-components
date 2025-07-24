import { type ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

function Button(props: ButtonProperties) {
  const { className, type, disabled, onClick, children } = props;

  return (
    <button
      type={type || 'button'}
      className={`${styles.button} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type ButtonProperties = ComponentPropsWithoutRef<'button'>;

export default Button;
