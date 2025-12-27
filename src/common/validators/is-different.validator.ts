import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDifferent', async: false })
class IsDifferentValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const relatedPropertyName = args.constraints[0];
    const relatedValue = args.object[relatedPropertyName];
    if (value !== relatedValue) {
      return true;
    }
    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return validationArguments?.constraints[1] || 'Values must be different';
  }
}

export function IsDifferent(
  compareProperty: string,
  validationOptions?: ValidationOptions,
) {
  return function (obj: Object, propertyName: string) {
    registerDecorator({
      target: obj.constructor,
      propertyName,
      options: validationOptions,
      constraints: [compareProperty],
      validator: IsDifferentValidator,
    });
  };
}
