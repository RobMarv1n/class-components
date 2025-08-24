import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UncontrolledForm from '../../../../pages/main/ui/UncontrolledForm';
import { useFormStore } from '../../../../store/store';

vi.mock('../../../../store/store', () => ({
  useFormStore: vi.fn(),
}));

describe('UncontrolledForm', () => {
  const mockOnSuccess = vi.fn();
  const mockAddUncontrolledFormData = vi.fn();
  const mockCountries = ['USA', 'Russia', 'Germany'];

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormStore as any).mockImplementation(() => ({
      countries: mockCountries,
      addUncontrolledFormData: mockAddUncontrolledFormData,
    }));
  });

  test('renders form with all input fields', () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

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
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);
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
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);
    const fileInput = screen.getByLabelText(/Upload picture/i);

    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  test('shows error on invalid file upload', async () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);
    const fileInput = screen.getByLabelText(/Upload picture/i);

    const invalidFile = new File(['invalid'], 'test.exe', {
      type: 'application/exe',
    });
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(screen.getByText(/Only PNG or JPEG allowed/i)).toBeInTheDocument();
    });
  });
});
