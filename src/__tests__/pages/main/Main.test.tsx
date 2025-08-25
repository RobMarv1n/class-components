import {
  fireEvent as user,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import Main from '../../../pages/main/MainPage';
import userEvent from '@testing-library/user-event';

describe('Main', () => {
  test('renders main page with buttons', () => {
    render(<Main />);

    expect(screen.getByText(/Open Uncontrolled Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Open React Hook Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Uncontrolled Form Data/i)).toBeInTheDocument();
    expect(screen.getByText(/React Hook Form Data/i)).toBeInTheDocument();
  });

  test('opens UncontrolledForm modal on button click', async () => {
    render(<Main />);
    const uncontrolledButton = screen.getByText(/Open Uncontrolled Form/i);

    user.click(uncontrolledButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
  });

  test('opens ControlledForm modal on button click', async () => {
    render(<Main />);
    const controlledButton = screen.getByText(/Open React Hook Form/i);

    user.click(controlledButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
  });

  test('closes modal on close button click', async () => {
    render(<Main />);
    const uncontrolledButton = screen.getByText(/Open Uncontrolled Form/i);

    user.click(uncontrolledButton);

    const closeButton = screen.getByTestId('close-modal');

    user.click(closeButton);

    await waitFor(() => {
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  test('displays content after submitting an uncontrolled form', async () => {
    render(<Main />);
    const uncontrolledButton = screen.getByText(/Open Uncontrolled Form/i);

    fireEvent.click(uncontrolledButton);

    const nameInput = screen.getByLabelText(/name/i);
    const ageInput = screen.getByLabelText(/age/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const maleRadio = screen.getByLabelText('Male');
    const termsCheckbox = screen.getByLabelText(/accept Terms & Conditions/i);
    const fileInput = screen.getByLabelText(/upload picture/i);
    const countrySelect = screen.getByLabelText(/country/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.change(emailInput, { target: { value: 'BZD0U@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123?' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password123?' },
    });
    fireEvent.click(maleRadio);
    fireEvent.click(termsCheckbox);
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(countrySelect, { target: { value: 'USA' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  test('displays content after submitting a controlled form', async () => {
    render(<Main />);
    const user = userEvent.setup();

    await user.click(screen.getByText(/Open React Hook Form/i));

    await user.type(screen.getByLabelText(/name/i), 'Sam Smith');
    await user.type(screen.getByLabelText(/age/i), '25');
    await user.type(screen.getByLabelText(/email/i), 'BZD0U@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123?');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123?');
    await user.click(screen.getByLabelText('Male'));
    await user.click(screen.getByLabelText(/accept Terms & Conditions/i));

    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/upload picture/i);
    await user.upload(fileInput, file);

    await user.type(screen.getByLabelText(/country/i), 'Argentina');

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Sam Smith/i)).toBeInTheDocument();
    });
  });
});
