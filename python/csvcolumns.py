#! /usr/bin/env python
# Select specific columns from csv data

def csv_columns(csv, indices):
    indices = sorted(list(set(indices)))
    goodrows = []
    rows = csv.split('\n')
    for row in rows:
        data = row.split(',')
        newrow = ','.join([data[i] for i in indices if i < len(data)])
        if len(newrow) > 0:
            goodrows.append(newrow)

    if len(goodrows) > 0:
        return '\n'.join(goodrows)
    else:
        return ''
