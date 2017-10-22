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
    message = 'Доступные на данный момент курсы:\n'

    if courses:
        message += '{}\n'.format(courses_str)
        message += 'Для того, чтобы выбрать курс отправьте команду с номером этого курса, например "/take_course <course_id>"'
    else:
        message += 'Извините, сейчас нет доступных курсов'
    return message


def prepare_lesson(lesson_dict, is_end=False, direction='next'):
    if not isinstance(lesson_dict, dict):
        return lesson_dict
        print lesson_dict
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

    # if lesson_dict['questions']:
    #     question = lesson_dict['questions'][0]
    #     print question
    #     correct_num = 'Несколько правильных'
    #     message += 'Тест: {}\n'.format(question['title'])
    #     message += 'Варианты ответа({}):\n'.format(correct_num)
    #     answers = [
    #         '{}) {}'.format(num, unicode(answer['value']))
    #         for num, answer in enumerate(question['answers'], start=1)
    #     ]
    #     message += '{}'.format('\n'.join(answers))
    if is_end and direction == 'next':
        message += '''
        К сожалению, это был последний урок этого курса.
        С остальными курсами вы можете ознакомится введя команду "/show_courses"
        Также, вы можете оставить отзыв о курсе пр помощи команды "/comment <сообщение"
        Для перехода к предыдущему уроку введите /prev .'
        '''
    elif is_end and direction == 'prev':
        message += 'Для перехода к следующему уроку введите /next.'
    else:
        message += 'Для перехода к следующему уроку введите /next, к предыдущему - /prev'
    print 'LESSON TO SEND', message
    return message


def prepare_overview(titles):
    message = '''
    Содержание курса "{}"
    '''.format(titles.pop('title'))
    titles = ['{}. {}'.format(title_id, title)
              for title_id, title in sorted(titles.iteritems())]
    message += '\n'.join(titles)
    return message


def get_man_message():
    message = 'Здравствуйте, мы приветствуем вас на образовательной площадке нашей '
    message += 'группы Вконтакте. В этом сообщении мы кратко опишем, каким образом '
    message += 'происходит взаимодействие с группой.\n '
    message += 'При помощи команды /show_courses можно посмотреть все доступные курсы.'
    message += 'Начать курс можно комндой /take_course <course_id>, где course_id - '
    message += 'номер курса из команды /show_courses. '
    message += 'Курсы состоят из уроков, перемещаться по ним можно при помощи комманд '
    message += '/next и /prev. \n'
    # message += 'В случае тестового задания ответ можно отправить командой /answer <answers>,  '
    # message += 'где answers - варианты ответа, разделенные пробелом. К сожалению, на данный '
    # message += 'момент есть только одна попытка на ответ. '
    message += 'Для просмотра всех комманд воспользуйтесь командой /help. '
    return message
