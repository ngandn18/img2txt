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