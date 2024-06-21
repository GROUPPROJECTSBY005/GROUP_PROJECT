class Dino {
    constructor(ctx) {
      this.ctx = ctx;
      this.width = 44;
      this.height = 47;
      this.x = 50;
      this.y = ctx.canvas.height - this.height - 10;
      this.yVelocity = 0;
      this.gravity = 0.6;
      this.jumpStrength = 10;
      this.isJumping = false;
  
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !this.isJumping) {
          this.isJumping = true;
          this.yVelocity = -this.jumpStrength;
        }
      });
    }
  
    update() {
      this.y += this.yVelocity;
      this.yVelocity += this.gravity;
  
      if (this.y > this.ctx.canvas.height - this.height - 10) {
        this.y = this.ctx.canvas.height - this.height - 10;
        this.isJumping = false;
      }
    }
  
    draw() {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  export default Dino;
  