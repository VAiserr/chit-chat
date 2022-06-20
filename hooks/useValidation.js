import { useEffect, useState } from "react";

/**
 * @param validate
 * @param state
 *
 * @returns {object} validator - ставить на TextInput
 * @returns validErrors - ошибки валидации
 */
export default function useValidation(validate, state) {
  const [isInputing, setInputing] = useState(true);
  const [validErrors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isInputing) {
      const getError = async () => {
        const error = await validate();
        if (error?.length) {
          setErrors(error);
        }
      };
      getError();
    } else {
      setIsError(false);
      setErrors([]);
    }
  }, [state, isInputing]);

  useEffect(() => {
    if (validErrors.length) setIsError(true);
  }, [validErrors]);

  return [
    {
      onFocus: () => {
        setInputing(true);
      },
      onBlur: () => {
        setInputing(false);
      },
      error: isError,
    },
    validErrors,
    setErrors,
    isInputing,
    setInputing,
  ];
}
