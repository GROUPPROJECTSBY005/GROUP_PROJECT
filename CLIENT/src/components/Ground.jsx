class Ground {
    constructor(ctx) {
      this.ctx = ctx;
      this.x = 0;
      this.y = ctx.canvas.height - 20;
      this.width = ctx.canvas.width;
      this.height = 20;
      this.speed = 2;
    }
  
    update() {
      this.x -= this.speed;
      if (this.x < -this.width) {
        this.x = 0;
      }
    }
  
    draw() {
      this.ctx.fillStyle = 'brown';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillRect(this.x + this.width, this.y, this.width, this.height);
    }
  }
  
  export default Ground;
  