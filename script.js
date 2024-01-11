const heightSlider = document.getElementById("heightSlider");
const widthSlider = document.getElementById("widthSlider");
const heightInput = document.getElementById("heightInput");
const widthInput = document.getElementById("widthInput");
const hideControl = document.getElementById("hideControl");
const showControl = document.getElementById("showControl");
const showControlDiv = document.getElementById("showControlDiv");
const control = document.getElementById("control");
const circle = document.getElementById("circle");
const toggleCircle = document.getElementById("toggleCircle");
const circleText = document.getElementById("circleText");
const aspectRatio = document.getElementById("aspectRatio");
const input_video = document.getElementsByClassName("input_video")[0];
const output_canvas = document.getElementsByClassName("output_canvas")[0];
function resetValue() {
  input_video.style.height = "400px";
  input_video.style.width = "711px";
  output_canvas.style.height = "400px";
  output_canvas.style.width = "711px";
  heightSlider.value = 400;
  widthSlider.value = 711;
  heightInput.value = 400;
  widthInput.value = 711;
  aspectRatio.value = "16/9";
}

function keepBounds() {
  if (heightSlider.value > 711) heightSlider.value = 711;
  if (widthSlider.value > 400) widthSlider.value = 400;
  if (heightSlider.value < 100) heightSlider.value = 100;
  if (widthSlider.value < 100) widthSlider.value = 100;
}

heightSlider.addEventListener("input", () => {
  input_video.style.height = `${heightSlider.value}px`;
  output_canvas.style.height = `${heightSlider.value}px`;
  heightInput.value = heightSlider.value;
});

widthSlider.addEventListener("input", () => {
  input_video.style.width = `${widthSlider.value}px`;
  output_canvas.style.width = `${widthSlider.value}px`;
  widthInput.value = widthSlider.value;
});

heightInput.addEventListener("input", () => {
  keepBounds();
  input_video.style.height = `${heightInput.value}px`;
  output_canvas.style.height = `${heightInput.value}px`;
  heightSlider.value = heightInput.value;
});

widthInput.addEventListener("input", () => {
  input_video.style.width = `${widthInput.value}px`;
  output_canvas.style.width = `${widthInput.value}px`;
  widthSlider.value = widthInput.value;
});

hideControl.addEventListener("click", () => {
  if (hideControl.checked) {
    control.style.display = "none";
    showControlDiv.style.display = "flex";
    showControl.checked = false;
  } else {
    control.style.display = "block";
    showControlDiv.style.display = "none";
    showControl.checked = true;
  }
});

showControl.addEventListener("click", () => {
  if (showControl.checked) {
    control.style.display = "block";
    hideControl.checked = false;
    showControlDiv.style.display = "none";
  } else {
    control.style.display = "none";
    hideControl.checked = true;
    showControlDiv.style.display = "flex";
  }
});

toggleCircle.addEventListener("click", () => {
  if (circle.style.display == "none") {
    circle.style.display = "block";
    circleText.innerText = "Circle is visible";
  } else {
    circle.style.display = "none";
    circleText.innerHTML = "Circle is hidden";
  }
});

aspectRatio.addEventListener("click", () => {
  input_video.style.aspectRatio = aspectRatio.value;
  output_canvas.style.aspectRatio = aspectRatio.value;
});
