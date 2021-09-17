#!/bin/sh
/opt/nginxdpi/bin/openresty -c /opt/nginxdpi/cfg/nginx.conf

#echo '1' | sudo tee /proc/sys/net/ipv4/conf/eth0/forwarding
#sh -c 'echo 1 > /proc/sys/net/ipv4/ip_forward'
iptables -t nat -A PREROUTING -i eth0 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 30443
iptables -t nat -A PREROUTING -i eth0 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 30443
