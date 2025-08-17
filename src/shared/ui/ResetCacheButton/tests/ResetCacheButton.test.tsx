import { screen, fireEvent } from '@testing-library/dom';
import { describe, test, expect } from 'vitest';
import { renderWithProviders } from '../../../mocks/renderFunctions';
import ResetCacheButton from '../ResetCacheButton';
import { characterApiService } from '../../../api/service/characters/character.service';
import { store } from '../../../../store/store';

describe('ResetCacheButton component', () => {
  test('Should clear RTK Query cache on reset cache button click', async () => {
    renderWithProviders(<ResetCacheButton />);
    expect(screen.getByText('Reset cache')).toBeInTheDocument();

    await store.dispatch(
      characterApiService.endpoints.getSingleCharacter.initiate(1)
    );
    const initialCache = store.getState().baseApiService?.queries;
    expect(Object.keys(initialCache).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('Reset cache'));

    const afterResetCache = store.getState().baseApiService?.queries;
    expect(afterResetCache).toEqual({});
  });
});
