#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals


def get_help_message(commands):
    message = '''
    Доступные команды, которые вы можете послать нашему боту:

    {}
    '''.format('\n'.join([
        '{} - {}'.format(command, desc)
        for command, desc in sorted(commands.iteritems())
    ]))
    return message


def create_courses_list(courses):
    courses_str = '\n'.join([
        '{}. {}'.format(course_id, title)
        for course_id, title in courses
    ])
    message = '''
    Доступные на данный момент курсы:

    {}

    Для того, чтобы выбрать курс отправьте команду с номером этого курса, например "/take_course 1"
    '''.format(courses_str)
    return message


def prepare_lesson(lesson_dict, is_end=False, direction='next'):
    if is_end and direction == 'prev':
        message = '''
        Это самый первый урок курса, вы не можете переместиться раньше
        '''
    else:
        message = ''
    message += '''
    {}
    {}

    '''.format(lesson_dict['title'], lesson_dict['description'])

    if lesson_dict['questions']:
        question = lesson_dict['questions'][0]
        if question['type'] == 'MULTI_CHOICE':
            correct_num = 'Несколько правильных'
        else:
            correct_num = 'Один правильный'
        message += 'Тест: {}\n'.format(question['title'])
        message += 'Варианты ответа({}):\n'.format(correct_num)
        answers = [
            '{}) {}'.format(num, unicode(answer['value']))
            for num, answer in enumerate(question['answers'], start=1)
        ]
        message += '{}'.format('\n'.join(answers))
    if is_end and direction == 'next':
        message += '''

        К сожалению, это был последний урок этого курса.
        С остальными курсами вы можете ознакомится введя команду "/show_courses"
        Также, вы можете оставить отзыв о курсе пр помощи команды "/comment <сообщение"
        '''
    return message


def prepare_overview(titles):
    message = '''
    Содержание курса "{}"
    '''.format(titles.pop('title'))
    titles = ['{}. {}'.format(title_id, title)
              for title_id, title in sorted(titles.iteritems())]
    message += '\n'.join(titles)
    return message
