import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { ErrorMessage } from '../enums/error-message'; // Import class-transformer if needed

// @Injectable()
// export class CustomValidationPipe
//   extends ValidationPipe
//   implements PipeTransform
// {
//   transform(value: any, metadata: ArgumentMetadata) {
//     const errors: ValidationError[] = [];
//
//     super.transform(value, metadata).then((err) => errors.push(err));
//     const hasEmptyFields = this.checkForEmptyFields(errors);
//     console.log(errors, hasEmptyFields);
//
//     if (hasEmptyFields) {
//       throw new BadRequestException(ErrorMessage.EMPTY_REQUIRED_FIELD);
//     }
//
//     return errors
//       .map((error: ValidationError) => Object.values(error.constraints))
//       .flat()
//       .join(', ');
//   }
//
//   private checkForEmptyFields(errors: ValidationError[]) {
//     return errors.some((error) =>
//       Object.values(error.constraints).includes(
//         ErrorMessage.EMPTY_REQUIRED_FIELD,
//       ),
//     );
//   }
// }
