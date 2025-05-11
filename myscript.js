// Function to Copy Text (optimized for mobile)
function copyText() {
    const resultDiv = document.getElementById("result");
    const text = resultDiv.innerText;

    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Text copied successfully!");
}

// function copyText() {
//     const text = document.getElementById("result").innerText;

//     if (navigator.clipboard) {
//         navigator.clipboard.writeText(text).then(() => {
//             alert("Text copied successfully!");
//         }).catch(err => {
//             console.error("Error copying:", err);
//         });
//     } else {
//         alert("Copy function not supported on this device.");
//     }
// }

// Function to Save Text (works on mobile & PC)
function saveText() {
    const text = document.getElementById("result").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "extracted_text.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to Save Text as a File
function saveText_org() {
    const text = document.getElementById('result').innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "extracted_text.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function captureImage() {
    const imageInput = document.getElementById("imageInput");
    imageInput.click(); // Opens the mobile camera interface
}

function processCameraImage(event) {
    const file = event.target.files[0]; // Get selected image
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set canvas size to match the image
            canvas.width = img.width;
            canvas.height = img.height;

            // Flip the image horizontally
            ctx.translate(img.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0);

            // Convert flipped image back to file
            canvas.toBlob((blob) => {
                const flippedFile = new File([blob], file.name, { type: "image/png" });

                // Now, send flippedFile to the OCR server
                uploadImage(flippedFile);
            }, "image/png");
        };
    };

    reader.readAsDataURL(file);
}
