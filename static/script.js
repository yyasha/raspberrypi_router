let switchbtnDpi = document.getElementById('switchbtn-dpi');
let switchbtnTor = document.getElementById('switchbtn-tor');
let switchbtnTorDNS = document.getElementById('switchbtn-tordns');
let buttonSub = document.getElementById('buttonSub')

let switchesNowState = [false, false, false];

if (switchStatsArray[0] != switchesNowState[0]){
    switchesNowState[0] = !switchesNowState[0];
    switchbtnDpi.classList.toggle('switch-on');
}

if (switchStatsArray[1] != switchesNowState[1]){
    switchesNowState[1] = !switchesNowState[1];
    switchbtnTor.classList.toggle('switch-on');
}

if (switchStatsArray[2] != switchesNowState[2]){
    switchesNowState[2] = !switchesNowState[2];
    switchbtnTorDNS.classList.toggle('switch-on');
}

switchbtnDpi.onclick = function() {
    switchbtnDpi.classList.toggle('switch-on');
    var xhr = new XMLHttpRequest();
    switchesNowState[0] = !switchesNowState[0];
    xhr.open("POST", '/switchstate/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(switchesNowState[0] == true){
        xhr.send("dpi=true");
    } else {
        xhr.send("dpi=false");
    }
};

switchbtnTor.onclick = function() {
    switchbtnTor.classList.toggle('switch-on');
    switchesNowState[1] = !switchesNowState[1];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/switchstate/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(switchesNowState[1] == true){
        xhr.send("tor=true");
    } else {
        xhr.send("tor=false");
    }
};

switchbtnTorDNS.onclick = function() {
    switchbtnTorDNS.classList.toggle('switch-on');
    switchesNowState[2] = !switchesNowState[2];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/switchstate/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(switchesNowState[2] == true){
        xhr.send("tordns=true");
    } else {
        xhr.send("tordns=false");
    }
};


buttonSub.onclick = function() {
    var input_domain = document.getElementById("domain").value;
    var input_subnet = document.getElementById("subnet").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/unblock/', true);

    //Передаёт правильный заголовок в запросе
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send("domain=" + input_domain + "&subnet=" + input_subnet);
};

