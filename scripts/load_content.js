

load_content();

function load_content() {

const url = new URL(window.location);
let page = url.searchParams.get('p');

if (page === null)
{
    page = "accueil";
    url.searchParams.set('p', page);
    window.history.pushState({}, '', url);
}

switch_pushed_button(page);

fetch('src/' + page + '.html').then(response => {
    if (!response.ok) {
        throw new Error ('Erreur : ' + response.status);
    }
    return response.text();
}).then(data => {
    document.getElementById('content').innerHTML = data
}).catch(error => {
    console.error('Erreur lors du chargement du fichier html:', error);
});
}