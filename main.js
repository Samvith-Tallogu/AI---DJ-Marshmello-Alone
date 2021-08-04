song = "";
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

    circle(leftWristX, leftWristY, 20);
    NumberLeftWristY = Number(leftWristY);
    NumberLeftWristY_decimal = floor(NumberLeftWristY);
    volume = NumberLeftWristY_decimal/500;
    document.getElementById('volume').innerHTML = volume;
    song.setVolume(volume);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}