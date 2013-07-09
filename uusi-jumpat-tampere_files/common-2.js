function linkData() {
    $('tr').each(function() {
       var placeId = $(this).attr('data-placeid');
       if(placeId != null) {
           var pe = $('td.place', this);
           pe.html('<a href="/liikunta/paikat#' + placeId + '">' + pe.html() + '</a>');
       }

       var trainerId = $(this).attr('data-trainerid');
       if(trainerId != null) {
           var pe = $('td.trainer', this);
           pe.html('<a href="/liikunta/ohjaajat/' + trainerId + '">' + pe.html() + '</a>');
       }
   });
}

function showTrainer() {
    var showTrainerId = getUrlParameter('showTrainer');

    $('a[href^="/liikunta/ohjaajat/"]').each(function() {
       var trainerId = resolveTrainerId($(this));
       if(trainerId == showTrainerId) {
           $(this).parent().parent().addClass('highlight');
       }
    });
}

function showPlace() {
    var showPlaceId = getUrlParameter('showPlace');

    $('a[href^="/liikunta/paikat#"]').each(function() {
       var placeId = resolvePlaceId($(this));
       if(placeId == showPlaceId) {
           $(this).parent().parent().addClass('highlight');
       }
    });
}


function resolveTrainerId(link) {
    return (link.attr('href').match(RegExp(".*\/([^\/]*)"))||[,null])[1];
}

function resolvePlaceId(link) {
    return (link.attr('href').match(RegExp(".*#([^\/]*)"))||[,null])[1];
}

function navSelected(id) {
    $('ul#navlist > li > a#' + id).addClass('selected');
}

function setNavSelection() {
    var pageId = resolvePageId();
    if(pageId != null) {
        navSelected(pageId);
    }

    if(pageId === 'irjalan_kerho') {
        var $img = $('.header-img-container > a > img');
        $img.attr('src', $img.attr('src').replace('header.png', 'header-ip.png'));
    }
}

function resolvePageId() {
    var pages = { 
        '/jumpat-tampere': 'aikuisten_liikunta',
        '/jumpat-tampere/puistojumppa': 'puistojumppa',
        '/lasten-liikunta-tampere': 'lasten_liikunta',
        '/liikunta/tuntikuvaukset': 'tuntikuvaukset',
        '/liikunta/ohjaajat': 'ohjaajat',
        '/liikunta/paikat': 'liikuntapaikat',
        '/liikunta/hinnat': 'hinnat',
        '/ilmoittautuminen': 'ilmoittautuminen',
        '/ilmoittautuminen-aikuiset': 'ilmoittautuminen',
        '/ilmoittautuminen-lapset': 'ilmoittautuminen',
        '/seura/johto': 'johto',
        '/seura/kilta': 'kilta',
        '/kerho/irjala': 'irjalan_kerho',
        '/seura/jumpparit': 'jumpparit',
        '/seura/yhteystiedot': 'yhteystiedot',
        '/seura/palaute': 'palaute',
        '/seura': 'seura' };

    var pageName = ((""+location).match(RegExp('.*:\/\/[^\/]*(\/[^?#]*)'))||[,null])[1];

    if(pageName in pages) {
        return pages[pageName];
    }

    for(var i in pages) {
        if(pageName.indexOf(i) != -1) {
            return pages[i];
        }
    }

    if( (""+location).indexOf('uusi-jumpat-tampere.html') != -1) {
      return 'aikuisten_liikunta';
    }

    if( (""+location).indexOf('uusi-puistojumppa.html') != -1) {
      return 'puistojumppa';
    }

    if( (""+location).indexOf('uusi-lasten-liikunta-tampere.html') != -1) {
      return 'lasten_liikunta';
    }

    if( (""+location).indexOf('uusi-iltapaivatoiminta.html') != -1) {
      return 'irjalan_kerho';
    }

    if( (""+location).indexOf('uusi-yhteystiedot-ja-palaute.html') != -1) {
      return 'yhteystiedot';
    }

    if( (""+location).indexOf('uusi-seura.html') != -1) {
      return 'seura';
    }

    return 'etusivu';
}

function getUrlParameter(name) {
    return decodeURIComponent(
        (location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
    );  
}

function getUrlAnchor() {
    var url = "" + location;
    if(url.indexOf('#') == -1) {
        return null;
    }

    return url.substring(url.indexOf('#') + 1);
}

function renderTrainerlink(id, path) {
    var trainerId = ((""+location).match(RegExp('http:\/\/.*\/([^\/]*)'))||[,null])[1];
    $('#'+id).html('<a href="/liikunta/'+path+'?showTrainer='+ trainerId + '">Näytä tämän ohjaajan vetämät jumpat</a>');
}

function highlightDescription(link) {
    $('div.description').removeClass('highlight');
    var descriptionId = ((""+link).match(RegExp('.*#(.*)'))||[,null])[1];
    var div = $('a[name='+descriptionId+']').next();
    div.addClass('highlight');
}

$(function() {
  $("#toggle-menu").click(function() {
    $('li.secondary').toggle('slow');
  });
});