import "./style.css";
import axios from "axios";
import {errorPage, loggedPage, loginPage} from "./html";

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("githubAccessToken");
});

const start = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  if (!code && !localStorage.getItem("githubAccessToken")) {
    loginPage();
    return;
  }

  if (localStorage.getItem("githubAccessToken")) {
    loggedPage();
    return;
  }

  if (code) {
    searchParams.delete("code");

    if (searchParams.toString() !== "") {
      history.replaceState({}, "", "?" + searchParams.toString());
    } else {
      history.replaceState({}, "", "/");
    }

    const response = await axios.get(
      "https://gleeful-sundae-16db0f.netlify.app/.netlify/functions/github_access_token",
      {
        headers: { Accept: "application/json" },
        responseType: "json",
        params: {
          code,
        },
      }
    );

    const githubAccessToken = response.data.access_token;

    if (!githubAccessToken) {
      errorPage();
      return;
    }

    localStorage.setItem("githubAccessToken", githubAccessToken);
    loggedPage();
  }
};

start();
