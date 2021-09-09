package main

import(
    "fmt"
    "bufio"
    "log"
    "os"
    "os/exec"
)

func main(){
    filesToIptables()
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


// ipset -N tornet nethash
// ipset -A tornet 218.188.80.0/24
// ipset -L
// iptables -t nat -A OUTPUT -p tcp --syn -m set --match-set tornet dst -j REDIRECT --to-ports 9040
// -m set --match-set tornet dst