export type UserFormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword?: string;
  gender: string;
  terms: boolean;
  country: string;
  pictureBase64?: string;
};
