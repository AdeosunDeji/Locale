import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { successResponse, errorResponse, handleError } from "../utils/responses";
import models from '../models';
import { generateApiKey } from "../utils/generteApiKey";
import { isEmpty } from "lodash";


/**
 * @class UserController
 * @description create, log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createUser(req: Request, res: Response) {
    try {
      const {
        firstName, lastName, email, password
      } = req.body;
      if(isEmpty(firstName)) return errorResponse(res, 400, "Firstname is required.");
      if(isEmpty(lastName)) return errorResponse(res, 400, "Lastname is required.");
      if(isEmpty(email)) return errorResponse(res, 400, "email is required.");

      const emailExist = await models.User.findOne({ email });
      if (emailExist) {
        return errorResponse(res, 409, "email already registered by another user.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const apiKey = await generateApiKey(32);

      await models.User.create({
        firstName, lastName, email, password: hashedPassword, api_key: apiKey,
      });
      return successResponse(res, 201, "Account created successfully, kindly login.", { apiKey });
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

    /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
    static async loginUser(req: Request, res: Response) {
      try {
        const { email, password } = req.body;
    
        const user = await models.User.findOne({ email });
        if (!user) {
          return errorResponse(res, 404, "E-mail not found.");
        }
    
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
          return errorResponse(res, 404, "Password is not correct!");
        }

        const userDetails = {
          email,
          firstName: user.firstName,
          lastName: user.lastName
        };
    
        return successResponse(
          res,
          200,
          "User logged in successfully.",
          { userDetails }
        );
      } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error");
      }
    }

}