package main

import (
	"bufio"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/exec"
)

type Switches struct {
	dpi bool
	tor bool
	tor_dns bool
}

var sw = Switches{true, true, false}
var old_sw = Switches{true, true, false}
var swi [3]bool

func main() {
	updateSwitches()

	// go filesToIptables()

	fmt.Println("Server started!")

	http.HandleFunc("/", homepage)
	http.HandleFunc("/unblock/", unblock)
	http.HandleFunc("/switchstate/", switchState)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images"))))
	http.ListenAndServe(":8080", nil)
}

func homepage(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		fmt.Println("GET /")
		tmpl, _ := template.ParseFiles("templates/index.html")
		
		swi[0] = sw.dpi
		swi[1] = sw.tor
		swi[2] =sw.tor_dns

		tmpl.Execute(w, swi)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func unblock(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()                     // Parses the request body
    domain := r.Form.Get("domain")
    subnet := r.Form.Get("subnet")
    fmt.Println(domain)
    fmt.Println(subnet)
}

func switchState(w http.ResponseWriter, r *http.Request)  {
	r.ParseForm()
	dpiSwitch := r.Form.Get("dpi")
	torSwitch := r.Form.Get("tor")
	tordnsSwitch := r.Form.Get("tordns")

	if dpiSwitch != "" {
		fmt.Println("DPI switch on = " + dpiSwitch)
		if dpiSwitch == "true"{
			sw.dpi = true
		} else if dpiSwitch == "false"{
			sw.dpi = false
		}
	}

	if torSwitch != "" {
		fmt.Println("TOR switch on = " + torSwitch)
		if torSwitch == "true"{
			sw.tor = true
		} else if torSwitch == "false"{
			sw.tor = false
		}
	}

	if tordnsSwitch != "" {
		fmt.Println("TOR DNS switch on = " + tordnsSwitch)
		if tordnsSwitch == "true"{
			sw.tor_dns = true
		} else if tordnsSwitch == "false"{
			sw.tor_dns = false
		}
	}

	updateSwitches()

}

func updateSwitches()  {

	if sw.dpi == true && old_sw.dpi == false {
		go updateDpi("start")
		old_sw.dpi = sw.dpi
	} else if sw.dpi == false && old_sw.dpi == true {
		go updateDpi("stop")
		old_sw.dpi = sw.dpi
	}

	if sw.tor == true && old_sw.tor == false {
		go updateTor("start")
		old_sw.tor = sw.tor
	} else if sw.tor == false && old_sw.tor == true {
		go updateTor("stop")
		old_sw.tor = sw.tor
	}

	if sw.tor_dns == true && old_sw.tor_dns == false {
		go updateTorDns("start")
		old_sw.tor_dns = sw.tor_dns
	} else if sw.tor_dns == false && old_sw.tor_dns == true {
		go updateTorDns("stop")
		old_sw.tor_dns = sw.tor_dns
	}
}

func updateDpi(state string)  {
	if state == "start" {
		fmt.Println("Starting DPI...")
	} else {
		fmt.Println("Stopping DPI...")
	}
}

func updateTor(state string)  {
	if state == "start" {
		fmt.Println("Starting TOR...")
	} else {
		fmt.Println("Stopping TOR...")
	}
}

func updateTorDns(state string)  {
	if state == "start" {
		fmt.Println("Starting TOR DNS...")
	} else {
		fmt.Println("Stopping TOR DNS...")
	}
}

func filesToIptables(){
    file, err := os.Open("/tmp/lst/ipsum.lst")
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    cmd := exec.Command("ipset", "-N", "tornet", "nethash")
        err = cmd.Run()
        if err != nil {
            log.Println(err)
        }

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {

        fmt.Println("ipset -A tornet " + scanner.Text())

        cmd := exec.Command("ipset", "-A", "tornet", scanner.Text())
        err := cmd.Run()
        if err != nil {
            log.Println(err)
        }
    }

    fmt.Println("iptables -t nat -A OUTPUT -p tcp --syn -m set --match-set tornet dst -j REDIRECT --to-ports 9040")

    args := []string{"-t", "nat", "-A", "OUTPUT", "-p", "tcp", "--syn", "-m", "set", "--match-set", "tornet", "dst", "-j", "REDIRECT", "--to-ports", "9040"}
    cmd = exec.Command("iptables", args...)
    err = cmd.Run()
    if err != nil {
        log.Fatal(err)
    }

}



//iptables -t nat -I PREROUTING 1 -i eth0 -p udp --dport 53 -j DNAT --to-destination 192.168.1.8:53
//iptables -t nat -I PREROUTING 1 -i eth0 -p udp --dport 53 -j DNAT --to-destination 192.168.1.8:53
//iptables -t nat -I PREROUTING 1 -i eth0 -p udp --dport 53 -j DNAT --to-destination 192.168.1.66:9053
//iptables -t nat -I PREROUTING 1 -i eth0 -p udp --dport 53 -j DNAT --to-destination 127.0.0.1:9053

// sudo iptables -t nat -A OUTPUT -p udp --dport 53 -j REDIRECT --to-ports 9053

// sudo iptables -t nat -A PREROUTING -i eth0 -p udp -m udp --dport 53 -j REDIRECT --to-ports 9053