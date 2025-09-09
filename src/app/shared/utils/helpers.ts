import { FormGroup } from '@angular/forms';

export function isInvalid(
  form: FormGroup,
  field: string,
  validator: string
): boolean {
  const control = form.get(field);
  return Boolean(control?.hasError(validator) && control?.touched);
}
