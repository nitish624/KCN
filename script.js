// toggle function 
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    if (menu.style.transform === "translateX(0px)") {
        menu.style.transform = "translateX(-100%)";
    }
    else {
        menu.style.transform =
            "translateX(0px)";
    }
}

   // search
function openSearch() {
    document.getElementById('header-main').classList.add('visible-invisible');
        document.getElementById('search-wrapper').style.display = 'flex';
            document.getElementById('searchInput').focus();
        }
        function closeSearch() {
    // 1. Header aur Search Wrapper ko handle karein
    document.getElementById('header-main').classList.remove('visible-invisible');
    document.getElementById('search-wrapper').style.display = 'none';
    
    // 2. Input box ko khali karein
    document.getElementById('searchInput').value = '';
    
    // 3. Result box ko function ke ANDAR hide karein (YE ZAROORI HAI)
    let resultBox = document.getElementById('resultDisplay');
    if (resultBox) {
        resultBox.style.display = 'none';
    }
}

// Escape key dabane par function call hoga
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeSearch();
});
        





// 1. Common Template: Jo har jagah ek jaisa card banayega
function createCardTemplate(item) {
    return `
        <div class="card-container" style="position:relative; display:inline-block;">
            <span class="info-btn" onclick="showProcess(event, '${item.process}')">info</span>
            <a href="${item.url}" class="links" target="_blank">
                <div class="service-card" data-name="${item.name}">
                    <img src="${item.img}" >
                    <p style="font-size:14px; margin:5px 0;">${item.name}</p>
                </div>
            </a>
        </div>`;
}

// 2. Home Load Function: Sirf wahi jinki type "home" hai
async function loadHomeCards() {
    try {
        const response = await fetch('https://nitish624.github.io/KCN/services.json');
        const data = await response.json();
        const homeGrid = document.getElementById('home-grid'); // Aapka Home container ID
        
        let homeHtml = "";
        data.forEach(item => {
            if (item.type === "home") {
                homeHtml += createCardTemplate(item);
            }
        });
        homeGrid.innerHTML = homeHtml;
    } catch (err) {
        console.error("Home cards error:", err);
    }
}

// 3. Search Function: Jo pure JSON (Sare Cards) ko search karega
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

        data.forEach(item => {
            if (item.name.toLowerCase().includes(input)) {
                searchHtml += createCardTemplate(item);
                found = true;
            }
        });

        resultContent.innerHTML = found ? searchHtml : "<p>No results found</p>";
        resultBox.style.display = "block";
    } catch (err) {
        console.error("Search error:", err);
    }
}

// Modal HTML ko body mein add karein (Ek hi baar)
document.body.insertAdjacentHTML('beforeend', `
    <div id="infoModal" class="modal-overlay">
        <div class="modal-content">
            <h3>Info about the service</h3>
            <p id="processText"></p>
            <button class="close-modal" onclick="closeModal()">Close</button>
        </div>
    </div>
`);

function showProcess(event, text) {
    // Ye line website khulne se rokegi
    event.preventDefault(); 
    event.stopPropagation(); 

    document.getElementById('processText').innerText = text;
    document.getElementById('infoModal').style.display = 'flex';
}


function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// 4. Modal Fix: Taki website na khule
function showProcess(event, text) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('processText').innerText = text;
    document.getElementById('infoModal').style.display = 'flex';
}

// Page load par chalu karein
window.onload = loadHomeCards;
