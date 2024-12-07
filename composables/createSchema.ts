import * as yup from "yup";

type SchemaType = yup.StringSchema | yup.NumberSchema | yup.DateSchema;

const applyRules = (
  schema: SchemaType,
  rules: ((schema: SchemaType) => SchemaType)[]
): SchemaType => {
  return rules.reduce((currentSchema: SchemaType, rule) => {
    return rule ? rule(currentSchema) : currentSchema;
  }, schema);
};

export const createSchema = (
  label: string,
  type: string,
  maxLength?: number,
  minLength?: number,
  customSchema?: SchemaType
): SchemaType => {
  let baseSchema: SchemaType;

  switch (type) {
    case "text":
      baseSchema = yup.string().required(`${label} alanı zorunludur`);
      break;
    case "number":
      baseSchema = yup.number().required(`${label} alanı zorunludur`);
      break;
    default:
      baseSchema = yup.string().required(`${label} alanı zorunludur`);
  }

  if (customSchema) {
    if (customSchema.constructor === baseSchema.constructor) {
      baseSchema = baseSchema.concat(customSchema);
    } else {
      throw new Error("Custom schema type does not match base schema type");
    }
  }

  const rules = [
    minLength
      ? (schema: SchemaType) =>
          (schema as yup.StringSchema).min(
            minLength,
            `${label} en az ${minLength} karakter olmalıdır`
          )
      : null,
    maxLength
      ? (schema: SchemaType) =>
          (schema as yup.StringSchema).max(
            maxLength,
            `${label} en fazla ${maxLength} karakter olabilir`
          )
      : null,
  ];

  return applyRules(baseSchema, rules);
};
