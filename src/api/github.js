import axios from "../utils/axios";

const github = {
  users: {
    getCurrentUser: () => {
      return axios.get("/user");
    }
  }
};

export default github;
