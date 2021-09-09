#!/bin/bash

ip link add name dum0 type dummy
ip link set dum0 up
ip address add 192.168.1.67/24 dev dum0
