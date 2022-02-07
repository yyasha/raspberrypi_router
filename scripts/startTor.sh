iptables -t nat -A OUTPUT -p tcp --syn -m set --match-set tornet dst -j REDIRECT --to-ports 9040
