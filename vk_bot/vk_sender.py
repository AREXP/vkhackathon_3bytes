#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests


class VKSender(object):
    def __init__(self, vk_host, token, version, user_id):
        self.host = vk_host
        self.base_payload = {
            'access_token': token,
            'v': version,
            'peer_id': user_id,
        }

    def send_message(self, message=None, attachments=None):
        payload = self.base_payload.copy()
        if message is not None:
            payload['message'] = message
        if attachments is not None:
            payload['attachment'] = attachments
        print payload
        self._get('messages.send', payload)

    def _get(self, method, params):
        path = '{}/{}'.format(self.host, method)
        requests.get(path, params=params)
        return 'ok'
