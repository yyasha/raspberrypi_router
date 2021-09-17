iptables -t nat -I PREROUTING -i eth0 -p udp --dport 53 -j DNAT --to-destination 192.168.1.66:54
echo 1 > /proc/sys/net/ipv4/ip_forward
