let saturat = document.getElementById("saturat");

let contrast = document.getElementById("contrast");

let brightness = document.getElementById("brightness");

let sepia = document.getElementById("sepia");

let grayscale = document.getElementById("grayscale");

let hue_rotate = document.getElementById("hue-rotate");

let blur = document.getElementById("blur");

let download = document.getElementById("download");

let reset = document.querySelector("span");

let upload = document.getElementById("upload");

let img = document.getElementById("img");

let imgBox = document.querySelector(".img-box");

let canvas = document.getElementById("canvas");

let ctxt = canvas.getContext("2d");

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = function () {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";

  let file = new FileReader();

  file.readAsDataURL(upload.files[0]);

  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    ctxt.drawImage(img, 0, 0, canvas.width, canvas.height);

    img.style.display = "none";
  };
};

let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    img.style.display = "none";
    canvas.style.display = "block";

    ctxt.filter = `
        saturate(${saturat.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hue_rotate.value}deg)
        `;
    ctxt.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

function resetValue() {
  img.style.filter = "none";
  saturat.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hue_rotate.value = "0";

  ctxt.clearRect(0, 0, canvas.width, canvas.height);
  ctxt.drawImage(img, 0, 0, canvas.width, canvas.height);
}

reset.addEventListener("click", resetValue);

reset.addEventListener("click", resetimg);

function resetimg() {
  img.style.display = "block";
  canvas.style.display = "none";
}

download.addEventListener("click", downloadImg);

function downloadImg() {
  download.href = canvas.toDataURL();
}
