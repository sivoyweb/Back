import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'MatchPassword',
  async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
  //* VALIDAR PASSWORD CON CONFIRMACION DE PASSWORD
  validate(
    password: any,
    args: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (password !== (args.object as any)[args.constraints[0]]) return false;

    return true;
  }

  //*  SI LA VALIDACION FALLA...
  defaultMessage(args: ValidationArguments): string {
    return `Password and password confirmation don't match`;
  }
}
