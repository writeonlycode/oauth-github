import "./style.css";
import javascriptLogo from "./javascript.svg";
import axios from "axios";

const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");

if (code) {
  const response = await axios.get("https://gleeful-sundae-16db0f.netlify.app/.netlify/functions/github_access_token/", null, {
    params: {
      code,
    },
  });

  console.log(response);

  document.querySelector("#app").innerHTML = `
    <div>
      <h1>Hello Vite!</h1>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
        <pre>
          ${JSON.stringify(response)}
        </pre>

      </p>
    </div>
  `;

} else {
  document.querySelector("#app").innerHTML = `
    <div>
      <h1>Hello Vite!</h1>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
        <a class="button" href="https://github.com/login/oauth/authorize?client_id=9b5cefd5346e0dc66d46">Log In with GitHub</a>
      </p>
    </div>
  `;
}
