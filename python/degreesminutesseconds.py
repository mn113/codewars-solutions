# convert decimal degrees to unsigned degrees, minutes, seconds with cardinal direction

from math import floor

def convert_to_dms(dd_lat, dd_long):
    return (dd_to_dms(float(dd_lat), 'lat'), dd_to_dms(float(dd_long), 'long'))

def dd_to_dms(degrees, axis):
    c = compass_point(degrees, axis)
    degrees = abs(degrees)

    d = floor(degrees)
    tmp = (degrees - d) * 60
    m = floor(tmp)
    s = (tmp - m) * 60
    s = round(s, 3)

    return '{0:03d}*{1:02d}\'{2:06.3f}"{3}'.format(d, m, s, c)

def compass_point(degrees, axis):
    compass = {
        'lat': ['N', 'S'],
        'long': ['E', 'W']
    }
    if degrees >= 0: sign = 0
    else: sign = 1
    return compass[axis][sign]

