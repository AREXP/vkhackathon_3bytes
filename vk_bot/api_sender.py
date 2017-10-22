#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import requests


class APISender(object):
    def __init__(self, host, user_id):
        self.host = host
        self.user_id = user_id

    def get_courses(self):
        courses_list = self._get('courses', {'onlyActive': 1})['content']
        courses_list = self._get('courses')['content']
        return [
            (course['id'], unicode(course['title'])) for course in courses_list
        ]

    def get_last_lesson(self, direction='next'):
        json = self._get('user-states/{}'.format(self.user_id))
        print 'in get last lesson', json
        resp = {
            'body': 0,
            'course_id': 0,
            'lesson_id': 0,
            'do_update': True,
        }
        if json['content']:
            last_state = sorted(
                json['content'], key=lambda state: state['updatedAt']
            )[-1]
            print
            print 'last_state', last_state
            resp['course_id'] = last_state['course']['id']
            resp['lesson_id'] = last_state['lesson']['id']
            path = 'lessons/{}/{}'.format(resp['lesson_id'], direction)
            print path
            json = self._get(path, {'courseId': resp['course_id']})
            print 'json', json
            resp['body'] = json
            if json['isFirst']:
                resp['do_update'] = 1
            elif json['isLast']:
                resp['do_update'] = 2
        else:
            resp['body'] = 'Извините, у вас нет начатых курсов'
            resp['do_update'] = False
        print 'resp', resp
        return resp

    def get_lesson(self, course_id):
        course_id = int(course_id)
        resp = {
            'body': '',
            'course_id': 0,
            'lesson_id': 0,
            'do_update': True
        }
        available_courses = [c_id for c_id, _ in self.get_courses()]
        if course_id not in available_courses:
            resp['body'] = 'Неизвестный номер курса'
            print 'unknown', resp
            return resp
        json = self._get('user-states/{}'.format(self.user_id))
        print 'in get lessons', json

        if json['content']:
            courses = json['content']
            all_courses = {
                int(course['course']['id']): (course['lesson']['id'], course['id'])
                for course in courses
            }
            if course_id in all_courses:
                path = 'lessons/{}/next'.format(all_courses[course_id][0])
                print json
                json = self._get(path, {'courseId': course_id})
                resp['body'] = json
            else:
                path = 'lessons/first-lesson'
                resp['body'] = self._get(path, {'courseId': course_id})
        else:
            path = 'lessons/first-lesson'
            resp['body'] = self._get(path, {'courseId': course_id})
        resp['course_id'] = course_id
        resp['lesson_id'] = resp['body']['id']
        print 'resp', resp
        return resp

    def get_titles(self, course_id):
        json = self._get('lessons', {'courseId': course_id})
        titles = {
            num: les['title']
            for num, les in enumerate(json['content'], start=1)
        }
        json = self._get('courses/{}'.format(course_id))
        titles['title'] = json['title']
        return titles

    def update_state(self, course_id, lesson_id):
        if not(course_id and lesson_id):
            return
        print 'update_state'
        payload = {
            'course': {'id': course_id},
            'lesson': {'id': lesson_id},
            'vkUserId': self.user_id,
        }
        print 'update', payload
        self._post('user-states', payload)

    def send_review(self, text, course_id):
        payload = {
            'course': {'id': course_id},
            'text': text,
            'vkUserId': self.user_id
        }
        print payload
        self._post('comments', payload)

    def get_progress(self):
        json = self._get('user-states/{}'.format(self.user_id))
        if json['content']:
            courses = sorted(
                json['content'], key=lambda state: state['updatedAt'],
                reverse=True
            )
            lines = [
                '{} - {} - {}%'.format(
                    c['course']['id'], c['course']['title'],
                    c['progressInPercent']
                )
                for c in courses
            ]
            lines[0] += ' (Текущий)'
            return lines
        else:
            return ('У вас нет начатых курсов:( Начните, введя команду "/show_courses"')

    def send_quiz(self, args):
        json = self._get('user-states/{}'.format(self.user_id))
        print 'JSON', json
        if json['content']:
            last_course = sorted(
                json['content'], key=lambda state: state['updatedAt'],
            )[-1]
            lesson = last_course['lesson']['id']
            lesson = self._get('lessons/{}'.format(lesson))['content']
            question = lesson['questions'][0]
            correct_answers = {
                num for num, answer in enumerate(question['answers'])
                if answer['correct']
            }
            parsed = sorted(set(map(int, args.split())))
            if parsed == correct_answers:
                return 'Правильный ответ'
            else:
                return 'Неправильный ответ'
        return 'Неправильный ответ'

    def _get(self, method, payload=None, ret_status=None):
        path = '{}/{}'.format(self.host, method)
        resp = requests.get(path, params=payload)
        print resp.status_code, resp.url, resp.headers, resp.json()
        if ret_status is not None:
            return {'json': resp.json(), 'status': resp.status_code}
        else:
            return resp.json()

    def _post(self, method, params):
        path = '{}/{}'.format(self.host, method)
        resp = requests.post(path, json=params)
        print resp.status_code, resp.headers, resp.text, resp.url
