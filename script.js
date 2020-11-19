var userId = '614589';
var apiKey = 'fda97d69ba595b494273012486b5dea0';

var boyData = {
    day:12,
    month:3,
    year:1992,
    hour:2,
    min:23,
    lat:19.132,
    lon:72.342,
    tzone:5.5
};

var girlData = {
    day:12,
    month:3,
    year:1992,
    hour:2,
    min:23,
    lat:19.132,
    lon:72.342,
    tzone:5.5
};

var boyDetails = {
    Nadi: "",
    sign: "",
    Naksahtra: "",
    Charan: 0
};


var girlDetails = {
    Nadi: "",
    sign: "",
    Naksahtra: "",
    Charan: 0
};

function initializeBoy() {
    var input = document.getElementById('boySearchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        boyData.lat = place.geometry.location.lat();
        boyData.lon = place.geometry.location.lng();
    });
}

function initializeGirl() {
    var input = document.getElementById('girlSearchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        girlData.lat = place.geometry.location.lat();
        girlData.lon = place.geometry.location.lng();
    });
}

function check() {
    boyDOB = document.getElementById("boyDOB").value.split("-");
    girlDOB = document.getElementById("girlDOB").value.split("-");
    
    boyData.day = parseInt(boyDOB[2])
    boyData.month = parseInt(boyDOB[1])
    boyData.year = parseInt(boyDOB[0])

    girlData.day = parseInt(girlDOB[2])
    girlData.month = parseInt(girlDOB[1])
    girlData.year = parseInt(girlDOB[0])

    boyBT = document.getElementById("boyBTime").value.split(":");
    girlBT = document.getElementById("girlBTime").value.split(":");

    boyData.hour = parseInt(boyBT[0]);
    boyData.min = parseInt(boyBT[1]);

    girlData.hour = parseInt(girlBT[0]);
    girlData.min = parseInt(girlBT[1]);

    $.when(getBoyDetailsAjax(), getGirlDetailsAjax()).done(function(respBoy, respGirl) {
        boyDetails.Naksahtra = respBoy[0].Naksahtra;
        boyDetails.Nadi = respBoy[0].Nadi;
        boyDetails.Charan = respBoy[0].Charan;
        boyDetails.sign = respBoy[0].sign;

        girlDetails.Naksahtra = respGirl[0].Naksahtra;
        girlDetails.Nadi = respGirl[0].Nadi;
        girlDetails.Charan = respGirl[0].Charan;
        girlDetails.sign = respGirl[0].sign;
        
        document.getElementById("result").innerHTML = nadi_check();
    });
    return false;
}

function getBoyDetailsAjax() {
   return $.ajax({
        url: "https://json.astrologyapi.com/v1/astro_details",
        method: "POST",
        dataType:'json',
        headers: {
            "authorization": "Basic " + btoa(userId+":"+apiKey),
            "Content-Type":'application/json'
        },
        data:JSON.stringify(boyData)
    });
}

function getGirlDetailsAjax() {
    return $.ajax({
        url: "https://json.astrologyapi.com/v1/astro_details",
        method: "POST",
        dataType:'json',
        headers: {
            "authorization": "Basic " + btoa(userId+":"+apiKey),
            "Content-Type":'application/json'
        },
        data:JSON.stringify(girlData)
    });
 }
 
function nadi_check() {
    if (boyDetails.Nadi === girlDetails.Nadi) {
        if (boyDetails.sign === girlDetails.sign) {
            if(boyDetails.Naksahtra === girlDetails.Naksahtra) {
                if(boyDetails.Charan === girlDetails.Charan){
                    return "Apki kundali mein naadi dosh hai, shastron me varnit hai nadi dosh mein vivaah bhoolkar bhi na karein";
                } else if((boyDetails.Charan + girlDetails.Charan) === 5) {
                    return "Apki kundali mein naadi dosh hai, shastron me varnit hai nadi dosh mein vivaah bhoolkar bhi na karein";
                } else {
                    return "Aap donon ki kundali mein" + boyDetails.Nadi + "naadi hai, lekin aap donon ke rashiyan aur nakshatra same hain aur charan alag alag hain, jis wajah se aapke kundali milaan mein naadi dosh khatm ho jata hai";
                }
            }
            return "Aap donon ki kundali mein" + boyDetails.Nadi + "naadi hai, lekin aap donon ki rashiyan same hain aur nakshatra alag alag hain, jis wajah se aapke kundali milaan mein naadi dosh khatm ho jata hai";
        } else if (boyDetails.Naksahtra === girlDetails.Naksahtra) {
            return "Aap donon ki kundali mein" + boyDetails.Nadi + "naadi hai, lekin aap donon ke nakshatra same hain aur rashiyan alag alag hain, jis wajah se aapke kundali milaan mein naadi dosh khatm ho jata hai";
        } else {
            return "Apki kundali mein naadi dosh hai, shastron me varnit hai nadi dosh mein vivaah bhoolkar bhi na karein";
        }
    } else {
        return "Apke kundali milaan mein naadi dosh nahin hain kyonki ap dono ki naadi alag alag hain";
    }
}

function resetFormData() {
    document.getElementById("result").innerHTML = "";
    document.getElementById("detailsForm").reset();
}

google.maps.event.addDomListener(window, 'load', initializeBoy);
google.maps.event.addDomListener(window, 'load', initializeGirl);
