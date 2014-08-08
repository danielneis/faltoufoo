$(function() {

    $("#add").on('submit', function(evnt) {
        if (!$("#when").val()) {
            $("#whengroup").addClass("has-error");
            $(".whenhelp").removeClass("hidden");
            evnt.preventDefault();
        } else {
            $("#whengroup").removeClass("has-error");
        }

        if (!$("#where").val() || !$("#wherelat").val() || !$("#wherelon").val()) {
            $("#wheregroup").addClass("has-error");
            $(".wherehelp").removeClass("hidden");
            evnt.preventDefault();
        } else {
            $("#wheregroup").removeClass("has-error");
        }

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
             $( "#where" ).val( ui.item.display_name);
             $( "#wherelon" ).val( ui.item.lon);
             $( "#wherelat" ).val( ui.item.lat);
             return false;
         }

    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
         return $( "<li>" ).append( "<a>" + item.display_name + "</a>" ).appendTo( ul );
    };

    $("#when").datepicker({ minDate: -7, maxDate: "+0D" });
    $("#when").datepicker( "option", "dateFormat", 'dd/mm/yy' );
});
