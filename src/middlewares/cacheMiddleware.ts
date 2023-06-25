// import { Request, Response, NextFunction } from "express";
// import data from '../utils/data.json'
// import Cache from '../config/redis'
// import { successResponse } from "../utils/responses";

// const allStatesMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const states = data.states;

//   const cacheKey = states;

//   const cachedStates = await Cache.redis?.get(cacheKey);

//   if (cachedStates) {
//     // Cache hit
//     return successResponse(res, 200, `data: ${JSON.parse(cachedStates)}`)
//   }

//   next()
// }

// export default allStatesMiddleware