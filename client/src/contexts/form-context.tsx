"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  link: string;
  qrCodeSVG: string;
  isFormComplete: boolean;
};

type FormContextType = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string | boolean) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  title: "",
  company: "",
  link: "",
  qrCodeSVG: "",
  isFormComplete: false,
};

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}