// Fireworks canvas setup
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let colors = ['#ff0040','#ff8000','#ffff00','#00ff00','#00ffff','#0040ff','#ff00ff'];

function resizeCanvas() {
    if(canvas){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x,y,color){
        this.x=x; this.y=y; this.color=color;
        this.radius=Math.random()*3+2;
        this.speed=Math.random()*5+2;
        this.angle=Math.random()*2*Math.PI;
        this.alpha=1;
        this.decay=Math.random()*0.01+0.005;
    }
    update(){
        this.x += Math.cos(this.angle)*this.speed;
        this.y += Math.sin(this.angle)*this.speed;
        this.alpha -= this.decay;
    }
    draw(){
        ctx.globalAlpha=this.alpha;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle=this.color;
        ctx.fill();
        ctx.globalAlpha=1;
    }
}

function createFirework(){
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height/2;
    let color = colors[Math.floor(Math.random()*colors.length)];
    for(let i=0;i<50;i++){
        particles.push(new Particle(x,y,color));
    }
}

function animate(){
    if(!ctx) return;
    ctx.fillStyle='rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,index)=>{
        p.update();
        p.draw();
        if(p.alpha<=0) particles.splice(index,1);
    });
    requestAnimationFrame(animate);
}
setInterval(createFirework, 800);
animate();

// Countdown timer (dummy, no set date)
function updateCountdown(){
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    let d=0,h=0,m=0,s=0;
    if(daysEl){ daysEl.textContent=d.toString().padStart(2,'0'); }
    if(hoursEl){ hoursEl.textContent=h.toString().padStart(2,'0'); }
    if(minutesEl){ minutesEl.textContent=m.toString().padStart(2,'0'); }
    if(secondsEl){ secondsEl.textContent=s.toString().padStart(2,'0'); }
}
setInterval(updateCountdown, 1000);

// Sound
let audio = new Audio('assets/fireworks.mp3');
audio.loop = true;
document.body.addEventListener('click', ()=>{
    audio.play().catch(e=>console.log(e));
});

// Sound toggle
const soundToggle = document.getElementById('soundToggle');
if(soundToggle){
    soundToggle.addEventListener('click', ()=>{
        if(audio.paused){ audio.play(); soundToggle.textContent='🔊'; }
        else { audio.pause(); soundToggle.textContent='🔇'; }
    });
}
