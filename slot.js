class Slot {
  constructor(x, y, size) {
    //top left hand corner coords
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = '-'; //possible types are 'X', 'O'. everything else is treated as empty
  }

  //getter / setter for the slot's type
  getType() {
    return this.type;
  }
  setType(newType) {
    this.type = newType;
  } 

  //draw the slot based on its type. Coordinates are offset to center the shapes
  draw() {
    fill(0);
    if(this.type == 'X') {
      //draw an X using 4 rects rotated around a center point
      push(); //used to temporarily store previous graphics / coordinate settings in p5js
      translate(this.x + this.size / 2, this.y + this.size / 2);
      rotate(PI / 4);
      rect(10, 0, this.size / 2 , 10);
      rotate(PI / 2);
      rect(10, -10, this.size / 2 , 10);
      rotate(PI / 2);
      rect(0, -10, this.size / 2 , 10);
      rotate(PI / 2);
      rect(0, 0, this.size / 2 , 10);
      rotate(PI / 2);
      square(0, 0, 10);
      pop();
    } else if(this.type == 'O') {
      //draw an O, 80% size of the slot
      circle(this.x + this.size / 2, this.y + this.size / 2, this.size * .8);
      //hollow it out, leaving a 10px thick O
      fill(255);
      circle(this.x + this.size / 2, this.y + this.size / 2, this.size * .8 - 10); 
    } //if not of type 'X' or 'O' draw nothing
  }
}