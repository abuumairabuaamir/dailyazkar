// === SETTINGS ===
const templateImageName = 'template.jpg'; 
const textColor = '#333333'; 
const nameColor = '#b8860b'; 
const nameFontSize = 50; 

const textStartX = 0; 
const textStartY = -150; // Agar text upar-neeche karna ho to ise badlein
const lineSpacing = 45; 

// === MESSAGES DICTIONARY ===
const langData = {
    arabic: {
        text: "عيد فطر سعيد،\nأعاده الله علينا وعليكم بالخير والبركات.\nتقبل الله طاعاتكم،\nوجعل أيامكم مليئة بالفرح والسعادة.\nكل عام وأنتم إلى الله أقرب،\nوعيدكم مبارك.",
        font: "'Amiri', serif",
        size: 35 
    },
    urdu: {
        text: "عید الفطر کی دلی مبارکباد!\nاللہ تعالیٰ ہماری عبادات\nکو قبول فرمائے اور\nاس مبارک دن کو ہمارے لیے\nخوشیوں کا باعث بنائے۔\nعید مبارک!",
        font: "'Noto Nastaliq Urdu', serif",
        size: 45 
    },
    english: {
        text: "May Allah bring you joy,\nhappiness, peace, and prosperity.\nWishing you and your family\na very happy and\nblessed Eid!\nEid Mubarak!",
        font: "'Poppins', sans-serif",
        size: 30
    },
    hindi: {
        text: "आपको और आपके परिवार को\nईद-उल-फितर की दिली मुबारकबाद।\nअल्लाह आपकी सभी\nदुआएं कबूल फरमाए और\nआपकी जिंदगी को खुशियों से भर दे।\nईद मुबारक!",
        font: "'Noto Sans Devanagari', sans-serif",
        size: 30
    },
    bangla: {
        text: "পবিত্র ঈদুল ফিতরের\nআন্তরিক শুভেচ্ছা!\nআল্লাহ আপনার রোজা ও\nইবাদত কবুল করুন এবং\nআপনার জীবনে বয়ে আনুক আনন্দ।\nঈদ মোবারক!",
        font: "'Noto Sans Bengali', sans-serif",
        size: 28
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
        size: 30
    }
};

const canvas = document.getElementById('greetingCanvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('nameInput');
const languageSelect = document.getElementById('languageSelect');
const downloadBtn = document.getElementById('downloadBtn');

const image = new Image();
image.src = templateImageName; 

document.fonts.ready.then(function() {
    image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        drawGreeting();
    };
    if(image.complete) {
        drawGreeting();
    }
});

nameInput.addEventListener('input', drawGreeting);
languageSelect.addEventListener('change', drawGreeting);

function drawGreeting() {
    if(!canvas.width) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const userName = nameInput.value;
    const selectedLang = languageSelect.value;
    
    const currentData = langData[selectedLang];
    const messageText = currentData.text;
    const msgFont = currentData.font;
    const msgSize = currentData.size;

    // RTL FIX: Arabic aur Urdu mein commas aur alignment sahi karne ke liye
    if (selectedLang === 'arabic' || selectedLang === 'urdu') {
        ctx.direction = 'rtl';
    } else {
        ctx.direction = 'ltr';
    }

    ctx.fillStyle = textColor; 
    ctx.textAlign = 'center';
    
    const x = canvas.width / 2;
    let y = (canvas.height / 2) + textStartY; 

    const lines = messageText.split('\n');
    for (let i = 0; i < lines.length; i++) {
        ctx.font = `normal ${msgSize}px ${msgFont}`;
        ctx.fillText(lines[i], x, y);
        y += lineSpacing; 
    }

    // NAAM: Language ke original font mein hi aayega
    if (userName) {
        y += 20; 
        ctx.font = `bold ${nameFontSize}px ${msgFont}`; 
        ctx.fillStyle = nameColor; 
        ctx.fillText(userName, x, y);
    }
}

downloadBtn.addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    let fileNameName = nameInput.value ? nameInput.value.trim().replace(/\s+/g, '_') : 'Greeting';
    link.download = 'DailyAzkar_Eid_Mubarak_' + fileNameName + '.jpg';
    link.href = dataURL;
    link.click();
});
