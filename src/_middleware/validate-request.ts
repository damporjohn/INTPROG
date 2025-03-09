import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function validateRequest(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false, // Include all validation errors
      allowUnknown: true, // Allow unknown properties in the request body
      stripUnknown: true, // Remove unknown properties from the request body
    };

    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // If validation fails, pass the error to the error handler
      next(new Error(`Validation error: ${error.details.map((x) => x.message).join(", ")}`));
    } else {
      // If validation succeeds, replace the request body with the validated value
      req.body = value;
      next();
    }
  };
}