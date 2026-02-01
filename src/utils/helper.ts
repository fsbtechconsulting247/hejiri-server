import type { Response, Request, NextFunction } from "express";

export type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;
