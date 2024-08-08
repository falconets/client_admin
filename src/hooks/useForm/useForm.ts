/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface ownprops<T>{
      formDataProps?: T 
}

const useForm = <T>({formDataProps}:ownprops<T>) => {
  const [formData, setFormData] = useState<T>(formDataProps || ({} as T));
  const [errors, setErrors] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sterilizeData = () => {
    // Sterilize and validate logic
    const sterilizedData: any = {} as T;
    const validationErrors: any = {};

    // Example: sterilize and validate each form element
    Object.entries(formData as any).forEach(([name, value]) => {
      // Sterilize logic (e.g., remove unwanted characters or HTML tags)
      const sterilizedValue: string | number = typeof value === 'string' ? value.trim(): value as number;

      // Validation logic (e.g., check if the value meets certain criteria)
      if (sterilizedValue === '') {
        validationErrors[name] = 'This field is required.';
      }

      // Add more validation rules as needed

      sterilizedData[name] = sterilizedValue;
    });

    // Update state with sterilized and validated data
    setFormData(sterilizedData);
    setErrors(validationErrors);

    // If there are no validation errors, you can proceed with further actions
    if (Object.keys(validationErrors).length === 0) {
      return sterilizedData
    }else{
      return null
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    sterilizeData,
  };
};

export default useForm;
