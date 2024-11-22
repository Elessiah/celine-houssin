function set_content(name)
{
    let url = new URL(window.location);
    url.searchParams.set('p', name);
    window.history.pushState({}, '', url);
    load_content();
}