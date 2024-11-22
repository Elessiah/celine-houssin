function switch_pushed_button (name)
{
    let buttons = document.querySelectorAll('.NavigationButtons');

    buttons.forEach(function(element) {
        element.style.backgroundColor = '#F1D0C7';
    })
    if (name === "post-operation" || name === "pre-operation")
        name = "accueil";
    console.log(name);
    let target = document.getElementById('BP' + name);
    target.style.backgroundColor = '#D8A9C1';
}