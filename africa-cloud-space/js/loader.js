async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const text = await response.text();
            document.getElementById(id).innerHTML = text;
            
            // Execute any scripts found in the loaded content (optional but good for robustness)
            const scripts = document.getElementById(id).querySelectorAll("script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        } else {
            console.error(`Error loading ${file}: ${response.status}`);
        }
    } catch (e) {
        console.error(`Error loading ${file}: `, e);
    }
}

// Function to initialize the specific page
function initPage() {
    // 1. Load Global Elements
    loadComponent('header-slot', 'header.html');
    loadComponent('footer-slot', 'footer.html');

    // 2. Load Page Content (Check if we are on home)
    const mainSlot = document.getElementById('main-slot');
    if (mainSlot && mainSlot.dataset.page) {
        loadComponent('main-slot', mainSlot.dataset.page);
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', initPage);