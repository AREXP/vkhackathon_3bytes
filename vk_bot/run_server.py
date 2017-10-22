#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from flask import Flask, request
from yaml import safe_load
from attrdict import AttrDict

import os

from vk_sender import VKSender
from api_sender import APISender
from utils import (
    get_help_message, create_courses_list, prepare_lesson, prepare_overview,
    get_man_message
)

app = Flask(__name__)


def get_config(path):
    with open(path) as instream:
        config = AttrDict(safe_load(instream))
    return config


@app.route('/', methods=['POST', 'GET'])
def main():
    try:
        if request.json['type'] != 'message_new':
            return 'ok'
        if 'CONFIG' in os.environ:
            config = get_config(os.environ['CONFIG'])
        else:
            print 'No config provided'
        print 'Args', request.args
        print 'Got JSON', request.json
        json = request.json['object']
        vk = VKSender(
            config.VK.PATH, config.VK.TOKEN, config.VK.API_VERSION,
            json['user_id']
        )
        api = APISender(config.API.PATH, json['user_id'])
        command = json['body'].strip().lower()
        message = 'test'
        attachments = None

        if ' ' in command:
            command, args = command.split(' ', 1)
        print 'COMMAND', command
        good_command = any(
            command == def_command
            for def_command in config.commands
        )
        if not good_command or command == '/help':
            message = get_help_message(config.commands)
        elif command in ['/show_courses', '/leave']:
            courses = api.get_courses()
            message = create_courses_list(courses)
        elif command == '/take_course':
            course_id = args
            resp = api.get_lesson(course_id)
            print 'take', resp
            message = prepare_lesson(resp['body'])
            if resp['body']['attachments']:
                attachments = ','.join([
                    '{}-{}_{}'.format(obj['type'], abs(int(obj['owner'])), obj['media'])
                    for obj in resp['body']['attachments']
                ])
            api.update_state(resp['course_id'], resp['lesson_id'])
            print 'afte all'
        elif command in ['/next', '/prev']:
            direction = command[1:]
            resp = api.get_last_lesson(direction)
            is_end = resp['do_update']
            print 'IS_END', is_end
            print 'RESP', resp
            message = prepare_lesson(resp['body'], is_end, direction)
            if isinstance(resp['body'], dict) and resp['body']['attachments']:
                attachments = ','.join([
                    '{}-{}_{}'.format(obj['type'], obj['owner'], obj['media'])
                    for obj in resp['body']['attachments']
                ])
                print attachments
            api.update_state(resp['course_id'], resp['lesson_id'])
        elif command == '/comment':
            resp = api.get_last_lesson()
            is_end = resp['do_update']
            if is_end == 2:
                api.send_review(args, resp['course_id'])
                message = 'Спасибо за ваш отзыв'
            else:
                message = (
                    'Вы не можете оставить отзыв о курсе, т.к. ещё не '
                    'прошли последний урок'
                )
        elif command == '/overview':
            titles = api.get_titles(args)
            message = prepare_overview(titles)
        elif command == '/progress':
            progress = api.get_progress()
            message = 'Текущий прогресс по вашим курсам\n'.join(progress)
        elif command == '/answer':
            message = api.send_quiz(args)
        elif command == '/start':
            message = get_man_message()

        vk.send_message(message, attachments)
    except Exception as e:
        print e.message
        print e
    finally:
        return 'ok'


if __name__ == '__main__':
    main()
