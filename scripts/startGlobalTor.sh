#!/bin/bash
iptables -t nat -A PREROUTING -i eth0 -p tcp --syn -j REDIRECT --to-ports 9040
echo '0' | sudo tee /proc/sys/net/ipv4/conf/eth0/forwarding
