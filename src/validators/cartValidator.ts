import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const createCartSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

export const addItemSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const updateCartItemSchema = Joi.object({
  cartItemId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const removeCartItemSchema = Joi.object({
  cartItemId: Joi.string().uuid().required(),
});

export const getCartItemSchema = Joi.object({
  cartId: Joi.string().uuid().required(),
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
