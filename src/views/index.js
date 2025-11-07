import { indexHtml } from '../components/indexHtml.js'
import { sidebarRender } from '../views/sidebar.js'
import { renderMainContent } from '../views/mainContent.js'

/** render index */
export function indexRender() {
    const fitcode = document.getElementById("fitcode");

    fitcode.innerHTML = indexHtml();
    sidebarRender();
    renderMainContent();
}