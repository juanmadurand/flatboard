import { ValidationError } from 'api/errors';
import validations from 'lib/validations';

function assert(v) {
  if (!v.test) {
    throw new ValidationError(v.message);
  }
}

const validate = {};

for (const name of Object.keys(validations)) {
  validate[name] = (x) => assert(validations[name](x));
}

export default validate;
