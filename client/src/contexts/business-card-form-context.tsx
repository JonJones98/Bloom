"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type FormData = {
  // Step 1: Content - Personal Info
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  link: string;
  
  // Step 3: Style Preferences
  cardStyle: 'modern' | 'classic' | 'minimal' | 'creative';
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'black';
  fontStyle: 'sans' | 'serif' | 'mono';
  backgroundStyle: [string, string];
  borderStyle: string;
  
  // Step 4: Generate & Finalize
  qrCodeSVG: string;
  isFormComplete: boolean;
};

type FormContextType = {
  formData: FormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateFormData: (field: keyof FormData, value: string | boolean | [string, string]) => void;
  resetForm: () => void;
  isStepValid: (step: number) => boolean;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  title: "",
  company: "",
  link: "",
  cardStyle: 'modern',
  colorScheme: 'blue',
  fontStyle: 'sans',
  qrCodeSVG: "",
  isFormComplete: false,
  backgroundStyle: ["color", "#f0f0f0"],
  borderStyle: "#000000",
};

export function BusinessCardFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (field: keyof FormData, value: string | boolean | [string, string]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: // Personal Info
        return formData.name.trim() !== "" && 
               formData.email.trim() !== "" && 
               formData.phone.trim() !== "" && 
               formData.title.trim() !== "" && 
               formData.company.trim() !== "";
      case 3: // Style Preferences
        return true; // Style preferences always have default values
      case 4: // Generate & Finalize
        return true;
      default:
        return false;
    }
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      currentStep, 
      setCurrentStep, 
      updateFormData, 
      resetForm, 
      isStepValid 
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useBusinessCardForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useBusinessCardForm must be used within a BusinessCardFormProvider');
  }
  return context;
}