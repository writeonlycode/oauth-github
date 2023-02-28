import "./style.css";
import javascriptLogo from "./javascript.svg";
import axios from "axios";

const searchParams = new URLSearchParams(window.location.search);
const githubCode = searchParams.get("code");

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
      <div>
        Code: ${githubCode}
      </div>

      <a class="button" href="https://github.com/login/oauth/authorize?client_id=9b5cefd5346e0dc66d46">Log In with GitHub</a>
    </p>
  </div>
`;
