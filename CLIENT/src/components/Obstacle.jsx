class Obstacle {
    constructor(ctx, x, width, height, speed) {
      this.ctx = ctx;
      this.x = x;
      this.y = ctx.canvas.height - height - 10;
      this.width = width;
      this.height = height;
      this.speed = speed;
    }
  
    update() {
      this.x -= this.speed;
      if (this.x + this.width < 0) {
        this.x = this.ctx.canvas.width + this.width;
      }
    }
  
    draw() {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  export default Obstacle;

  