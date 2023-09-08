const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

let irisPosition = { x: 0, y: 0 }; // sets default position

function updateIrisPosition(results) {
  if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
    // Assuming only one face is detected, taking the first face
    const faceLandmarks = results.multiFaceLandmarks[0];
    const irisLandmark = faceLandmarks[FACEMESH_FACE_OVAL[0][0]]; // Assuming the iris is the first point in the face oval
    irisPosition = {
      x: irisLandmark.x * canvasElement.width,
      y: irisLandmark.y * canvasElement.height,
    };
  }
}

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
        color: "#C0C0C070",
        lineWidth: 1,
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
        color: "#FF3030",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {
        color: "#FF3030",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {
        color: "#FF3030",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
        color: "#30FF30",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {
        color: "#30FF30",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {
        color: "#30FF30",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
        color: "#E0E0E0",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, { color: "#E0E0E0" });
      // Get dimensions of face
      const faceOvalLandmarks = FACEMESH_FACE_OVAL.map(
        (index) => landmarks[index]
      );
    }
    updateIrisPosition(results);
  }
  canvasCtx.restore();
}

function controlObjectWithIrisPosition() {
  const objectElement = document.getElementById("circle");
  // const speed = 5; // Adjust as needed
  objectElement.style.left =
    irisPosition.x - objectElement.offsetWidth / 2 + "px";
  objectElement.style.top =
    irisPosition.y - objectElement.offsetHeight / 2 + "px";
  requestAnimationFrame(controlObjectWithIrisPosition);
}

const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  },
});
faceMesh.setOptions({
  maxNumFaces: 2,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
faceMesh.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();

controlObjectWithIrisPosition(); //
