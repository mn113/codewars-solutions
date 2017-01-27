#! /usr/bin/env python
# Delete a bad section of a genome string, without losing too much data

import random, math

genes = "ACGT"
rogues = "BDEFHIJKLMNOPQRSUVWXYZ" # allow for all characters other than ACGT ?

def build_bad_genome(length):
    global genes, rogues
    genome = ''
    for i in range(length):
        if random.random() < 0.85:
            genome += random.choice(genes)
        else:
            genome += random.choice(rogues)
    #print genome
    return genome

def only_goods(chain):
    global genes
    return [c for c in chain if c in genes]

def only_bads(chain):
    global genes
    return [c for c in chain if c not in genes]

def tag_aliens(genome):
    global rogues
    # Copy original chain & replace all rogues:
    xenome = genome[:]
    for r in rogues:
        xenome = xenome.replace(r, '.')
    return xenome

def get_sequence_bounds(xenome):
    global genes
    max_good_delete = int(math.floor(0.2 * len(only_goods(xenome))))  # cannot delete more than 20% of good genes
    print "delete at max", max_good_delete, "goods"
    bad_indexes = [i for i,g in enumerate(xenome) if g == '.']
    print bad_indexes

    # Commence search for deletable X-bound sequence having most X's:
    most_bads = 0
    start = end = None
    for bi in bad_indexes:
        a = z = bi  # sequence end markers
        seq = []
        # Keep adding to seq:
        while z < len(xenome) and len(only_goods(seq)) <= max_good_delete:
            z += 1
            seq = xenome[a:z+1]
        # Prune any good genes from seq's tail:
        while seq[-1] in genes:
            seq = seq[:-1]
        print a, seq
        # Test final seq against previous:
        if len(only_bads(seq)) > most_bads:
            most_bads = len(only_bads(seq))
            start = a
            end = start + len(seq)

    print start, end
    return (start, end)

def search_genome(genome):
    xenome = tag_aliens(genome)
    print xenome

    (start,end) = get_sequence_bounds(xenome)

    if (start >= 0) and (end > 0) and (start < end):
        return (start, end, genome[start:end])
    return "No sequence found."


print search_genome(build_bad_genome(200))


# TESTS
# MUST FIND SINGLE ROGUE AT BEGINNING               - "SCATATATATATATATATATAT"
# MUST FIND SINGLE ROGUE AT END                     - "GATTACAGATTACAGATTACAX"
# MUST RETURN "No sequence found." WHEN NO ROGUES   - "AAAAAAAAAAAAAAAAAAAAAAA"
# MUST FIND FIRST SEQUENCE IF ROGUES EVENLY SPACED  - "CQCCCQCCCQCCCQCCCQCCCQC"
# MUST NOT OVERLAP END                              - "UTACTACTACTACTACUUGUGUG"
# MUST FIND STRING BOUND BY 2 ROGUES
# MUST FIND SEQUENCE WITH < 20% GOOD GENE LOSS
# IF MULTIPLE SEQUENCES, RETURN THE ONE WITH LEAST HUMAN DNA
# MUST WORK ON LONG INPUT (1000+)
'''
Astronaut Cody Warshaw has just returned from space. His post-flight medical shows an abnormality which requires immediate intervention: it appears that his DNA has been infected by an alien species!

The normal human genome is composed from four different proteins, `'A', 'C', 'G' & 'T'`, which are chained together into long sequences, e.g. `GTACAATTACCGTTGGTACCATTCGA`. NASA's microscope shows that the protein chains in Cody's chromosomes have a number of intruders, which will be represented by the remaining 22 uppercase letters from 'B' to 'Z'.

Thus, an infected protein chain might look like this: `CUTGAGETTPRCCTEAZGAC`

One such infected protein chain has been sent to your lab, where you are required to prepare for a surgery to remove as many alien proteins as possible. But, the chain can only survive being cut and re-joined once, so you are looking for *one  continuous sequence* of proteins to remove, which contains the *most number of alien proteins*, *BUT* be careful, you must not remove more than *20% of the human proteins* in the chain, or poor Cody will probably turn into an ape or something.

Your program output for the DNA-surgeon will be a 3-element array or tuple, containing the starting index and ending index of where you want to cut the chain, and the appearance of the protein chain to be removed.

For example, the above chain `CUTGAGETTPRCCTEAZGAC` contains 14 human proteins, of which no more than 2 (technically 2.8 or 20%) can be lost. The best chain to remove is `ETTPR`, starting at index 6 and ending at 11, which contains 3 alien proteins and 2 human. So your output would be `(6, 11, 'ETTPR')`.

The alien protein density will vary in your tests. So be prepared to return "No sequence found." if there is nothing you can safely remove, and be prepared for some large input strings. Finally, if there are multiple valid substrings with the same amount of alien DNA, simply return the first one encountered. Good luck!
'''
