import reducer, {
  toggleSelection,
  clearSelection,
} from '../slices/selectionSlice';

const mockItem1 = {
  id: 1,
  name: 'Item 1',
  description: 'Description 1',
  detailUrl: '/item/1',
};

const mockItem2 = {
  id: 2,
  name: 'Item 2',
  description: 'Description 2',
  detailUrl: '/item/2',
};

describe('selectionSlice reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      selectedItems: [],
    });
  });

  test('should add an item if it is not selected', () => {
    const nextState = reducer(undefined, toggleSelection(mockItem1));
    expect(nextState.selectedItems).toContainEqual(mockItem1);
  });

  test('should remove the item if it is already selected', () => {
    const initialState = {
      selectedItems: [mockItem1],
    };
    const nextState = reducer(initialState, toggleSelection(mockItem1));
    expect(nextState.selectedItems).not.toContainEqual(mockItem1);
  });

  test('should add multiple different items', () => {
    let state = reducer(undefined, toggleSelection(mockItem1));
    state = reducer(state, toggleSelection(mockItem2));
    expect(state.selectedItems).toEqual([mockItem1, mockItem2]);
  });

  test('should clear all selected items', () => {
    const initialState = {
      selectedItems: [mockItem1, mockItem2],
    };
    const nextState = reducer(initialState, clearSelection());
    expect(nextState.selectedItems).toEqual([]);
  });
});
