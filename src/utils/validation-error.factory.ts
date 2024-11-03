import { BadRequestException, ValidationError } from '@nestjs/common';
import { ErrorMessage } from '../enums/error-message';

// export function customExceptionFactory(
//   errors: ValidationError[],
// ): BadRequestException {
//   console.log('ERRORS', errors);
//   // const hasEmptyFieldsErrorIndex = errors.findIndex((error) =>
//   //   Object.values(error.constraints).includes(
//   //     ErrorMessage.EMPTY_REQUIRED_FIELD,
//   //   ),
//   // );
//   // console.log(hasEmptyFieldsErrorIndex);
//   // console.log(
//   //   errors
//   //     .map((error: ValidationError) => Object.values(error.constraints))
//   //     .flat()
//   //     .join(', '),
//   // );
//
//   const formattedErrors = errors.map((error) => {
//     console.log('error', error);
//     const property = error.property;
//     console.log(
//       '1',
//       error,
//       Object.values(error.constraints).includes(
//         ErrorMessage.EMPTY_REQUIRED_FIELD,
//       ),
//     );
//     const constraintsMessages = Object.values(error.constraints).includes(
//       ErrorMessage.EMPTY_REQUIRED_FIELD,
//     )
//       ? ErrorMessage.EMPTY_REQUIRED_FIELD
//       : Object.values(error.constraints).join(', '); // Join all constraint messages
//
//     return `Property ${property} has error: ${constraintsMessages}`;
//   });
//   const errorMessage = formattedErrors.join(' | ');
//   console.log('errorMessage', errorMessage);
//
//   return new BadRequestException(errorMessage);
//   // hasEmptyFieldsErrorIndex === -1
//   //   ? errors
//   //   : ErrorMessage.EMPTY_REQUIRED_FIELD,
//   // );
// }
