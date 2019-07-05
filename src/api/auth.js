import axios from "axios";
import config from "../config";

const GH_GATEKEEPER = config.env.GH_GATEKEEPER;

const auth = {
  login: code => {
    return axios.get(
      `${GH_GATEKEEPER}/authenticate/${code}`
    );
  }
};

export default auth;
