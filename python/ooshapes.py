#! /usr/bin/env python
# CodeWars OO shapes kata
import math

class Shape(object):
    def __init__(self):
        pass
    def __cmp__(self, other):
        if self.area > other.area:
            return 1
        elif self.area < other.area:
            return -1
        else:
            return 0

class Square(Shape):
    def __init__(self, side):
        self.side = side
        self.area = side*side

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width*height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
        self.area = base*height/2.0

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
        self.area = radius*radius*math.pi

class CustomShape(Shape):
    def __init__(self, area):
        self.area = area
