#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <termios.h>
#include <unistd.h>

#define C_RED "\e[0;31m"
#define C_GRN "\e[0;32m"
#define C_YEL "\e[0;33m"
#define C_BLU "\e[0;34m"
#define C_MAG "\e[0;35m"
#define C_CYN "\e[0;36m"
#define C_RESET "\e[0m"

// DOS-style 'getch' function for Linux
int mygetch ( void ) {
  int ch;
  struct termios oldt, newt;
  
  tcgetattr ( STDIN_FILENO, &oldt );
  newt = oldt;
  newt.c_lflag &= ~( ICANON | ECHO );
  tcsetattr ( STDIN_FILENO, TCSANOW, &newt );
  ch = getchar();
  tcsetattr ( STDIN_FILENO, TCSANOW, &oldt );
  
  return ch;
}

void clearScreen() {
    printf("\033[H\033[J");
}

const int VALUES[] = {0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048};

int getRandomEmptyCellIndex(int grid[4][4]) {
    int i, j, emptyCells[16], emptyCellsCount = 0;

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (!grid[i][j]) {
                emptyCells[emptyCellsCount] = i * 4 + j;
                emptyCellsCount++;
            }
        }
    }

    return emptyCells[rand() % emptyCellsCount];
}

int setEmptyCellValue(int grid[4][4]) {
    int index = getRandomEmptyCellIndex(grid);
    int value = VALUES[rand() % 2 + 1];

    grid[index / 4][index % 4] = value;

    return value;
}

void printGrid(int grid[4][4]) {
    int i, j;
    char line[] = "+-----+-----+-----+-----+\n";

    printf("%s", line);

    for (i = 0; i < 4; i++) {
        printf("|");

        for (j = 0; j < 4; j++) {
            printf("%4d |", grid[i][j]);
        }

        printf("\n%s", line);
    }

    printf("\n");
}

void pressRightArrow(int grid[4][4]) {
    int i, j, k, l, value;

    for (i = 0; i < 4; i++) {
        for (j = 2; j >= 0; j--) {
            if (grid[i][j]) {
                value = grid[i][j];
                grid[i][j] = 0;

                for (k = j + 1; k < 4; k++) {
                    if (grid[i][k]) {
                        if (grid[i][k] == value) {
                            grid[i][k] *= 2;
                            break;
                        } else {
                            grid[i][k - 1] = value;
                            break;
                        }
                    } else if (k == 3) {
                        grid[i][k] = value;
                    }
                }
            }
        }
    }
}

void pressLeftArrow(int grid[4][4]) {
    int i, j, k, l, value;

    for (i = 0; i < 4; i++) {
        for (j = 1; j < 4; j++) {
            if (grid[i][j]) {
                value = grid[i][j];
                grid[i][j] = 0;

                for (k = j - 1; k >= 0; k--) {
                    if (grid[i][k]) {
                        if (grid[i][k] == value) {
                            grid[i][k] *= 2;
                            break;
                        } else {
                            grid[i][k + 1] = value;
                            break;
                        }
                    } else if (k == 0) {
                        grid[i][k] = value;
                    }
                }
            }
        }
    }
}

void pressUpArrow(int grid[4][4]) {
    int i, j, k, l, value;

    for (j = 0; j < 4; j++) {
        for (i = 1; i < 4; i++) {
            if (grid[i][j]) {
                value = grid[i][j];
                grid[i][j] = 0;

                for (k = i - 1; k >= 0; k--) {
                    if (grid[k][j]) {
                        if (grid[k][j] == value) {
                            grid[k][j] *= 2;
                            break;
                        } else {
                            grid[k + 1][j] = value;
                            break;
                        }
                    } else if (k == 0) {
                        grid[k][j] = value;
                    }
                }
            }
        }
    }
}

void pressDownArrow(int grid[4][4]) {
    int i, j, k, l, value;

    for (j = 0; j < 4; j++) {
        for (i = 2; i >= 0; i--) {
            if (grid[i][j]) {
                value = grid[i][j];
                grid[i][j] = 0;

                for (k = i + 1; k < 4; k++) {
                    if (grid[k][j]) {
                        if (grid[k][j] == value) {
                            grid[k][j] *= 2;
                            break;
                        } else {
                            grid[k - 1][j] = value;
                            break;
                        }
                    } else if (k == 3) {
                        grid[k][j] = value;
                    }
                }
            }
        }
    }
}

int main () {
    clearScreen();

    int grid[4][4] = {{0,0,0,0},
                      {0,0,0,0},
                      {0,0,0,0},
                      {0,0,0,0}};
    // initialize random seed
    time_t t;
    srand((unsigned) time(&t));

    setEmptyCellValue(grid);
    setEmptyCellValue(grid);
    printGrid(grid);

    while (1) {
        int keychar = mygetch();
        if (keychar) {
            clearScreen();
        }
        switch(keychar) {
            case 'w':
            case 65:
                pressUpArrow(grid);
                setEmptyCellValue(grid);
                printGrid(grid);
                break;
            case 's':
            case 66:
                pressDownArrow(grid);
                setEmptyCellValue(grid);
                printGrid(grid);
                break;
            case 'a':
            case 68:
                pressLeftArrow(grid);
                setEmptyCellValue(grid);
                printGrid(grid);
                break;
            case 'd':
            case 67:
                pressRightArrow(grid);
                setEmptyCellValue(grid);
                printGrid(grid);
                break;
        }
        if (keychar == 'q') {
            break;
        }
    }

    return 0;
}