DPI installing
------------
don't forget to replace the username with your username:
```
mkdir build
cd build
wget https://openresty.org/download/openresty-1.19.9.1.tar.gz   # or latest release from https://openresty.org/en/download.html
tar -xzvf openresty-1.19.9.1.tar.gz
mv openresty-1.19.9.1 openresty
git clone https://github.com/fffonion/lua-resty-openssl
git clone https://github.com/fffonion/lua-resty-openssl-aux-module
git clone https://github.com/Evengard/lua-resty-getorigdest-module
git clone https://github.com/iryont/lua-struct
git clone https://github.com/Evengard/lua-resty-socks5
cd openresty
./configure --prefix=/home/username/nginxdpi --with-cc=gcc --add-module=/home/username/build/lua-resty-openssl-aux-module --add-module=/home/username/build/lua-resty-openssl-aux-module/stream --add-module=/home/username/build/lua-resty-getorigdest-module/src
make -j4 && make install

cp -r /home/username/build/lua-resty-getorigdest-module/lualib/* /home/username/nginxdpi/lualib/ 
cp -r /home/username/build/lua-resty-openssl/lib/resty/* /home/username/nginxdpi/lualib/resty/
cp -r /home/username/build/lua-resty-openssl-aux-module/lualib/* /home/username/nginxdpi/lualib/
cp /home/username/build/lua-resty-socks5/socks5.lua /home/username/nginxdpi/lualib/resty/
cp /home/username/build/lua-struct/src/struct.lua /home/username/nginxdpi/lualib/
```
edit /scripts/startDpi.sh:
replace /home/user with your username

edit /DPI/nginx.conf:
Replace 127.0.0.1 and 9050 with the host and port of your SOCKS5 server!
Also replace 192.168.1.1 with the IP address of the DNS server that you want to resolve the hosts to.

TOR installing
------------
```
apt install tor
nano nano /etc/tor/torrc
```
Paste in file and replace 192.168.1.1 to your ip:
```
SocksPort 192.168.1.66:9050
SocksPort 127.0.0.1:9050
SocksPolicy accept 192.168.1.0/24
RunAsDaemon 1
DataDirectory /var/lib/tor

VirtualAddrNetwork 10.0.0.0/10
AutomapHostsOnResolve 1
TransPort 9040
DNSPort 192.168.1.1:9053
```

Remaining actions
------------
Open scripts/startDefaultDns.sh and replace 192.168.1.1:53 to your static dns
Open scripts/startDpi.sh and replace user to your username
Open scripts/startTorDns.sh and replace 192.168.1.1:9053 to your Tor DNS ip and port
