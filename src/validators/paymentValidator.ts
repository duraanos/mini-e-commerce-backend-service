import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const orchestratorSchema = Joi.object({
  provider: Joi.string().valid('stripe', 'paypal').required(),
  userId: Joi.string().uuid().required(),
  orderId: Joi.string().uuid().required(),
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
