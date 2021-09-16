iptables -t nat -I PREROUTING -i eth0 -p udp --dport 53 -j DNAT --to-destination 192.168.1.1:54
iptables -t nat -A OUTPUT -p udp --dport 53 -j REDIRECT --to-ports 54
echo 1 > /proc/sys/net/ipv4/ip_forward
