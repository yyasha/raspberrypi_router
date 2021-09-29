let switchbtnDpi = document.getElementById('switchbtn-dpi');
let switchbtnTor = document.getElementById('switchbtn-tor');
let switchbtnTorDNS = document.getElementById('switchbtn-tordns');
let buttonSub = document.getElementById('buttonSub')
let buttonAddAllDomains = document.getElementById('switchbtn-AddAllDomains')
let buttonMasking = document.getElementById('switchbtn-Masking')
let buttonGlobalTor = document.getElementById('switchbtn-GlobalTor')

let switchesNowState = [false, false, false, false, false, false];

const json = JSON.parse(serverJson);

if (json.domains != null){                 // generating html
    let inner = ''
    console.log(json.domains);
    for (var i = 0; i < json.domains.length; i++) {
        inner += '<div class="list_elem">' + json.domains[i] + ' ' + '<button id="removebutton-'+ i +'" class="rmButton">Remove</button>' + '</div>' + '<br/>' + '\n';
        console.log(inner)
    }
    document.getElementById('List').innerHTML = inner;
}

if (json.subnets != null){
    console.log(json.subnets)
}


if (json.state.dpi != switchesNowState[0]){
    switchesNowState[0] = !switchesNowState[0];
    switchbtnDpi.classList.toggle('switch-on');
}

if (json.state.tor != switchesNowState[1]){
    switchesNowState[1] = !switchesNowState[1];
    switchbtnTor.classList.toggle('switch-on');
}

if (json.state.tor_dns != switchesNowState[2]){
    switchesNowState[2] = !switchesNowState[2];
    switchbtnTorDNS.classList.toggle('switch-on');
}

if (json.state.all_list != switchesNowState[3]){
    switchesNowState[3] = !switchesNowState[3];
    buttonAddAllDomains.classList.toggle('switch-on');
}

if (json.state.masking != switchesNowState[4]){
    switchesNowState[4] = !switchesNowState[4];
    buttonMasking.classList.toggle('switch-on');
}

if (json.state.global_tor != switchesNowState[5]){
    switchesNowState[5] = !switchesNowState[5];
    buttonGlobalTor.classList.toggle('switch-on');
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

buttonAddAllDomains.onclick = function() {
    buttonAddAllDomains.classList.toggle('switch-on');
    switchesNowState[3] = !switchesNowState[3];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/switchstate/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(switchesNowState[3] == true){
        xhr.send("allblocked=true");
    } else {
        xhr.send("allblocked=false");
    }
};

buttonMasking.onclick = function() {
    buttonMasking.classList.toggle('switch-on');
    switchesNowState[4] = !switchesNowState[4];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/switchstate/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(switchesNowState[4] == true){
        xhr.send("masking=true");
    } else {
        xhr.send("masking=false");
    }
};

buttonGlobalTor.onclick = function() {
    buttonGlobalTor.classList.toggle('switch-on');
    switchesNowState[5] = !switchesNowState[5];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/switchstate/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(switchesNowState[5] == true){
        xhr.send("globaltor=true");
    } else {
        xhr.send("globaltor=false");
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

    document.getElementById("domain").value = "";
    document.getElementById("subnet").value = "";
};