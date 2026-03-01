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
            document.getElementById('header-main').classList.remove('visible-invisible');
            document.getElementById('search-wrapper').style.display = 'none';
            document.getElementById('searchInput').value = '';
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") closeSearch();
        });
        
// filter function 
/*
async function filterResults() {
    let Input = document.getElementById('searchInput').value.toLowerCase();
    let ResultBox = document.getElementById('resultDisplay');
    let resultContent = document.getElementById('search-results-content');
    let localLinks = document.querySelectorAll('.home-grid .links');
    
    resultContent.innerHTML = "";
    
    if (Input.length > 0) {
        let found = false;
        
        // 1. Apni Website ke Local Cards check karein
        localLinks.forEach(link => {
            let card = link.querySelector('.service-card');
            let nameAttr = card ? card.getAttribute('data-name') : null;
            if (nameAttr && nameAttr.toLowerCase().includes(Input)) {
                resultContent.appendChild(link.cloneNode(true));
                found = true;
            }
        });
        
        // 2. JSON File se External Data Fetch Karein
        try {
            // Apni dusri site ki JSON file ka link yahan dalein
            const response = await fetch('https://nitish624.github.io/KCN/services.json');
            const externalData = await response.json();
            
            externalData.forEach(item => {
                if (item.name.toLowerCase().includes(Input)) {
                    // Naya Card HTML banayein
                    let externalCard = `
                    
    <div class="card-container" style="position:relative;">
        <span class="info-btn" onclick="showProcess(event, '${item.process}')" >info</span>
            <a href="${item.url}" class="links" target="_blank">
                <div class="service-card" style="border: 2px solid blue; ">
                                <img src="${item.img}" alt="${item.name}" >
                                <p>${item.name}</p>
                </div>
            </a></div>`;
                    
                    resultContent.insertAdjacentHTML('beforeend', externalCard);
                    found = true;
                }
            });
        } catch (err) {
            console.warn("JSON fetch failed:", err);
        }
        
        if (found) {
            ResultBox.style.display = "block";
        } else {
            resultContent.innerHTML = "<p style='text-align:center; color:blue;'>No results found</p>";
            ResultBox.style.display = "block";
        }
    } else {
        ResultBox.style.display = "none";
    }
}

// Modal HTML ko body mein add karein (Ek hi baar)
document.body.insertAdjacentHTML('beforeend', `
    <div id="infoModal" class="modal-overlay">
        <div class="modal-content">
            <h3>Info about</h3>
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
*/





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
