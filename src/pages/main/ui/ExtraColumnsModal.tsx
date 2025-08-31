import React from 'react';

const ExtraColumnsModal = React.memo(function ExtraColumnsModal({
  fields,
  extraColumns,
  toggleExtraColumn,
  onClose,
}: ExtraColumnsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg text-white mb-4">Select extra columns</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {fields.map((field) => (
            <label
              key={field.key}
              className="flex items-center gap-2 text-gray-200"
            >
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                checked={extraColumns.includes(field.key)}
                onChange={() => toggleExtraColumn(field.key)}
              />
              {field.label}
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
});

type Field = {
  key: string;
  label: string;
};

type ExtraColumnsModalProps = {
  fields: Field[];
  extraColumns: string[];
  toggleExtraColumn: (key: string) => void;
  onClose: () => void;
};

export default ExtraColumnsModal;
