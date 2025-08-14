document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-links");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (navLinks) {
        renderNavbar(isLoggedIn);
    }

    function renderNavbar(isLoggedIn) {
        navLinks.innerHTML = `
            <li><a href="index.html" class="${activePage('index.html')}">Home</a></li>
            <li><a href="#" id="visitorsLink" class="${activePage('visitors.html')}">Visitors</a></li>
            <li><a href="about.html" class="${activePage('about.html')}">About Us</a></li>
            <li><a href="contact.html" class="${activePage('contact.html')}">Contact Us</a></li>
            ${isLoggedIn 
                ? `<li><a href="#" id="logoutBtn">Logout</a></li>` 
                : `<li><a href="login.html" class="${activePage('login.html')}">Login</a></li>`}
        `;

        // Visitors link behavior
        document.getElementById("visitorsLink").addEventListener("click", (e) => {
            e.preventDefault();
            if (localStorage.getItem("loggedIn") === "true") {
                window.location.href = "visitors.html";
            } else {
                window.location.href = "login.html";
            }
        });

        // Logout functionality
        if (isLoggedIn) {
            document.getElementById("logoutBtn").addEventListener("click", () => {
                localStorage.removeItem("loggedIn");
                renderNavbar(false);
                window.location.href = "index.html";
            });
        }
    }

    function activePage(page) {
        const current = window.location.pathname.split("/").pop();
        return current === page ? "active" : "";
    }

    // Login form handler
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        });
    }

    // Home page "View Visitors" button
    const visitorsBtn = document.querySelector(".btn");
    if (visitorsBtn && visitorsBtn.textContent.includes("Visitors")) {
        visitorsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (localStorage.getItem("loggedIn") === "true") {
                window.location.href = "visitors.html";
            } else {
                window.location.href = "login.html";
            }
        });
    }
});

// Visitors data handling
const visitors = {
    "Class 1": ["Ram", "Sanjay"],
    "Class 2": ["Sanjeev", "Ravi"],
    "Class 3": ["Mohit", "Rohit"]
};

const classSelect = document.getElementById("classSelect");
if (classSelect) {
    classSelect.addEventListener("change", () => {
        const selectedClass = classSelect.value;
        const visitorListDiv = document.getElementById("visitorList");
        if (selectedClass && visitors[selectedClass]) {
            visitorListDiv.innerHTML = `<h3>Visitors for ${selectedClass}</h3><ul>${visitors[selectedClass].map(v => `<li>${v}</li>`).join("")}</ul>`;
        } else {
            visitorListDiv.innerHTML = "";
        }
    });
}
