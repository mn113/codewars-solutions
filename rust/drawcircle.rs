use std::f32;
use std::char;

fn circle(radius: i32) -> String {
    if radius < 0 { return String::from(""); }
    if radius == 0 { return String::from("\n"); }

    let mut output = String::new();
    let width = 2 * radius - 1;
    let midpoint = vec![radius-1,radius-1];

    for y in 0i32..width {
        for x in 0i32..width {
            if distance(&midpoint, vec![y,x]) < radius as f32 {
                output.push_str("█");
            }
            else {
                output.push_str(" ");
            }
        }
        output.push_str("\n");
    }
    return output;
}

fn distance(a: &Vec<i32>, b: Vec<i32>) -> f32 {
    let dx = b[0] - a[0];
    let dy = b[1] - a[1];
    ((dx*dx + dy*dy) as f32).sqrt()
}
