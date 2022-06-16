//BY NIKOLAY BLAGOEV
const sleep = time => new Promise(res => setTimeout(res, time, "")); //FUNCTION FROM STACKOVERFLOW

// const cyan = [0,255,236];

// const green = [61,255,152];
const green = [0.41,1.0,0.62];
// const yellow = [253,255,0];
const yellow = [0.17,1.0,0.5];
const gren = [0.23,0.96,0.6];
const cyan =  [0.49,1.0,0.5];
// const purple = 	[255,74,220];
const purple = 	[0.87,1.0,0.65];
const mid_cyan = [0.8,0.72,0.73]
const pale_orange =  [0.12,1.00,0.65];
var balls = []
// each ball is [0: x,1: y,2: velx,3: vely,4: accx,5: accy,6: time]
const orange = [0.08, 1.0, 0.62]
const blue = [0.67, 1.00,0.50];
const red = [0.99, 1.00, 0.50];
const dark_blue=[0.51, 0.99, 0.29]

const dark_cyan = [0.50, 1.00, 0.27];
const pale_yellow = [0.17, 1.00, 0.9];
const max_frame = 400
const colours = [cyan, yellow];
const front_col = [ pale_orange, purple];
console.log(colours[0])
var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var counter = 0;
var frame = 0;
let fnt_size = 200+Math.floor((canvas.width-1920)/10);
ctx.font = fnt_size+"px Impact";
var colour = colours[counter%colours.length].map((x) => x);
var frntclr = front_col[counter%front_col.length].map((x) => x);
var change = [0,0,0];
var mouseX = 0;
var ball_size = 20+Math.floor((canvas.width-1920)/100);
var mouseY = 0;
function update(e){
    mouseX =e.clientX;
    mouseY = e.clientY;
}
canvas.onmousemove = update;
async function change_canvas(){
    
    while(true){
        if(frame == 0){
            // console.log("change "+counter)
            // to_change = colours[counter]
            // colour[0]= to_change[0]
            // colour[1]= to_change[1]
            // colour[2]= to_change[2]
            counter=(counter+1)%colours.length;
            
            // change[0] = (to_change[0]-colour[0])/max_frame;
            // change[1] = (to_change[1]-colour[1])/max_frame;
            // change[2] = (to_change[2]-colour[2])/max_frame;
            
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "hsl("+ Math.floor(360*colour[0])+","+ Math.floor(100*colour[1])+"%,"+ Math.floor(100*colour[2])+"%)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "hsl("+ Math.floor(360*frntclr[0])+","+ Math.floor(100*frntclr[1])+"%,"+ Math.floor(100*frntclr[2])+"%)";
        ctx.textAlign = "center";
        ctx.fillText("NEON GENESIS",canvas.width/2, canvas.height/2);
        
        for(const ball of balls){
            ctx.beginPath();
            ctx.arc(ball[0], ball[1], Math.max(1,ball_size-ball_size*Math.exp(-(245-ball[6])/40)), 0, Math.PI*2);
            // console.log(20-20*Math.exp(-(500-ball[6])/140))
            ctx.fill();
            ctx.closePath();
            ball[6]+=1;
            ball[0]+=ball[2];
            ball[1]+=ball[3];
            ball[2]+=ball[4];
            
            ball[3]+=ball[5];
            
        }
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, ball_size, 0, Math.PI*2);
            // console.log(20-20*Math.exp(-(500-ball[6])/140))
        ctx.fill();
        ctx.closePath();
        balls=balls.filter(ball=>ball[6]<200)
        c1 = Math.E**(-((frame/(max_frame*0.4))**2))
     
        if(front_col[(counter)%front_col.length][0]>front_col[(counter+1)%front_col.length][0]){
            
            frntclr[0]=c1*(front_col[(counter)%front_col.length][0]-1)+(1-c1)*(front_col[(counter+1)%front_col.length][0]);
            if(frntclr[0]<=0){
                frntclr[0] = 1+frntclr[0]
            }
            
        }else{
            
            frntclr[0]=c1*front_col[(counter)%front_col.length][0]+(1-c1)*(front_col[(counter+1)%front_col.length][0]-1);
            if(frntclr[0]<=0){
                frntclr[0] = 1+frntclr[0]
            }
        }
        
        colour[0]=c1*colours[(counter)%colours.length][0]+(1-c1)*colours[(counter+1)%colours.length][0];
        colour[1]=c1*colours[(counter)%colours.length][1]+(1-c1)*colours[(counter+1)%colours.length][1];
        colour[2]=c1*colours[(counter)%colours.length][2]+(1-c1)*colours[(counter+1)%colours.length][2];
        // frntclr[0]=c1*front_col[(counter)%front_col.length][0]+(1-c1)*front_col[(counter+1)%front_col.length][0];
        frntclr[1]=c1*front_col[(counter)%front_col.length][1]+(1-c1)*front_col[(counter+1)%front_col.length][1];
        frntclr[2]=c1*front_col[(counter)%front_col.length][2]+(1-c1)*front_col[(counter+1)%front_col.length][2];
        if (frame%10==0){
            var angle = Math.random()*Math.PI/2 - Math.PI/4;
            // console.log(angle)
            balls.push([mouseX,mouseY,2*Math.sin(angle),-3*Math.cos(angle),0.001*Math.sin(angle),0.01,0])
        }
        
        
        
        frame=(frame+1)%max_frame
        
        
        await sleep(10);
    }
}
window.onresize = ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let fnt_size = 200+Math.floor((canvas.width-1920)/10);
    console.log(fnt_size)
    ball_size = 20+Math.floor((canvas.width-1920)/100);
    ctx.font = fnt_size+"px Impact";
};
change_canvas()