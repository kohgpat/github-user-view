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
    },
    getRepo: (owner, repo) => {
      return axios.get(`/repos/${owner}/${repo}`);
    }
  }
};

export default github;
