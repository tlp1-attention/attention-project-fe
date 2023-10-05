import { ChangeEventHandler, useState } from "react";

type UseFormValue = [
    inputData: Record<string, FormDataEntryValue>,
    { 
        handleChange: React.ChangeEventHandler,
        resetInputs: () => void
    }
];

export function useForm<T extends FormDataEntryValue>(): UseFormValue {
  const [inputData, setInputData] = useState<
    Record<string, T>
  >({});

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
  };

  const resetInputs = () => setInputData({});

  return [
    inputData,
    {
      handleChange,
      resetInputs
    }
  ];
}
