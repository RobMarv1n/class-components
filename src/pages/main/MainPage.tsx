import { useState } from 'react';
import { useFormStore } from '../../store/store';
import type { UserFormData } from '../../store/types';
import Modal from '../../shared/ui/Modal';
import ControlledForm from './ui/ControlledForm';
import UncontrolledForm from './ui/UncontrolledForm';

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<'uncontrolled' | 'hook' | null>(
    null
  );

  const { hookFormData, uncontrolledData } = useFormStore();

  const openForm = (type: 'uncontrolled' | 'hook') => {
    setFormType(type);
    setIsOpen(true);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex gap-4">
        <button
          onClick={() => openForm('uncontrolled')}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Open Uncontrolled Form
        </button>

        <button
          onClick={() => openForm('hook')}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Open React Hook Form
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {formType === 'uncontrolled' && (
          <UncontrolledForm onSuccess={() => setIsOpen(false)} />
        )}
        {formType === 'hook' && (
          <ControlledForm onSuccess={() => setIsOpen(false)} />
        )}
      </Modal>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold mb-2">Uncontrolled Form Data</h2>
          {uncontrolledData.map((entry: UserFormData, idx: number) => (
            <div
              key={idx}
              className="border rounded-lg p-3 bg-gray-100 shadow mb-2"
            >
              <p>
                <b>Name:</b> {entry.name}
              </p>
              <p>
                <b>Age:</b> {entry.age}
              </p>
              <p>
                <b>Email:</b> {entry.email}
              </p>
              <p>
                <b>Country:</b> {entry.country}
              </p>
              <p>
                <b>Gender:</b> {entry.gender}
              </p>
              {entry.pictureBase64 && (
                <img
                  src={entry.pictureBase64}
                  alt="Uploaded"
                  className="w-16 h-16 mt-2 rounded-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-bold mb-2">React Hook Form Data</h2>
          {hookFormData.map((entry: UserFormData, idx: number) => (
            <div
              key={idx}
              className="border rounded-lg p-3 bg-gray-100 shadow mb-2"
            >
              <p>
                <b>Name:</b> {entry.name}
              </p>
              <p>
                <b>Age:</b> {entry.age}
              </p>
              <p>
                <b>Email:</b> {entry.email}
              </p>
              <p>
                <b>Country:</b> {entry.country}
              </p>
              <p>
                <b>Gender:</b> {entry.gender}
              </p>
              {entry.pictureBase64 && (
                <img
                  src={entry.pictureBase64}
                  alt="Uploaded"
                  className="w-16 h-16 mt-2 rounded-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
