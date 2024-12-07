import { useRuntimeConfig } from "#app";

export const useAppFetchServer = async (endpoint: string, options = {}) => {
  await nextTick();
  const config = useRuntimeConfig();
  const data = await useFetch(endpoint, {
    baseURL: config.public.apiBaseUrl,
    ...options,
  });
  return data.data.value;
};

export const useAppFetch = async (endpoint: string, options = {}) => {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(endpoint, {
      baseURL: config.public.apiBaseUrl,
      ...options,
    })
  );

  if (error.value) return error.value;
  return data.value;
};
