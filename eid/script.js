// === YAHAN SE APNI SETTINGS CHANGE KAREIN ===

const templateImageName = 'template.jpg'; // Aapki blank image ka naam
const textColor = '#d4af37'; // Text ka color (Jaise ye ek Gold color ka code hai)
const fontSize = '60px'; // Font ka size
const fontFamily = 'Amiri'; // Font ka style

// Position Settings: In numbers ko change karke text ko aage-peeche, upar-neeche karein
const adjustX = 0; // Left/Right set karne ke liye. (Minus - me likhenge to left jayega, Plus + me right)
const adjustY = -685; // Up/Down set karne ke liye. (Minus - me upar jayega, Plus + me neeche)

// =============================================

const canvas = document.getElementById('greetingCanvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('nameInput');
const downloadBtn = document.getElementById('downloadBtn');

const image = new Image();
image.src = templateImageName; 

image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    drawGreeting();
};

nameInput.addEventListener('input', drawGreeting);

function drawGreeting() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const userName = nameInput.value;

    if (userName) {
        // Yahan font set ho raha hai, font-weight normal rakha hai
        ctx.font = `normal ${fontSize} ${fontFamily}`; 
        ctx.fillStyle = textColor; 
        ctx.textAlign = 'center';

        // X (Left/Right) ka hisaab
        const x = (canvas.width / 2) + adjustX;
        
        // Y (Up/Down) ka hisaab
        const y = canvas.height + adjustY; 

        ctx.fillText(userName, x, y);
    }
}

downloadBtn.addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    
    let fileNameName = nameInput.value ? nameInput.value.trim().replace(/\s+/g, '_') : 'Greeting';
    link.download = 'Eid_Mubarak_' + fileNameName + '.jpg';
    
    link.href = dataURL;
    link.click();
});
