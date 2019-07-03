import axios from "axios";

const auth = {
  login: code => {
    return axios.get(
      `https://gh-gatekeeper.herokuapp.com/authenticate/${code}`
    );
  }
};

export default auth;
