$(document).ready(function(){
    $('#fullpage').fullpage({
        //options
        anchors: ['', 'skills', 'work', 'contact'],
        sectionsColor: ['#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2'],
        navigation: true,
        scrollOverflow: true,
        navigationPosition: 'right',
        navigationTooltips: ['hello', 'skills', 'work', 'contact'],
        
        afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            
            //slow load skill icons
            if(anchorLink == 'skills'){
                $(function(){
                    $('.skill-icon').each(function(currIcon){
                        $(this).delay((currIcon++) * 500).fadeTo(1000, 1);
                    })
                });
            };
        }
        
    });
});
