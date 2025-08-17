import { fireEvent, render, screen } from '@testing-library/react';
import * as reduxAppHooks from '../../../../../shared/hooks/reduxHooks';
import * as selectionSlice from '../../../../../store/slices/selectionSlice';
import SelectionToolbar from '../../../../../components/main-page/SelectionToolbar/SelectionToolbar';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const sampleItems: selectionSlice.SelectedItem[] = [
  { id: 1, name: 'Item 1', description: 'Desc 1', detailUrl: 'url1' },
  { id: 2, name: 'Item 2', description: 'Desc 2', detailUrl: 'url2' },
];

const useAppSelectorMock = vi
  .spyOn(reduxAppHooks, 'useAppSelector')
  .mockReturnValue([]);
const dispatchMock = vi.fn();
const useAppDispatchMock = vi
  .spyOn(reduxAppHooks, 'useAppDispatch')
  .mockReturnValue(dispatchMock);

describe('SelectionToolbar', () => {
  test('Should not render when no items are selected', () => {
    render(<SelectionToolbar />);
    expect(screen.queryByText(/selected/)).not.toBeInTheDocument();
  });

  test('Should render correctly with multiple selected items', () => {
    useAppSelectorMock.mockReturnValue(sampleItems);
    render(<SelectionToolbar />);
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
    expect(screen.getByText('Clear selection')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('Should display singular form for one selected item', () => {
    useAppSelectorMock.mockReturnValue([sampleItems[0]]);
    render(<SelectionToolbar />);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    expect(screen.getByText('Clear selection')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('Should dispatch clearSelection when Clear selection button is clicked', () => {
    useAppSelectorMock.mockReturnValue(sampleItems);
    const clearSelection = vi.spyOn(selectionSlice, 'clearSelection');
    render(<SelectionToolbar />);
    fireEvent.click(screen.getByText('Clear selection'));
    expect(useAppDispatchMock).toHaveBeenCalledTimes(1);
    expect(clearSelection).toHaveBeenCalledTimes(1);
  });
});
