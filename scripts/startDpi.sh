#!/bin/sh
/opt/nginxdpi/bin/openresty -c /opt/nginxdpi/cfg/nginx.conf

echo '1' | sudo tee /proc/sys/net/ipv4/conf/eth0/forwarding
#sh -c 'echo 1 > /proc/sys/net/ipv4/ip_forward'
#iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
#iptables -A FORWARD -i eth0 -o eth1 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -t nat -A PREROUTING -i eth0 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 30443
iptables -t nat -A PREROUTING -i eth0 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 30443
