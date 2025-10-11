import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const stripeWebhookSchema = Joi.object({
  rawBody: Joi.any().required(),
  signature: Joi.string().required(),
});

const paypalWebhookSchema = Joi.object({
  event: Joi.object({
    id: Joi.string().required(),
    event_type: Joi.string().required(),
    resource: Joi.object().required(),
  }).required(),
});

const orchestratorSchema = Joi.object({
  provider: Joi.string().valid('stripe', 'paypal').required(),
});

export const webhookValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { provider } = req.params;

  const { error: providerError } = orchestratorSchema.validate({ provider });
  if (providerError) {
    return res.status(400).json({
      success: false,
      message: `Invalid provider: ${providerError.details[0].message}`,
    });
  }

  let validationError;
  if (provider === 'stripe') {
    const { error } = stripeWebhookSchema.validate({
      rawBody: req.body,
      signature: req.headers['stripe-signature'],
    });
    validationError = error;
  } else if (provider === 'paypal') {
    const { error } = paypalWebhookSchema.validate({
      event: req.body,
    });
    validationError = error;
  }

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: `Validation error ${validationError.details[0].message}`,
    });
  }
  next();
};
