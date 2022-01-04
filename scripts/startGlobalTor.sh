#!/bin/bash
iptables -t nat -A PREROUTING -i eth0 -p tcp --syn -j REDIRECT --to-ports 9040
