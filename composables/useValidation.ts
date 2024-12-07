import { useBaseStore } from "../stores/baseStore";
export function useValidation() {
  const baseStore = useBaseStore();

  const handleValidationError = (fieldName: string, error: string | null) => {
    baseStore.errors[fieldName] = error;
  };

  const isValid = () => {
    baseStore.isSubmit = true;
    if (
      Object.values(baseStore.errors).length === 0 ||
      Object.values(baseStore.errors).some((x) => x !== null)
    )
      return false;

    return true;
  };

  return {
    handleValidationError,
    isValid,
  };
}
