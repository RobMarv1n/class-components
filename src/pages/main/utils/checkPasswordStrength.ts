export type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

export function checkPasswordStrength(password: string): PasswordStrength {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score === 3 || score === 4) return 'medium';
  if (score === 5) return 'strong';
  return null;
}
