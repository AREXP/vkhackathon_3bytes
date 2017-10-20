#!/usr/bin/env python
# -*- coding: utf-8 -*-
from argparse import ArgumentParser
from flask import Flask, request
from yaml import safe_load
from attrdict import AttrDict
from pprint import pprint

import os


args = ArgumentParser()
args.add_argument('--config', type=str, required=True)

app = Flask(__name__)


def get_config(path):
    with open(path) as instream:
        config = AttrDict(safe_load(instream))
    return config


def vk_method(api_path, method, params, token):
    pass

def api_method(host, port, method, params):
    pass

@app.route('/', methods=['POST', 'GET'])
def main():
    if 'CONFIG' in os.environ:
        print get_config(os.environ['CONFIG'])
    print dir(request)
    print request.args
    print request.json
    return '65fb6aa5'

if __name__ == '__main__':
    main()
