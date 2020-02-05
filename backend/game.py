def make_grid(n):
    grid = []
    for x in range(n):
        row = []
        for y in range(n):
            row.append(0)
        grid.append(row)
    return grid


def check_result(grid, n, x, y, turn):
    result = None
    value = grid[x][y]

    # Check Row
    for i in range(n):
        if (grid[x][i] != value):
            break
        if (grid[x][i] == value and i == n - 1):
            result = True

    # Check Column
    if result is None:
        for i in range(n):
            if (grid[i][y] != value):
                break
            if (grid[i][y] == value and i == n - 1):
                result = True

    # Check Diagonal Right
    if result is None and x == y:
        for i in range(n):
            if (grid[i][i] != value):
                break
            if (grid[i][i] == value and i == n - 1):
                result = True

    # Check Diagonal Left
    if result is None and x + y == n - 1:
        for i in range(n):
            if (grid[i][n - i - 1] != value):
                break
            if (grid[i][n - i - 1] == value and i == n - 1):
                result = True

    if result is None and turn == n * n:
        result = "draw"

    return result
