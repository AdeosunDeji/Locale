import { Request, Response, NextFunction } from "express";
import models from '../models'; // Assuming you have a models file or module
import { errorResponse, handleError } from "../utils/responses";


export default class Authentication {
  static async authorizeApiKey(req: Request, res: Response, next: NextFunction) {
    try {
  
      const { authorization } = req.headers;
  
      if(!authorization)
      return errorResponse(res, 401, "Unauthorized")
  
      const user = await models.User.findOne({ api_key: authorization });
  
      if (!user) {
        return errorResponse(res, 403, "Forbidden");
      }

      req.user = user;
          
      next();
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
}