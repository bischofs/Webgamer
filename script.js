var scene, camera, renderer;
var character, ball1, ball2, ball3;
var shapeMaterial, characterMaterial, ball1Material, ball2Material, ball3Material;
var geometry;
var ball1StartX = 150, ball1StartY = 50, ball1StartZ = 0;
var ball2StartX = 100, ball2StartY = -50, ball2StartZ = 0;
var ball3StartX = 50, ball3StartY = 0, ball3StartZ = 0;
var characterStartX = 0, characterStartY = 0, characterStartZ = 0;
var lives, xSpeed = 0.5, ySpeed = 0.5;
var ball1HDirection, ball1VDirection, ball2HDirection, ball2VDirection, ball3HDirection, ball3VDirection;
var leftSide, rightSide, topSide, bottomSide;
var startTime, stopTime;
var  currentTime;

function init() {
	startTime = getTime();
	/* SCENE */
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 1000);

	/* CAMERA */
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 100;
	scene.add(camera);

	/* Renderer */
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	/* Character */
	lives = 5;
	characterMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'Textures/mario.jpeg' ), overdraw: false } );
	character = new THREE.Mesh( new THREE.CubeGeometry(10, 10, 10, 10, 10, 10, characterMaterial, 6), characterMaterial );
	character.position.z = characterStartZ;
	character.position.x = characterStartX;
	character.position.y = characterStartY;
	scene.add(character);

	/* BALL1 */
	ball1Material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'Textures/rock.jpg' ), overdraw: false } );
	ball1 = new THREE.Mesh( new THREE.SphereGeometry(10, 100, 100), ball1Material);
	ball1.position.z = ball1StartZ;
	ball1.position.x = ball1StartX;
	ball1.position.y = ball1StartY;
	ball1HDirection = "left";
	ball1VDirection = "down";
	scene.add(ball1);

	/* BALL2 */
        ball2Material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'Textures/rock.jpg' ), overdraw: false } );
        ball2 = new THREE.Mesh( new THREE.SphereGeometry(10, 100, 100), ball2Material);
        ball2.position.z = ball2StartZ;
        ball2.position.x = ball2StartX;
        ball2.position.y = ball2StartY;
        ball2HDirection = "right";
        ball2VDirection = "up";
        scene.add(ball2);

	/* BALL3 */
        ball3Material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'Textures/rock.jpg' ), overdraw: false } );
        ball3 = new THREE.Mesh( new THREE.SphereGeometry(10, 100, 100), ball2Material);
        ball3.position.z = ball3StartZ;
        ball3.position.x = ball3StartX;
        ball3.position.y = ball3StartY;
        ball3HDirection = "left";
        ball3VDirection = "up";
        scene.add(ball3);


	/* MOUSE */
	document.onmousemove = handleMouseMove;

	/* LIGHTS */
	var ambientLight = new THREE.AmbientLight(0x111111);
	scene.add(ambientLight);

	/* Render Image */
	render();
}

init();

/* ACTION */
function render() {
	leftSide = -150;
        rightSide = 150;
        topSide = 75;
        bottomSide = -75;

	var randomXSpeed = randomFromInterval(1,5) * 0.001;
        var randomYSpeed = randomFromInterval(1,5) * 0.001;

    currentTime = (new Date).getTime() - startTime;
    var currentSeconds = currentTime/1000;
    $('#time')[0].innerHTML = currentSeconds + " seconds";

    xSpeed += randomXSpeed;
    ySpeed += randomYSpeed;
    requestAnimationFrame(render);

	moveBall(ball1, 1);
	ball1.rotation.z += 0.05;
	moveBall(ball2, 2);
	ball2.rotation.z += 0.05;
	moveBall(ball3, 3);
	ball3.rotation.z += 0.05;
	checkForHit(ball1);
	checkForHit(ball2);
	checkForHit(ball3);





	renderer.render(scene, camera);
}

