/opt/nginxdpi/bin/openresty -c /opt/nginxdpi/cfg/nginx.conf

iptables -t nat -A PREROUTING -i eth0 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 30443
iptables -t nat -A PREROUTING -i eth0 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 30443
