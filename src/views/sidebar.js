import { sidebarHtml } from "../components/sidebarHtml.js"
import { headerTxt } from "../config/headerTxt.js"
import { dashboardRender } from "../views/dashboard.js"
import { plansRender } from "../views/plans.js"
import { assignmentRender } from '../views/assignment.js'
import { statiticsRender } from '../views/statistics.js'
import { usersRender } from "../views/users.js"

// switch page
function switchPage(selectedPage, headerH1Txt, headerPTxt, page) {
    // set active page in main menu
    const list = document.querySelectorAll('#main-menu li');
    list.forEach(li => {
        if (li.children[0].classList.contains('active')) {
            li.children[0].classList.remove('active');
        }
    });
    document.getElementById(selectedPage).classList.add('active');

    // set header txt
    const headerH1 = document.getElementById('header-h1');
    const headerP = document.getElementById('header-p');

    headerH1.style.opacity = 0;
    headerP.style.opacity = 0;

    setTimeout(() => {
        headerH1.textContent = headerH1Txt;
        headerP.textContent = headerPTxt;
        // Fade in
        headerH1.style.opacity = 1;
        headerP.style.opacity = 1;
    }, 200);
}

function itemsAddListener() {
    document.getElementById('page-home').addEventListener('click', () => switchPage('page-home', headerTxt['home']['h1'], headerTxt['home']['p'], dashboardRender()));
    document.getElementById('page-users').addEventListener('click', () => switchPage('page-users', headerTxt['users']['h1'], headerTxt['users']['p'], usersRender()));
    document.getElementById('page-exercises').addEventListener('click', () => switchPage('page-exercises', headerTxt['exercises']['h1'], headerTxt['exercises']['p'], console.log('Ejercicios')));
    document.getElementById('page-plans').addEventListener('click', () => switchPage('page-plans', headerTxt['plans']['h1'], headerTxt['plans']['p'], plansRender()));
    document.getElementById('page-assignments').addEventListener('click', () => switchPage('page-assignments', headerTxt['assignments']['h1'], headerTxt['assignments']['p'], assignmentRender()));
    document.getElementById('page-calendars').addEventListener('click', () => switchPage('page-calendars', headerTxt['calendars']['h1'], headerTxt['calendars']['p'], console.log('Calendario')));
    document.getElementById('page-statistics').addEventListener('click', () => switchPage('page-statistics', headerTxt['statistics']['h1'], headerTxt['statistics']['p'], statiticsRender()));
    document.getElementById('page-payments').addEventListener('click', () => switchPage('page-payments', headerTxt['payments']['h1'], headerTxt['payments']['p'], console.log('Pagos')));
}

/** render sidebar */
export function sidebarRender() {
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = sidebarHtml();
    itemsAddListener();
}
