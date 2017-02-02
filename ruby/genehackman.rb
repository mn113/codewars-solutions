# NOT TESTED

$genes = "ACGT"
$rogues = "BDEFHIJKLMNOPQRSUVWXYZ"

def build_bad_genome(length):
    genome = ''
    prng = Random.new
    length.times do
        genome += (prng.rand(1) < 0.85) ? $genes[prng.rand($genes.length-1)] : $rogues[prng.rand($rogues.length-1)]
    end
    p genome
end

def only_goods(chain):
    chain.map!{ |c| $genes.include?(c) }
end

def only_bads(chain):
    chain.map!{ |c| !$genes.include?(c) }
end

def tag_aliens(genome):
    # Copy original chain & replace all rogues:
    xenome = genome[0,genome.length].map { |x| $rogues.include(x) ? '.' : x }
end

def get_sequence_bounds(xenome):
    # Do not delete more than 20% of good genes:
    max_good_delete = (0.2 * only_goods(xenome).length).floor
    p "delete at max", max_good_delete, "goods"
    p bad_indexes = xenome.map.with_index { |g,i| (g == '.') ? i : nil }.compact

    # Commence search for deletable X-bound sequence having most X's:
    most_bads = 0
    start = finish = nil
    bad_indexes.each do |bi|
        a = z = bi  # sequence end markers
        seq = xenome[a]
        # Keep adding to seq:
        while z < xenome.length and only_goods(seq).length <= max_good_delete
            z += 1
            seq << xenome[z]
        end
        # Prune any good genes from seq's tail:
        while $genes.includes?(seq[-1]) { seq.pop }
        p a, seq
        # Test final seq against previous:
        if only_bads(seq).length > most_bads
            most_bads = only_bads(seq).length
            start = a
            finish = start + seq.length
        end
    end
    p start, finish
end

def search_genome(genome):
    p xenome = tag_aliens(genome)

    [start,finish] = get_sequence_bounds(xenome)

    if (start >= 0) && (finish > 0) && (start < finish):
        return [start, finish, genome[start:finish]]
    else "No sequence found."
end

p search_genome(build_bad_genome(200))
