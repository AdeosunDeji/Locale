import { Request, Response } from 'express';
import data from '../utils/data.json';
import { errorResponse, handleError, successResponse } from '../utils/responses';
// import Cache from "../config/redis"

/**
 * @class StatesController
 * @description find states
 * @exports StatesController
 */
export default class StatesController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async allStates(req: Request, res: Response) {
    try {   
      const states = data.states;
      // const cacheKey = 'states'; 
  
      // const cachedStates = await Cache.redis.get(cacheKey);
  
      // if (cachedStates) {
      //   return successResponse(res, 200, "All states", JSON.parse(cachedStates));
      // }
  
      // // cache miss
      // const statesJson = JSON.stringify(states);
      // await Cache.redis.set(cacheKey, statesJson);
  
      return successResponse(res, 200, "All states", states);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
  
  

static async getState(req: Request, res: Response) {
  try {
    const { name } = req.query;
    // const cacheKey = `state: ${name}`;

    // const cachedState = await Cache.redis.get(cacheKey);

    // if (cachedState) {
    //   return successResponse(res, 200, "State: ", JSON.parse(cachedState));
    // }

    const nameOfState = data.states.find(
      (s) => String(s.name).toLowerCase() === String(name).toLowerCase()
    );

    if (nameOfState) {
      // const stateJson = JSON.stringify(nameOfState);
      // await Cache.redis.set(cacheKey, stateJson);
      return successResponse(res, 200, "State: ", nameOfState);
    } else {
      return errorResponse(res, 404, "State not found");
    }
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error");
  }
}



  static async statesByRegion (req: Request, res: Response) {
    try {
      const { region } = req.params;
      // const cacheKey = `region: ${region}`;

      // const cachedState = await Cache.redis.get(cacheKey);

      // if (cachedState) {
      //   return successResponse(res, 200, "State: ", JSON.parse(cachedState));
      // }

      const statesInRegion = data.states.filter(state => state.region.toLowerCase() === region);
      if(statesInRegion.length > 0) { 
        const stateNames = statesInRegion.map(state => state.name)
        // const stateJson = JSON.stringify(stateNames);
        // await Cache.redis.set(cacheKey, stateJson);
        return successResponse(res, 200, "States by Region: ", stateNames)
      } else {
        return errorResponse(res, 404, "Region not found");
      }
    } catch (error) {
      handleError(error, req)
      return errorResponse(res, 500, "Server error");
    }
  }

  static async lgaSearch(req: Request, res: Response) {
    try {
      const { state } = req.params;
  
      const lgaInState = data.states.find(
        (s) => String(s.name).toLowerCase() === String(state).toLowerCase()
      );
  
      if (lgaInState) {
        const { LGAs } = lgaInState;
        return successResponse(res, 200, `LGAs in ${state}`, LGAs);
      } else {
        return errorResponse(res, 404, "LGAs not found.");
      }
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
  

  static async getLga(req: Request, res: Response) {
    try {
      const { name } = req.params;
  
      const lga = data.states.filter((s) =>
        s.LGAs.some((lga) => lga.toLowerCase() === name.toLowerCase())
      );
  
      if (lga.length > 0) {
        return successResponse(res, 200, "LGA found: ", lga);
      } else {
        return errorResponse(res, 400, "LGA not found");
      }
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
  

  static async searchByStateandLga(req: Request, res: Response) {
    try {
      const { query } = req.query;
      const searchTerm = query?.toString().toLowerCase();
      const result = data.states.filter(
        state =>
        String(state.name).toLowerCase() === searchTerm  ||
        state.LGAs.some(lga => lga.toLowerCase() === searchTerm)
      );
  
      if (result.length > 0) {
        return successResponse(res, 200, "Search result: ", result);
      } else {
        return errorResponse(res, 404, "No matching result found");
      }
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  static async searchByRegionAndState(req: Request, res: Response) {
    try {
      const { q } = req.params;
      const searchTerm = q?.toString().toLowerCase();
      const result = data.states.filter(
        state =>
        String(state.name).toLowerCase() === searchTerm  ||
        String(state.region).toLowerCase() === searchTerm
      );
  
      if (result.length > 0) {
        return successResponse(res, 200, "Search result: ", result);
      } else {
        return errorResponse(res, 404, "No matching result found");
      }
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

}