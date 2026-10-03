import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export class SchemaMiddleware {
  public validate = (schema: ZodType) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        })
        return next();
      } catch (error) {
        // Handle ZOD Schema Error
        if (error instanceof ZodError) {
          return res.status(400).json({
            status: "error",
            message: "Schema validation failed",
            errors: error.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message
            })),
          });
        }
        return next(error);
      }
    }
}