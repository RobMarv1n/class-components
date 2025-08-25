export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export function validateFile(file: File): string | null {
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    return 'Only PNG or JPEG allowed';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'Max file size 2MB';
  }
  return null;
}

export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
