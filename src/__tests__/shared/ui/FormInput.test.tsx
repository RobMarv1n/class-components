import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import FormInput from '../../../shared/ui/inputs/FormInput';

describe('FormInput', () => {
  test('Should render a text input with label and respond to change', () => {
    const handleChange = vi.fn();
    render(<FormInput label="Name" name="name" onChange={handleChange} />);

    const input = screen.getByRole('textbox', { name: /name/i });
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe('John');
  });

  test('Should render a checkbox and respond to click', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        label="Accept Terms"
        name="terms"
        type="checkbox"
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toBeInTheDocument();
    expect((checkbox as HTMLInputElement).checked).toBe(false);

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  test('Should render a radio button and respond to click', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        label="Male"
        name="gender"
        type="radio"
        value="male"
        onChange={handleChange}
      />
    );

    const radio = screen.getByRole('radio', { name: /male/i });
    expect(radio).toBeInTheDocument();
    expect((radio as HTMLInputElement).checked).toBe(false);

    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((radio as HTMLInputElement).checked).toBe(true);
  });

  test('Should render a datalist with options', () => {
    const options = [
      { value: 'USA', label: 'USA' },
      { value: 'Canada', label: 'Canada' },
    ];
    render(<FormInput label="Country" name="country" options={options} />);

    const input = screen.getByRole('combobox');
    const listId = (input as HTMLInputElement).getAttribute('list');
    expect(listId).toBeTruthy();

    const dataList = document.getElementById(listId!);
    expect(dataList).toBeInTheDocument();

    const optionValues = Array.from(dataList!.querySelectorAll('option')).map(
      (o) => (o as HTMLOptionElement).value
    );
    expect(optionValues).toContain('USA');
    expect(optionValues).toContain('Canada');
  });

  test('Should show error message if provided', () => {
    render(
      <FormInput
        label="Email"
        name="email"
        errors={{ email: 'Email is required' }}
      />
    );

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
