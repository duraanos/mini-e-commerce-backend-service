import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').max(500),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  imageUrl: Joi.string().uri().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow('').max(500),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0),
  imageUrl: Joi.string().uri(),
}).min(1);

export const productIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
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
