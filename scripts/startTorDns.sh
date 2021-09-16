iptables -t nat -I PREROUTING -i eth0 -p udp --dport 53 -j DNAT --to-destination 192.168.1.66:9053
iptables -t nat -A OUTPUT -p udp --dport 53 -j REDIRECT --to-ports 9053