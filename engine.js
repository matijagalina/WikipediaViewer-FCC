$(document).ready(function(){
    const list = $('#list');
    
    $('#randomBtn').click(function(e){
        window.open('https://en.wikipedia.org/wiki/Special:Random');
    });

    $('#searchBtn').click(function(){
        list.html("");
        let inputValue = $('#searchField').val();
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php',
            data: {
              action: 'query',
              list: 'search',
              srsearch: inputValue,
              format: 'json',
              formatversion: 2
            },
            dataType: 'jsonp',
            success: function (response) {
                let searchResults = response.query.search;
                $.each(searchResults, function(i, item){
                    let listItem = $('<li></li>').appendTo(list);
                    listItem.html('<i class="fas fa-external-link-alt"></i> ' + item.title + '<br>' + item.snippet);

                    listItem.click(function(){
                        window.open('https://en.wikipedia.org/?curid=' + item.pageid);
                    });
                });
            }
          });
    });
});