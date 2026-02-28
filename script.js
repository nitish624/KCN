// function 
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
        
// filtered search results
function filterResults() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let links = document.querySelectorAll('.services-grid .links');
    let resultBox = document.getElementById('resultDisplay');
    let resultContent = document.getElementById('search-results-content');
    
    // Purane results saaf karein
    resultContent.innerHTML = "";

    if (input.length > 0) {
        let found = false;

        links.forEach(link => {
            let card = link.querySelector('.service-card');
            let nameAttr = card ? card.getAttribute('data-name') : null;
            
            // 1. Agar data-name nahi hai to skip kar do (Error nahi aayega)
            if (!nameAttr) return; 

            // 2. Dono ko lowercase mein compare karein
            let cname = nameAttr.toLowerCase();
            
            if (cname.includes(input)) {
                // 3. Poora link clone karein taaki clickable rahe
                let clone = link.cloneNode(true); 
                resultContent.appendChild(clone);
                found = true;
            }
        });
    
        if (found) {
            resultBox.style.display = "block"; 
        } else {
            resultContent.innerHTML = "<p style='text-align:center; padding:10px;'>No results found</p>";
            resultBox.style.display = "block";
        }
    } else {
        resultBox.style.display = "none";
    }
}