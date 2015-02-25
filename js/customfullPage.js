$(document).ready(function(){
    $('#fullpage').fullpage({
        //options
        anchors: ['', 'skills', 'work', 'contact'],
        sectionsColor: ['#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2'],
        navigation: true,
        scrollOverflow: true,
        navigationPosition: 'right',
        navigationTooltips: ['hello', 'skills', 'work', 'contact']
    });
});