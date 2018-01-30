source = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789#*"
target = [
    "2","22", "222", "3","33", "333", "4","44", "444",
    "5","55", "555", "6","66", "666", "7","77", "777", "7777",
    "8","88", "888", "9","99", "999", "9999", "0", "00", "1", "2222",
    "3333", "4444", "5555", "6666", "77777", "8888", "99999", "#", "*"]

def sequence(phrase):
    seq = [target[source.index(c)] for c in phrase.upper()]
    for i in range(len(seq) - 1):
        if seq[i][-1] == seq[i+1][0]:
            seq[i] += "p"
    return "".join(seq)
