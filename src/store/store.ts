import { create } from 'zustand';
import type { UserFormData } from './types';
import { countryList } from '../shared/model/countryList';

export type Option = { value: string; label: string };

export type FormStore = {
  hookFormData: UserFormData[];
  uncontrolledData: UserFormData[];
  countries: Option[];
  addHookFormData: (data: UserFormData) => void;
  addUncontrolledFormData: (data: UserFormData) => void;
  setCountries: (countries: string[]) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  hookFormData: [],
  uncontrolledData: [],

  countries: countryList.map((country) => ({ value: country, label: country })),

  addHookFormData: (data) =>
    set((state) => ({ hookFormData: [...state.hookFormData, data] })),

  addUncontrolledFormData: (data) =>
    set((state) => ({ uncontrolledData: [...state.uncontrolledData, data] })),

  setCountries: (countries) =>
    set({
      countries: countries.map((country) => ({
        value: country,
        label: country,
      })),
    }),
}));
