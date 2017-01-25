#! /usr/bin/env python
# CodeWars OO shapes kata

from bs4 import BeautifulSoup
import urllib2

class Leaderboard(object):
    def __init__(self):
        self.position = {0:None}
    def addRow(self, user):
        i = max(self.position.keys()) + 1
        self.position[i] = user

class User(object):
    def __init__(self, name, clan, honor):
        self.name = name
        self.clan = clan
        self.honor = honor

def parseHtml(html):
    board_list = []
    soup = BeautifulSoup(html)
    rows = soup.find_all('tr')   # there is only 1 table on page
    for row in rows[1:]:
        td1 = row.contents[1].strings    # generator
        kyu = td1.next()
        name = td1.next()
        clan = row.contents[2].string
        if clan == None:
            clan = ''
        honor = int(row.contents[3].stripped_strings.next())    # to number
        #print name, clan, honor
        board_list.append(User(name, clan, honor))
    return board_list

def solution():
    lb = Leaderboard()
    data = parseHtml(urllib2.urlopen('https://www.codewars.com/users/leaderboard').read())
    for user in data:
        lb.addRow(user)
    del lb.position[0]    # hacky way to make length correct
    return lb
    
