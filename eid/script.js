// === SETTINGS ===
const templateImageName = 'template.jpg'; 
const textColor = '#041F11'; 
const nameColor = '#0B4A28'; 
const nameFontSize = 45; // Naam ka size thoda bada rakha hai

const textStartX = 0; 
const textStartY = -180; 
const lineSpacing = 75; 

// === MESSAGES DICTIONARY ===
const langData = {
    arabic: {
        text: "عيد فطر سعيد\nأعاده الله علينا وعليكم بالخير والبركات\nتقبل الله طاعاتكم\nوجعل أيامكم مليئة بالفرح والسعادة\nكل عام وأنتم إلى الله أقرب\nوعيدكم مبارك",
        font: "'Amiri', serif",
        size: 45 
    },
    urdu: {
        text: "عید الفطر کی دلی مبارکباد!\nاللہ تعالیٰ ہماری عبادتوں\nکو قبول فرمائے اور\nاس مبارک دن کو ہمارے لیے\nخوشیوں کا باعث بنائے۔\nعید مبارک!",
        font: "'Noto Nastaliq Urdu', serif",
        size: 50 
    },
    english: {
        text: "May Allah bring you joy,\nhappiness, peace, and prosperity.\nWishing you and your family\na very happy and\nblessed Eid!\nEid Mubarak!",
        font: "'Poppins', sans-serif",
        size: 45
    },
    hindi: {
        text: "आपको और आपके परिवार को\nईद-उल-फितर की दिली मुबारकबाद।\nअल्लाह आपकी सभी\nदुआएं कबूल फरमाए और\nआपकी जिंदगी को खुशियों से भर दे।\nईद मुबारक!",
        font: "'Noto Sans Devanagari', sans-serif",
        size: 40
    },
    bangla: {
        text: "পবিত্র ঈদুল ফিতরের\nআন্তরিক শুভেচ্ছা!\nআল্লাহ আপনার রোজা ও\nইবাদত কবুল করুন এবং\nআপনার জীবনে বয়ে আনুক আনন্দ।\nঈদ মোবারক!",
        font: "'Noto Sans Bengali', sans-serif",
        size: 40
    },
    tamil: {
        text: "இனிய ஈகைத் திருநாள்\nநல்வாழ்த்துக்கள்!\nஎல்லாம் வல்ல இறைவன்\nஉங்கள் வாழ்வில்\nமகிழ்ச்சியையும் அமைதியையும் பொழியட்டும்.\nஈத் முபாரக்!",
        font: "'Noto Sans Tamil', sans-serif",
        size: 26
    },
    malayalam: {
        text: "ഹൃദയം നിറഞ്ഞ\nചെറിയ പെരുന്നാൾ ആശംസകൾ!\nഅല്ലാഹു നിങ്ങളുടെ\nപ്രാർത്ഥനകൾ സ്വീകരിക്കുകയും\nജീവിതത്തിൽ സന്തോഷം നൽകുകയും ചെയ്യട്ടെ.\nഈദ് മുബാറക്!",
        font: "'Noto Sans Malayalam', sans-serif",
        size: 24 
    },
    gujarati: {
        text: "ઈદ-ઉલ-ફિત્રની\nહાર્દિક શુભકામનાઓ!\nઅલ્લાહ તમારી દુઆઓ\nકબૂલ કરે અને\nતમારા જીવનમાં ખુશીઓ લાવે.\nઈદ મુબારક!",
        font: "'Noto Sans Gujarati', sans-serif",
        size: 40
    }
};

const canvas = document.getElementById('greetingCanvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('nameInput');
const languageSelect = document.getElementById('languageSelect');
const downloadBtn = document.getElementById('downloadBtn');

const image = new Image();

// === MAIN DRAW FUNCTION ===
function drawGreeting() {
    // Agar image ki asli width 0 hai, matlab image abhi load nahi hui, to ruk jaye
    if (!image.complete || image.naturalWidth === 0) return; 

    // Canvas ka size hamesha image ke asli size (naturalWidth) ke barabar set karein
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const userName = nameInput.value;
    const selectedLang = languageSelect.value;
    const currentData = langData[selectedLang];
    const msgFont = currentData.font;
    const msgSize = currentData.size;

    // RTL (Commas aur full stop ka fix)
    if (selectedLang === 'arabic' || selectedLang === 'urdu') {
        ctx.direction = 'rtl';
    } else {
        ctx.direction = 'ltr';
    }

    ctx.fillStyle = textColor; 
    ctx.textAlign = 'center';
    
    const x = canvas.width / 2;
    let y = (canvas.height / 2) + textStartY; 

    // 1. IBARAT LIKHNA
    const lines = currentData.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        ctx.font = `normal ${msgSize}px ${msgFont}`;
        ctx.fillText(lines[i], x, y);
        y += lineSpacing; 
    }

    // 2. NAAM LIKHNA (Language ke apne makhsoos font mein)
    if (userName) {
        y += 20; 
        // Yahan 'bold' hata kar 'normal' kar diya hai taaki font crash na ho
        ctx.font = `normal ${nameFontSize}px ${msgFont}`; 
        ctx.fillStyle = nameColor; 
        ctx.fillText(userName, x, y);
    }
}

// === IMAGE LOAD HONE KA PERFECT TAREEQA ===
document.fonts.ready.then(function() {
    // Pehle batayein ki load hone par kya karna hai
    image.onload = drawGreeting;
    
    // Agar koi error aaye toh console mein pata chal jaye
    image.onerror = function() {
        console.error("Tasweer load nahi ho saki. Image ka naam ya size check karein.");
    };

    // Sabse aakhir mein image ka link (src) dein
    image.src = templateImageName; 
});

// Event Listeners
nameInput.addEventListener('input', drawGreeting);
languageSelect.addEventListener('change', drawGreeting);

downloadBtn.addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    let fileNameName = nameInput.value ? nameInput.value.trim().replace(/\s+/g, '_') : 'Greeting';
    link.download = 'DailyAzkar_Eid_Mubarak_' + fileNameName + '.jpg';
    link.href = dataURL;
    link.click();
});