function moveBall(obj, ballNum){
	if (ballNum == 1){
		if (obj.position.x < leftSide){ ball1HDirection = "right"; }
	        else if (obj.position.x > rightSide){ ball1HDirection = "left"; }

		if (obj.position.y < bottomSide){ ball1VDirection = "up"; }
        	else if (obj.position.y > topSide){ ball1VDirection = "down"; }

        	if (ball1HDirection == "right"){
                	obj.position.x += xSpeed;
                	if (ball1VDirection == "up"){ obj.position.y += ySpeed; }
                	else { obj.position.y -= ySpeed; }
        	} else {
        	        obj.position.x -= xSpeed;
        	        if (ball1VDirection == "up"){ obj.position.y += ySpeed; }
        	        else { obj.position.y -= ySpeed; }
        	}
	} else if (ballNum == 2){
	        if (obj.position.x < leftSide){ ball2HDirection = "right"; }
                else if (obj.position.x > rightSide){ ball2HDirection = "left"; }

                if (obj.position.y < bottomSide){ ball2VDirection = "up"; }
                else if (obj.position.y > topSide){ ball2VDirection = "down"; }

                if (ball2HDirection == "right"){
                        obj.position.x += xSpeed;
                        if (ball2VDirection == "up"){ obj.position.y += ySpeed; }
                        else { obj.position.y -= ySpeed; }
                } else {
                        obj.position.x -= xSpeed;
                        if (ball2VDirection == "up"){ obj.position.y += ySpeed; }
                        else { obj.position.y -= ySpeed; }
                }
	} else if (ballNum == 3){
                if (obj.position.x < leftSide){ ball3HDirection = "right"; }
                else if (obj.position.x > rightSide){ ball3HDirection = "left"; }

                if (obj.position.y < bottomSide){ ball3VDirection = "up"; }
                else if (obj.position.y > topSide){ ball3VDirection = "down"; }

                if (ball3HDirection == "right"){
                        obj.position.x += xSpeed;
                        if (ball3VDirection == "up"){ obj.position.y += ySpeed; }
                        else { obj.position.y -= ySpeed; }
                } else {
                        obj.position.x -= xSpeed;
                        if (ball3VDirection == "up"){ obj.position.y += ySpeed; }
                        else { obj.position.y -= ySpeed; }
                }
        }

}

function handleMouseMove(event) {
	character.position.x = (event.clientX - 700) * 0.5;
	character.position.y = -(event.clientY - 350) * 0.5;

	if(character.position.x > rightSide){ character.position.x = rightSide; }
	if(character.position.x < leftSide){ character.position.x = leftSide; }
	if(character.position.y > topSide){ character.position.y = topSide; }
	if(character.position.y < bottomSide){ character.position.y = bottomSide; }
}

function checkForHit(obj){
	if (character.position.x > obj.position.x - 10 && character.position.x < obj.position.x + 10
         && character.position.y > obj.position.y - 10 && character.position.y < obj.position.y + 10
         && character.position.z > obj.position.z - 10 && character.position.z < obj.position.z + 10){
		character.position.x = characterStartX;
		character.position.y = characterStartY;
		character.position.z = characterStartZ;

		obj.position.x = randomFromInterval(-150,150);
		obj.position.y = randomFromInterval(-50,50);
		obj.position.z = 0;

		xSpeed = randomFromInterval(1,5) * .001;
		ySpeed = randomFromInterval(1,5) * .001;
		lives--;

		stopTime = getTime();
		document.getElementById("livesLeft").innerHTML = "Lives Left: " + lives;
		alert("You were hit by the soccer ball, but you stayed alive for: "
			+ (stopTime - startTime) / 1000 + " Seconds.  You have "
			+ lives + " lives left.  Good Luck!");
        	if (lives == 0){
                        var ans = confirm("You lost would you like to continue");
                        if(ans){
                                lives = 5;
                        }
                }
		document.getElementById("livesLeft").innerHTML = "Lives Left: " + lives;
		startTime = getTime();
	}
}

function getTime(){
  var day = new Date();
  return day.getTime();
}

function randomFromInterval(from,to){ return Math.floor(Math.random()*(to-from+1)+from); }
