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
