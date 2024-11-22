const buttons = document.querySelectorAll('.NavigationButtons');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const new_page = this.getAttribute("value");
        set_content(new_page)
    })
})