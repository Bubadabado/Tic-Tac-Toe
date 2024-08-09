class Board {
  constructor(rows, size) { 
    this.rows = rows;
    this.cols = rows; //currently only supports a square board
    this.size = size;

    //fill the board with slots
    this.slotSize = (size / rows);
    this.slots = [rows];
    for(let i = 0; i < this.rows; i++) {
      this.slots[i] = [this.cols];
      for(let j = 0; j < this.cols; j++) {
        //place the slot correctly by multiplying the size of the slot by the current index
        this.slots[i][j] = new Slot(i * this.slotSize, j * this.slotSize, this.slotSize);
      }
    }
  }

  //make a move. returns true if successful, false if invalid
  place(x, y, slotType) {
    //calculate i/j indexes from x/y coords
    let i = floor(x / this.slotSize);
    let j = floor(y / this.slotSize);
    if(this.isValid(i, j, slotType)) {
      this.slots[i][j].setType(slotType);
      return true;
    }
    else { return false; }
  }

  //check if the move is valid
  isValid(i, j, slotType) {
    let target = this.slots[i][j].getType();
    return target != 'X' && target != 'O';
  }

  //check if it is a winning move
  isWin(x, y) {
    //calculate i/j indexes from x/y coords
    let i = floor(x / this.slotSize);
    let j = floor(y / this.slotSize);
    let target = this.slots[i][j].getType();
    //determine the best chain of adjacent slots of the same type, supplying the directions
    let longestChain = max([1, 
        this.checkNext(i + 1, j, 1, 0, target) + this.checkNext(i, j, -1, 0, target),
        this.checkNext(i, j + 1, 0, 1, target) + this.checkNext(i, j, 0, -1, target),
        this.checkNext(i + 1, j + 1, 1, 1, target) + this.checkNext(i, j, -1, -1, target),
        this.checkNext(i + 1, j - 1, 1, -1, target) + this.checkNext(i, j, -1, 1, target)
    ]);
    return longestChain == this.rows; //if long enough, it counts as a win
  }

  //recursively check chains of the specified slot type, crawling in a given direction
  checkNext(i, j, iOff, jOff, type) {
    //if out of range or not of the specified type, don't count it
    if(i >= this.rows || j >= this.cols || i < 0 || j < 0 || this.slots[i][j].getType() != type) {
      return 0;
    } else { //otherwise, count it and check the next one
      return 1 + this.checkNext(i + iOff, j + jOff, iOff, jOff, type);
    }
  }

  //reset the board
  reset() {
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        //place the slot correctly by multiplying the size of the slot by the current index
        this.slots[i][j].setType('-');
      }
    }
  }

  //draw the board
  draw() {
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        //draw the grid using p5js functions. Shapes have a default "stroke" (outline) that serves to draw the grid
        fill(255);
        square(i * this.slotSize, j * this.slotSize, this.slotSize);
        //draw the slot's contents over the empty square
        this.slots[i][j].draw();
      }
    }
  }
}