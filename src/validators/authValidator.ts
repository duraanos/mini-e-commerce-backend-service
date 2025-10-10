import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.empty': 'name is required',
    'string.min': 'Name must be at least 2 characters',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain uppercase, lowercase letters and a number',
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),

  password: Joi.string().required().messages({
    'string.empty': 'String cannot be empty',
    'any.required': 'Password is required',
  }),
});

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error)
      return res
        .status(400)
        .json({ errors: error.details.map(err => err.message) });

    next();
  };
