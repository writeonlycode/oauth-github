import "./style.css";
import axios from "axios";

const start = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  if (!code && !localStorage.getItem("githubAccessToken")) {
    document.querySelector("#app").innerHTML = `
      <div>
        <h1>OAuth with GitHub</h1>
        <div class="read-the-docs">
          <a class="button" href="https://github.com/login/oauth/authorize?client_id=9b5cefd5346e0dc66d46">Log In with GitHub</a>
        </div>
      </div>
    `;

    return;
  }

  if (code) {
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
      document.querySelector("#app").innerHTML = `
        <div>
          <h1>OAuth with GitHub</h1>
          <div class="read-the-docs">
            <p>Ops... Something went wrong while authenticating...</p>
            <a class="button" href="https://github.com/login/oauth/authorize?client_id=9b5cefd5346e0dc66d46">Log In with GitHub</a>
          </div>
        </div>
      `;

      return;
    }

    localStorage.setItem("githubAccessToken", githubAccessToken);
  }

  if (localStorage.getItem("githubAccessToken")) {
    const user = axios.get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${localStorage.getItem("githubAccessToken")}`,
      },
    });

    document.querySelector("#app").innerHTML = `
      <div>
        <h1>OAuth with GitHub</h1>
        <p>Hi ${user.name}!</p>
        <div">
          <div>
            <div>
              <h2>Repositories:</h2>
              <ul>
                <li>Repository #1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    return;
  }
};

start();
