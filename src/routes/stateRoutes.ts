import { Router } from "express";
import StatesController from "../controller/states";
import Authentication from "../middlewares/auth";


const router = Router()

const { allStates, statesByRegion, getState, getLga, searchByStateandLga, lgaSearch, searchByRegionAndState } = StatesController;
const { authorizeApiKey } = Authentication;

router.get("/", authorizeApiKey, allStates);

router.get("/lga/:name", authorizeApiKey, getLga);

router.get("/area/:state", authorizeApiKey, lgaSearch);

router.get("/search", authorizeApiKey, searchByStateandLga);

router.get("/state", authorizeApiKey, getState);

router.get("/:region", authorizeApiKey, statesByRegion);

router.get("/reg&s/:q", authorizeApiKey, searchByRegionAndState);


export default router;