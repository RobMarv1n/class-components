import { getErrorMessage, ErrorMessages } from '../getErrorMessage';

describe('getErrorMessage', function () {
  test('Should return Unknown if error is null or undefined', function () {
    expect(getErrorMessage(null)).toBe(ErrorMessages.Unknown);
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(getErrorMessage(undefined)).toBe(ErrorMessages.Unknown);
  });

  test('Should return string error as is', function () {
    expect(getErrorMessage('Simple error')).toBe('Simple error');
  });

  test('Should return message from Error instance', function () {
    const error = new Error('Error instance message');
    expect(getErrorMessage(error)).toBe('Error instance message');
  });

  test('Should return error.error string if exists', function () {
    expect(getErrorMessage({ error: 'Error in error property' })).toBe(
      'Error in error property'
    );
  });

  test('Should return Unknown if error.error is not string', function () {
    expect(getErrorMessage({ error: { nested: true } })).toBe(
      ErrorMessages.Unknown
    );
  });

  test('Should return error.data.message string if exists', function () {
    expect(
      getErrorMessage({ data: { message: 'Error message in data' } })
    ).toBe('Error message in data');
  });

  test('Should return Server error if error.data.message missing or not string', function () {
    expect(getErrorMessage({ data: { detail: 'Some detail' } })).toBe(
      ErrorMessages.Server
    );
    expect(getErrorMessage({ data: null })).toBe(ErrorMessages.Server);
  });

  test('Should return error.message string if exists', function () {
    expect(getErrorMessage({ message: 'Message property error' })).toBe(
      'Message property error'
    );
  });

  test('Should return error.errorMessage string if exists in object', function () {
    expect(getErrorMessage({ errorMessage: 'Custom errorMessage' })).toBe(
      'Custom errorMessage'
    );
  });

  test('Should return JSON stringified object if no specific message fields', function () {
    const object = { foo: 'bar' };
    expect(getErrorMessage(object)).toBe(JSON.stringify(object));
  });

  test('Should return Unknown if error is unexpected type', function () {
    expect(getErrorMessage(42 as unknown as object)).toBe(
      ErrorMessages.Unknown
    );
  });
});
