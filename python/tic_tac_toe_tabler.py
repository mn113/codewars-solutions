def display_board(board, width):
    table_rows = []
    height = len(board) // width

    for row in range(height):
        a = row * width
        z = (row + 1) * width
        # Build a row of spaced cells:
        table_rows.append(" " + " | ".join(board[a:z]) + " ")
        if row + 1 < height:
            # Build a horizontal dividing row:
            table_rows.append("-" * (width * 4 - 1))

    return "\n".join(table_rows)
