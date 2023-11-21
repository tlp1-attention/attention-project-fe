import { ChangeEventHandler, useState } from "react";

type UseFormValue = [
    inputData: Record<string, FormDataEntryValue>,
    { 
        handleChange: React.ChangeEventHandler,
        resetInputs: () => void
    }
];

export function useForm<T extends Record<string, FormDataEntryValue>>(initialValue: T): UseFormValue {
  const [inputData, setInputData] = useState<
    T
  >(initialValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setInputData({
      ...inputData,
      [evt.target.name]: evt.target.value
    })
  };

  const resetInputs = () => setInputData(previousValues => {
    const newValue: T = {};
    for (const key of Object.keys(previousValues)) {
      newValue[key] = "";
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
