import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  id: number;
  name: string;
  description: string;
  detailUrl: string;
}

interface SelectionState {
  selectedItems: SelectedItem[];
}

const initialState: SelectionState = {
  selectedItems: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelection(state, action: PayloadAction<SelectedItem>) {
      const index = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.selectedItems.push(action.payload);
      } else {
        state.selectedItems.splice(index, 1);
      }
    },
    clearSelection(state) {
      state.selectedItems = [];
    },
  },
});

export const { toggleSelection, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
