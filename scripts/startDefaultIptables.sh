echo '1' | sudo tee /proc/sys/net/ipv4/conf/eth0/forwarding
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
