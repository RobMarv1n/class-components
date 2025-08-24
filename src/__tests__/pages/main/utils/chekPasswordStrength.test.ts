import { describe, it, expect } from 'vitest';
import {
  type PasswordStrength,
  checkPasswordStrength,
} from '../../../../pages/main/utils/checkPasswordStrength';

describe('checkPasswordStrength', () => {
  const cases: [string, PasswordStrength][] = [
    ['', null],
    ['short', 'weak'],
    ['alllowercase', 'weak'],
    ['Lowercase1', 'medium'],
    ['Lowercase1$', 'strong'],
    ['12345678', 'weak'],
    ['ABCDEFGH', 'weak'],
    ['Abcdefgh', 'medium'],
    ['Abc12345', 'medium'],
    ['Abc123$%', 'strong'],
  ];

  cases.forEach(([password, expected]) => {
    it(`Should return "${expected}" for password "${password}"`, () => {
      expect(checkPasswordStrength(password)).toBe(expected);
    });
  });
});
