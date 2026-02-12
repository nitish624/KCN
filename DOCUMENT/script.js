 // Data Store
        const documentsData = [
            { title: "Caste certificate/ जाति प्रमाण पत्र", desc: "1. आधार कार्ड 2. फोन नंबर और Email (वैकल्पिक) 3. पासपोर्ट साइज फोटो" },
            { title: "PAN Card", desc: "नया पैन कार्ड के लिए आधार कार्ड (मोबाइल लिंक), 2 फोटो और सिग्नेचर की ज़रूरत होती है।" },
            { title: "Aay Praman Patra", desc: "आय प्रमाण पत्र हेतु आधार कार्ड और पिछले 3 महीने की सैलरी स्लिप या आय का स्व-विवरण चाहिए।" },
            { title: "Voter ID Card", desc: "वोटर आईडी के लिए आधार कार्ड, एक फोटो और आयु प्रमाण पत्र (10th मार्कशीट या जन्म प्रमाण पत्र) लगता है।" }
        ];

        function toggleMenu() {
            document.getElementById('side-menu').classList.toggle('menu-open');
        }

        function openSearch() {
            document.getElementById('header-main').classList.add('visible-invisible');
            document.getElementById('search-wrapper').style.display = 'flex';
            document.getElementById('searchInput').focus();
        }

        function closeSearch() {
            document.getElementById('header-main').classList.remove('visible-invisible');
            document.getElementById('search-wrapper').style.display = 'none';
            document.getElementById('search-results').style.display = 'none';
            document.getElementById('searchInput').value = '';
        }

        function filterResults() {
            let input = document.getElementById('searchInput').value.toLowerCase();
            let resDiv = document.getElementById('search-results');
            resDiv.innerHTML = '';
            
            if(!input) { resDiv.style.display = 'none'; return; }

            let filtered = documentsData.filter(item => item.title.toLowerCase().includes(input));
            
            if(filtered.length > 0) {
                resDiv.style.display = 'block';
                filtered.forEach(item => {
                    let div = document.createElement('div');
                    div.className = "result-item";
                    div.innerText = item.title;
                    div.onclick = () => {
                        document.getElementById('modalTitle').innerText = item.title;
                        document.getElementById('modalBody').innerText = item.desc;
                        document.getElementById('docModal').style.display = 'flex';
                        closeSearch();
                    };
                    resDiv.appendChild(div);
                });
            } else {
                resDiv.style.display = 'none';
            }
        }

        function closeModal() {
            document.getElementById('docModal').style.display = 'none';
        }

        // Close search on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") closeSearch();
        });