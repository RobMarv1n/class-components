import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useFormStore } from '../../../../store/store';
import ControlledForm from '../../../../pages/main/ui/ControlledForm';

vi.mock('../../../../store/store', () => ({
  useFormStore: vi.fn(),
}));

describe('UncontrolledForm', () => {
  const mockOnSuccess = vi.fn();
  const mockAddControlledFormFormData = vi.fn();
  const mockCountries = ['USA', 'Russia', 'Germany'];
  const mockedUseFormStore = vi.mocked(useFormStore);

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseFormStore.mockImplementation(() => ({
      countries: mockCountries,
      addControlledFormFormData: mockAddControlledFormFormData,
    }));
  });

  test('renders form with all input fields', () => {
    render(<ControlledForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/accept Terms & Conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/upload picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('updates password strength on password change', async () => {
    render(<ControlledForm onSuccess={mockOnSuccess} />);
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    await waitFor(() => {
      expect(screen.getByText(/Strength: weak/i)).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: 'StrongPass123!' } });
    await waitFor(() => {
      expect(screen.getByText(/Strength: strong/i)).toBeInTheDocument();
    });
  });

  test('handles file upload and sets preview', async () => {
    render(<ControlledForm onSuccess={mockOnSuccess} />);
    const fileInput = screen.getByLabelText(/Upload picture/i);

    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});
