def stock_list(books, categories):
    if len(books) == 0 or len(categories) == 0:
        return ""
    cat_counts = count_books(books, categories)
    return " - ".join(["({} : {})".format(k, cat_counts[k]) for k in categories])

def count_books(books, categories):
    counts = dict.fromkeys(categories, 0)
    for b in books:
        if b[0] not in counts:
            counts[b[0]] = 0
        counts[b[0]] += int(b.split()[1])
    return counts
