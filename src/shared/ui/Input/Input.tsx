import type { ComponentPropsWithoutRef } from 'react';
import { Component } from 'react';
import styles from './Input.module.css';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
};

export class Input extends Component<InputProps> {
  private get inputId() {
    return this.props.id || `input-${Math.random().toString(36).slice(2, 8)}`;
  }

  render() {
    const { label, className = '', id, ...restProps } = this.props;

    const inputId = id || this.inputId;

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
}
