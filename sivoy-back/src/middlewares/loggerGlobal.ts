import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = new Date();
  const formattedDate = date.toLocaleString();
  console.log(
    `Método: ${req.method} | Ruta: ${req.url} | Fecha: ${formattedDate}`,
  );

  next();
}
