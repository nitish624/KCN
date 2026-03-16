// 1. Global Variables (Top of the file)
let isLoggedIn = false; 

// 2. Toggle Menu Function
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    if (menu.style.transform === "translateX(0px)") {
        menu.style.transform = "translateX(-100%)";
    } else {
        menu.style.transform = "translateX(0px)";
    }
}

// 3. Search UI Functions
function openSearch() {
    document.getElementById('header-main').classList.add('visible-invisible');
    document.getElementById('search-wrapper').style.display = 'flex';
    document.getElementById('searchInput').focus();
}

function closeSearch() {
    document.getElementById('header-main').classList.remove('visible-invisible');
    document.getElementById('search-wrapper').style.display = 'none';
    document.getElementById('searchInput').value = '';
    let resultBox = document.getElementById('resultDisplay');
    if (resultBox) resultBox.style.display = 'none';
}

// 4. Login Functionality (Multiple Passwords)
document.querySelectorAll('.login-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const userPass = prompt("Enter Password to Unlock All Services:");
        if (!userPass) return;

        try {
            const response = await fetch('https://nitish624.github.io/KCN/services.json');
            const data = await response.json();
            
            // Password verification logic
            if (data.passwords && data.passwords.includes(userPass)) {
                isLoggedIn = true; 
                alert("Logged In");
                loadHomeCards(); // UI Refresh
                if(document.getElementById('searchInput').value) filterResults();
            } else {
                alert("Incorrect Password!");
            }
        } catch (err) {
            console.error("Login Error:", err);
        }
    });
});

// 5. Card Template
function createCardTemplate(item) {
    return `
    <div class="card-container" style="position:relative; display:inline-block;">
        <span class="info-btn" onclick="showProcess(event, '${item.process || 'No info available'}')">inf.</span>
        <a href="${item.url}" class="links" target="_blank">
            <div class="service-card" data-name="${item.name}">
                <img src="${item.img}">
                <p style="font-size:14px; margin:5px 0;">${item.name}</p>
            </div>
        </a>
    </div>`;
}

// 6. Load Home Cards (Fixed for new JSON structure)
async function loadHomeCards() {
    try {
        const response = await fetch('https://nitish624.github.io/KCN/services.json');
        const data = await response.json();
        
        // Zaroori Check: Kya data.services ek array hai?
        if (!data.services || !Array.isArray(data.services)) {
            throw new TypeError("JSON mein 'services' array nahi mila!");
        }

        const homeGrid = document.getElementById('home-grid'); 
        let homeHtml = "";
        
        data.services.forEach(item => {
            if (item.type === "home") {
                // Restricted Card Logic: Login ke bina hide rahega
                if (!item.restricted || isLoggedIn) {
                    homeHtml += createCardTemplate(item);
                }
            }
        });
        homeGrid.innerHTML = homeHtml;
    } catch (err) {
        console.error("Home cards error:", err);
    }
}

// 7. Search/Filter Results
// 7. Search/Filter Results (Updated to use searchName)
async function filterResults() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let resultBox = document.getElementById('resultDisplay');
    let resultContent = document.getElementById('search-results-content');
    
    if (input.length === 0) {
        resultBox.style.display = "none";
        return;
    }

    try {
        const response = await fetch('https://nitish624.github.io/KCN/services.json');
        const data = await response.json();
        let searchHtml = "";
        let found = false;

        data.services.forEach(item => {
            // Hum 'searchName' se match kar rahe hain
            // Fallback: Agar searchName nahi hai, toh name se check karega
            let nameToSearch = (item.searchName || item.name).toLowerCase();

            if (nameToSearch.includes(input)) {
                if (!item.restricted || isLoggedIn) {
                    searchHtml += createCardTemplate(item);
                    found = true;
                }
            }
        });
        
        resultContent.innerHTML = found ? searchHtml : "<p>No results found</p>";
        resultBox.style.display = "block";
    } catch (err) {
        console.error("Search error:", err);
    }
}


// 8. Modal Functions
document.body.insertAdjacentHTML('beforeend', `
    <div id="infoModal" class="modal-overlay">
        <div class="modal-content">
            <h3>Service Information</h3>
            <p id="processText"></p>
            <button class="close-modal" onclick="closeModal()">Close</button>
        </div>
    </div>
`);

function showProcess(event, text) {
    event.preventDefault(); 
    event.stopPropagation(); 
    document.getElementById('processText').innerText = text;
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// Initialize
window.onload = loadHomeCards;
