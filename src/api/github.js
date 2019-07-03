import axios from "../utils/axios";

const github = {
  users: {
    getCurrentUser: () => {
      return axios.get("/user");
    }
  },
  repos: {
    getRepos: () => {
      return axios.get(`/user/repos`);
    }
  }
};

export default github;
