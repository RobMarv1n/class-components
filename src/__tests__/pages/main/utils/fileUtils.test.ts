import { describe, it, expect } from 'vitest';
import {
  validateFile,
  readFileAsBase64,
} from '../../../../pages/main/utils/fileUtils';

describe('fileUtils', () => {
  it('validates file with correct type and size', () => {
    const validFile = new File(['content'], 'valid.png', { type: 'image/png' });
    const result = validateFile(validFile);
    expect(result).toBeNull();
  });

  it('returns error for invalid file type', () => {
    const invalidTypeFile = new File(['content'], 'invalid.txt', {
      type: 'text/plain',
    });
    const result = validateFile(invalidTypeFile);
    expect(result).toBe('Only PNG or JPEG allowed');
  });

  it('returns error for file size exceeding 2MB', () => {
    const largeFile = new File(
      ['content'.repeat(3 * 1024 * 1024)],
      'large.png',
      { type: 'image/png' }
    );
    const result = validateFile(largeFile);
    expect(result).toBe('Max file size 2MB');
  });

  it('reads file as base64 successfully', async () => {
    const file = new File(['data'], 'test.png', { type: 'image/png' });
    const result = await readFileAsBase64(file);
    expect(result).toContain('data:image/png;base64');
  });
});
