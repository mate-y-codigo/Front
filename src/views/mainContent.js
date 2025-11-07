import { mainContentHtml } from "../components/mainContentHtml.js"
import { headerTxt } from "../config/headerTxt.js"
import { themeAddListener, themeLoad } from "../utils/theme.js"

/** render sidebar */
export function renderMainContent() {
    const sidebar = document.getElementById("main-content");
    sidebar.innerHTML = mainContentHtml(headerTxt['home']['h1'], headerTxt['home']['p'], 'Dashboard');

    themeLoad();
    themeAddListener();
}
