cd /tmp
mkdir build && cd build
wget https://openresty.org/download/openresty-1.19.9.1.tar.gz && tar -xzvf openresty-1.19.9.1.tar.gz
mv openresty-1.19.9.1 openresty

git clone https://github.com/fffonion/lua-resty-openssl
git clone https://github.com/fffonion/lua-resty-openssl-aux-module
git clone https://github.com/Evengard/lua-resty-getorigdest-module
git clone https://github.com/iryont/lua-struct
git clone https://github.com/Evengard/lua-resty-socks5

apt update && apt install -y iptables ipset libpcre3 libpcre3-dev zlib1g zlib1g-dev build-essential make libssl-dev

cd openresty
./configure --prefix=/tmp/nginxdpi --with-cc=gcc --add-module=/tmp/build/lua-resty-openssl-aux-module --add-module=/tmp/build/lua-resty-openssl-aux-module/stream --add-module=/tmp/build/lua-resty-getorigdest-module/src
make -j4 && make install

mkdir /opt/nginxdpi/
cp -r /tmp/build/lua-resty-getorigdest-module/lualib/* /opt/nginxdpi/lualib/ 
mkdir /opt/nginxdpi/lualib/resty/
cp -r /tmp/build/lua-resty-openssl/lib/resty/* /opt/nginxdpi/lualib/resty/
cp -r /tmp/build/lua-resty-openssl-aux-module/lualib/* /opt/nginxdpi/lualib/
cp /tmp/build/lua-resty-socks5/socks5.lua /opt/nginxdpi/lualib/resty/
cp /tmp/build/lua-struct/src/struct.lua /opt/nginxdpi/lualib/
