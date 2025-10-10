import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const createOrderSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  cartId: Joi.string().uuid().required(),
});

export const getOrderByIdSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  orderId: Joi.string().uuid().required(),
});

export const updateOrderSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  orderId: Joi.string().uuid().required(),
  status: Joi.string()
    .valid('pending', 'processing', 'completed', 'cancelled')
    .required(),
});

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error)
      return res
        .status(400)
        .json({ errors: error.details.map(err => err.message) });
  };
