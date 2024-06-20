import { ChangeEvent, useState } from 'react';

type UseForm = [string, (e: ChangeEvent<HTMLInputElement>) => void];

const useForm = (initialState: string): UseForm => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    (e: ChangeEvent<HTMLInputElement>) => {
      setValues(e.target.value);
    },
  ];
};
export default useForm;
