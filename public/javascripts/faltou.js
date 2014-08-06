$(function() {
    L.Icon.Default.imagePath = '/images';
    var map = L.map('map');

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 5,
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.setView([-27.57, -48.62], 11);

    $("#add").on('submit', function(evnt) {
        evnt.preventDefault();
        $.ajax({
            url: '/add',
            type: 'PUT',
            sucess: function(result) {
            },
            data: {lon: $( "#where-lon" ).val(), lat: $( "#where-lat" ).val()}
        });
    });

    var cache = {};
    $("#where").autocomplete({
         minLength: 2,
         source: function( request, response ) {
             var term = request.term;
             if ( term in cache ) {
                 response( cache[ term ] );
                 return;
             }
             var searchurl = "http://open.mapquestapi.com/nominatim/v1/search?format=json&q="+$("#where").val();
             $.get(searchurl, function(data) {
                 locations = [];
                 $.each(data, function(index, obj) {
                     locations.push(obj);
                 })
                 cache[ term ] = locations;
                 response( locations );
             });
         },
         focus: function( event, ui ) {
             $( "#where" ).val( ui.item.display_name);
             return false;
         },
         select: function( event, ui ) {
             $( "#where-lon" ).val( ui.item.lon);
             $( "#where-lat" ).val( ui.item.lat);
             return false;
         }

    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
         return $( "<li>" ).append( "<a>" + item.display_name + "</a>" ).appendTo( ul );
    };
});
