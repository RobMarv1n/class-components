import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  const KEY = 'testKey';

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('Should initialize with value from localStorage if present', () => {
    localStorage.setItem(KEY, JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage(KEY, 'defaultValue'));

    expect(result.current[0]).toBe('storedValue');
  });

  test('Should initialize with initialValue if no localStorage item', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'defaultValue'));

    expect(result.current[0]).toBe('defaultValue');
  });

  test('Should update localStorage when setter is called', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'initial'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });

  test('Should handle localStorage setItem error gracefully', () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Quota exceeded');
      });

    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage(KEY, 'init'));

    act(() => {
      result.current[1]('newVal');
    });

    expect(consoleWarnSpy).toHaveBeenCalled();

    setItemSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });
});
