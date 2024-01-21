const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image
const downloadImage = (image) => {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.src = image.url;

    imgElement.onload = () => {
      resolve(imgElement);
    };

    imgElement.onerror = () => {
      reject(new Error(`Failed to load image's URL: ${image.url}`));
    };
  });
};

// Function to download all images in parallel
const downloadImagesParallel = async () => {
  try {
    const downloadedImages = await Promise.all(images.map(downloadImage));
    displayImages(downloadedImages);
  } catch (error) {
    console.error(error.message);
  }
};

// Function to display the images in the output div
const displayImages = (images) => {
  output.innerHTML = "";
  images.forEach((img) => {
    output.appendChild(img);
  });
};

// Event listener for the button click
btn.addEventListener("click", downloadImagesParallel);
