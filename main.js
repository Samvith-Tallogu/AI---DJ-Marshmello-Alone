song = "";
scoreleftWrist = 0;
scorerightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song = loadSound('music.mp3');
}
function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log('score Left:' + scoreleftWrist + 'Score Right:' + scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX =" + leftWristX + "LeftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
    }
}

function modelloaded() {
    console.log("Model Is Loaded!");
}

function draw() {
    image(video, 0, 0, 600, 450);

    fill('#E34234');
    stroke('#ff0000');
    if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById('speed').innerHTML = '0.5X';
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
           document.getElementById('speed').innerHTML = '1X';
           song.rate(1); 
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById('speed').innerHTML = '1.5X';
            song.rate(1.5); 
         }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById('speed').innerHTML = '2X';
            song.rate(2); 
         }
         else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById('speed').innerHTML = '2.5X';
            song.rate(2.5); 
         }
    }
    if (scoreleftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20);
        NumberLeftWristY = Number(leftWristY);
        NumberLeftWristY_decimal = floor(NumberLeftWristY);
        volume = NumberLeftWristY_decimal / 500;
        document.getElementById('volume').innerHTML = volume;
        song.setVolume(volume);
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}