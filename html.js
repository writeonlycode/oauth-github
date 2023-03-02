import axios from "axios";

export function loginPage() {
  document.querySelector("#app").innerHTML = `
      <div>
        <h1>OAuth with GitHub</h1>
        <div>
          <a class="button" href="https://github.com/login/oauth/authorize?client_id=9b5cefd5346e0dc66d46&scope=read:repo_hook">Log In with GitHub</a>
        </div>
      </div>
    `;
}

export function errorPage() {
  document.querySelector("#app").innerHTML = `
      <div>
        <h1>OAuth with GitHub</h1>
        <div class="read-the-docs">
          <p>Ops... Something went wrong while authenticating...</p>
          <a class="button" href="https://github.com/login/oauth/authorize?client_id=9b5cefd5346e0dc66d46">Log In with GitHub</a>
        </div>
      </div>
    `;
}

export async function loggedPage() {
  const user = await axios.get("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${localStorage.getItem("githubAccessToken")}`,
    },
  });

  console.log(user);

  const repos = await axios.get(
    `https://api.github.com/search/repositories?q=user:${user.data.login}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${localStorage.getItem("githubAccessToken")}`,
      },
    }
  );

  console.log(repos);

  document.querySelector("#app").innerHTML = `
      <div>
        <h1>OAuth with GitHub</h1>
        <p>Hi ${user.data.name || user.data.login}!</p>
        <div>
          <div>
            <div>
              <h2>Repositories:</h2>
              ${repos.data.items.map((e) => `<p>${e.name}</p>`).join(" ")}
            </div>
          </div>
        </div>
      </div>
    `;
}
