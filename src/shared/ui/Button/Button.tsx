import { type ComponentPropsWithoutRef, Component } from 'react';
import styles from './Button.module.css';

type ButtonProperties = ComponentPropsWithoutRef<'button'>;

export class Button extends Component<ButtonProperties> {
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
