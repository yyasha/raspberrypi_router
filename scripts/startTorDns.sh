iptables -t nat -I PREROUTING -i eth0 -p udp --dport 53 -j DNAT --to-destination 192.168.1.1:9053
