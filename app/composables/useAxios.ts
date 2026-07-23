import axios from "axios";

export default function useAxios() {
  const axiosInstances = axios.create({
    baseURL: "http://skeleton.com/api",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
    xsrfCookieName: "cstftoken",
    xsrfHeaderName: "X-CSRFToken",
  });
}
