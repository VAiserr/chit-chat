import { useState } from "react";

/**
 * Кастомный хук для отправления асинхронных запросов
 *
 * @param {Function} callback
 * @returns fetching - асинронная функция
 * @returns isFetching - флаг состояния запроса
 * @returns error - сообщение об ошибке
 */
export const useFetching = (
  callback,
  errorCallback = (e) => console.log(e),
  finallyCallback = () => {}
) => {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async () => {
    try {
      setFetching(true);
      await callback();
    } catch (e) {
      console.log(e.payload);
      errorCallback(e);
      setError(e);
    } finally {
      await finallyCallback();
      setFetching(false);
    }
  };

  return [fetching, isFetching, error];
};
