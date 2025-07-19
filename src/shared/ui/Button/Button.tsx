import { type ComponentPropsWithoutRef, Component } from 'react';
import styles from './Button.module.css';

class Button extends Component<ButtonProperties> {
  render() {
    const { className, type, disabled, onClick, children } = this.props;

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
}

type ButtonProperties = ComponentPropsWithoutRef<'button'>;

export default Button;
