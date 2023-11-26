import { ChangeEventHandler, useState } from "react";

type UseFormValue = [
    inputData: Record<string, FormDataEntryValue>,
    { 
        handleChange: React.ChangeEventHandler<HTMLInputElement>,
        resetInputs: () => void
    }
];

export function useForm<T extends Record<string, FormDataEntryValue>>(initialValue: T): UseFormValue {
  const [inputData, setInputData] = useState<
    T
  >(initialValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const target = evt.target as HTMLFormElement;
    setInputData({
      ...inputData,
      [target.name]: target.value
    })
  };

  const resetInputs = () => setInputData(previousValues => {
    const newValue: T = {} as T;
    for (const key of Object.keys(previousValues)) {
      (newValue[key as keyof typeof newValue] as FormDataEntryValue) = '';
    }
    return newValue;
  });

  return [
    inputData,
    {
        handleChange,
        resetInputs
    }
  ];
}
