def make_grid(n):
    grid = []
    for x in range(n):
        row = []
        for y in range(n):
            row.append(0)
        grid.append(row)
    return grid


def check_result(grid, n, x, y, turn, failed_lines):
    result = None
    value = grid[x][y]

    # Check Row
    if x not in failed_lines["row"]:
        count = 0

        for i in range(n):
            if grid[x][i] == value:
                count = count + 1
            elif grid[x][i] != 0:
                failed_lines["row"].append(x)
                break

        if count == n:
            result = True

    # Check Column
    if y not in failed_lines["col"] and result is None:
        count = 0

        for i in range(n):
            if grid[i][y] == value:
                count = count + 1
            elif grid[i][y] != 0:
                failed_lines["col"].append(y)
                break

        if count == n:
            result = True

    # Check Diagonal Right
    if "right" not in failed_lines["diagonal"] and result is None and x == y:
        count = 0

        for i in range(n):
            if (grid[i][i] == value):
                count = count + 1
            elif (grid[i][i] != 0):
                failed_lines["diagonal"].append("right")
                break

        if count == n:
            result = True

    # Check Diagonal Left
    if "left" not in failed_lines["diagonal"] and result is None and x + y == n - 1:
        count = 0

        for i in range(n):
            if (grid[i][n - i - 1] == value):
                count = count + 1
            elif (grid[i][n - i - 1] != 0):
                failed_lines["diagonal"].append("left")
                break

        if count == n:
            result = True

    if len(failed_lines["row"]) == n and len(failed_lines["col"]) == n and len(failed_lines["diagonal"]) == 2:
        result = "draw"

    return {'result': result, "failed_lines": failed_lines}
