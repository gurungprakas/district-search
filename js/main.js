const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
let districts;

//get districts

 const getDistricts = async () => {
    const res = await fetch('../data/districts.json');
    districts = await res.json();
 };

// filter districts 
const searchDistricts = searchText => {
    //get matches to current text input
    let matches = districts.filter(district => {
        const regex = new RegExp(`^${searchText}`, `gi`);
        return district.name.match(regex);
    });

    //clear when input or matches are empty
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    
    outputHtml(matches);
};

// Show results in HLML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map( match => `
        <div class="card card-body mb-1">
        <h4 class="text-capitalize">${match.name},
        <span class="text-primary">${match.headquarter}</span><br>
        Province: ${match.province}
        </h4>
        
        <small> Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `).join('');

        matchList.innerHTML = html;
    }
};
window.addEventListener('DOMContentLoaded', getDistricts);
search.addEventListener('input', () => searchDistricts(search.value))