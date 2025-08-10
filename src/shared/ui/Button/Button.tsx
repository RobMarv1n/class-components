import { type ComponentPropsWithoutRef } from 'react';

function Button(props: ButtonProperties) {
  const { className, type, disabled, onClick, children } = props;

  return (
    <button
      type={type || 'button'}
      className={`btn-primary ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type ButtonProperties = ComponentPropsWithoutRef<'button'>;

export default Button;
