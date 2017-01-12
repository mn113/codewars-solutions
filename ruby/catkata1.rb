def peaceful_yard(yard, min_distance)
    cats = ['R','M','L'].map { |c| find_cat_coords(yard, c) }.compact

    if cats.length >= 2
        cats.combination(2).to_a.all? do |pair|
            dist_squared(pair[0], pair[1]) >= min_distance**2
        end
    else
        true
    end
end

def find_cat_coords(yard, initial)
    cat = []
    yard.each.with_index do |row, y|
        cat[1] = y
        cat[0] = row.index(initial)
        break if !cat[0].nil?
    end
    return cat if !cat[0].nil?
    nil
end

def dist_squared(p1, p2)
    (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2
end
