document.getElementById('image1').addEventListener('change', () => showPreview('image1', 'preview1'));
document.getElementById('image2').addEventListener('change', () => showPreview('image2', 'preview2'));
document.getElementById('processButton').addEventListener('click', processImages);

async function processImages() {
    const image1File = document.getElementById('image1').files[0];
    const image2File = document.getElementById('image2').files[0];

    if (!image1File || !image2File) {
        alert('Please upload both images.');
        return;
    }

    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    const image1 = await loadImage(image1File);
    const image2 = await loadImage(image2File);

    let images = [image2, image1];
    const collections = [];

    while (images[0].width >= 256) {
        const appendedImage = appendImages(images[0], images[1]);
        collections.push(appendedImage);

        images = images.map(img => shrinkImage(img));
        images = images.concat(images); // Append two copies
    }

    let finale = collections[0];
    for (let i = 1; i < collections.length; i++) {
        finale = appendImages(finale, collections[i]);
    }
    await exportAsWebP(finale, `final_ring.webp`);

    loadingIndicator.style.display = 'none';
    alert('Processing and export complete!');
}

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function appendImages(image1, image2) {
    const canvas = document.createElement('canvas');
    canvas.width = image1.width + image2.width;
    canvas.height = image1.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image1, 0, 0);
    ctx.drawImage(image2, image1.width, 0);
    return canvas;
}

function shrinkImage(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width / 2;
    canvas.height = image.height / 2;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function exportAsWebP(canvas, filename) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            saveAs(blob, filename);
            resolve();
        }, 'image/webp');
    });
}

function showPreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    preview.innerHTML = '';
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}
