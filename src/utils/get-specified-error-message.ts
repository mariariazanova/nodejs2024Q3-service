import { ErrorMessage } from '../enums/error-message';
import { Property } from '../enums/property';

export const getSpecifiedErrorMessage = (
  errorMessage: ErrorMessage,
  property: Property,
) => `${errorMessage}: (${property})`;
