# Perform a single pass of a Bubblesort algorithm:
def bubblesort_once(input_list):
    jumble = input_list[:]
    i = 0
    while i + 1 < len(jumble):
        if jumble[i] > jumble[i+1]:
            jumble[i], jumble[i+1] = jumble[i+1], jumble[i]
        i += 1
    return jumble
