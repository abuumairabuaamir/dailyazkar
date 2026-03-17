// === SETTINGS ===
const templateImageName = 'template.jpg'; 
const textColor = '#041F11'; 
const nameColor = '#0B4A28'; 
const nameFontSize = 45; 
const textStartY = -180; 
const lineSpacing = 75; 

// === MESSAGES & SHARE DATA ===
const langData = {
    arabic: {
        text: "عيد فطر سعيد\nأعاده الله علينا وعليكم بالخير والبركات\nتقبل الله طاعاتكم\nوجعل أيامكم مليئة بالفرح والسعادة\nكل عام وأنتم إلى الله أقرب\nوعيدكم مبارك",
        font: "'Amiri', serif",
        size: 45,
        shareMsg: "ما شاء الله! قمت بإنشاء بطاقة تهنئة بالعيد باسمي، اصنع بطاقتك الآن: "
    },
    urdu: {
        text: "عید الفطر کی دلی مبارکباد!\nاللہ تعالیٰ ہماری عبادتوں\nکو قبول فرمائے اور\nاس مبارک دن کو ہمارے لیے\nخوشیوں کا باعث بنائے۔\nعید مبارک!",
        font: "'Noto Nastaliq Urdu', serif",
        size: 50,
        shareMsg: "ماشاء اللہ! میں نے اپنے نام والا عید کارڈ بنایا ہے، آپ بھی بنائیں۔ لنک: "
    },
    english: {
        text: "May Allah bring you joy,\nhappiness, peace, and prosperity.\nWishing you and your family\na very happy and\nblessed Eid!\nEid Mubarak!",
        font: "'Poppins', sans-serif",
        size: 45,
        shareMsg: "I just created my personalized Eid card! Create yours here: "
    },
    hindi: {
        text: "आपको और आपके परिवार को\nईद-उल-फيتर की दिली मुबारकबाद।\nअल्लाह आपकी सभी\nदुआएं कबूल फरमाए और\nआपकी जिंदगी को खुशियों से भर दे।\nईद मुबारक!",
        font: "'Noto Sans Devanagari', sans-serif",
        size: 40,
        shareMsg: "मैंने अपने नाम का ईद कार्ड बनाया है, आप भी बना सकते हैं: "
    },
    bangla: {
        text: "পবিত্র ঈদুল ফিতরের\nআন্তরিক শুভেচ্ছা!\nআল্লাহ আপনার রোজা ও\nইবাদত কবুল করুন এবং\nআপনার জীবনে বয়ে আনুক আনন্দ।\nঈদ মোবারক!",
        font: "'Noto Sans Bengali', sans-serif",
        size: 40,
        shareMsg: "আমি আমার নামের ঈদ কার্ড তৈরি করেছি! আপনিও তৈরি করুন: "
    },
    tamil: {
        text: "இனிய ஈகைத் திருநாள்\nநல்வாழ்த்துக்கள்!\nஎல்லாம் வல்ல இறைவன்\nஉங்கள் வாழ்வில்\nமகிழ்ச்சியையும் அமைதியையும் பொழியட்டும்.\nஈத் முபாரக்!",
        font: "'Noto Sans Tamil', sans-serif",
        size: 26,
        shareMsg: "எனது பெயருடன் ஈத் வாழ்த்து அட்டையை உருவாக்கியுள்ளேன்! நீங்களும் உருவாக்குங்கள்: "
    },
    malayalam: {
        text: "ഹൃദയം നിറഞ്ഞ\nചെറിയ പെരുന്നാൾ ആശംസകൾ!\nഅല്ലാഹു നിങ്ങളുടെ\nപ്രാർത്ഥനകൾ സ്വീകരിക്കുകയും\nജീവിതത്തിൽ സന്തോഷം നൽകുകയും ചെയ്യട്ടെ.\nഈദ് മുബാറക്!",
        font: "'Noto Sans Malayalam', sans-serif",
        size: 24,
        shareMsg: "എന്റെ പേരിൽ ഞാൻ ഒരു പെരുന്നാൾ ആശംസ കാർഡ് ഉണ്ടാക്കി! നിങ്ങളും ഉണ്ടാക്കൂ: "
    },
    gujarati: {
        text: "ઈદ-ઉલ-ફિત્રની\nહાર્દિક શુભકામનાઓ!\nઅલ્લાહ તમારી દુઆઓ\nકબૂલ કરે અને\nતમારા જીવનમાં ખુશીઓ લાવે.\nઈદ મુબારક!",
        font: "'Noto Sans Gujarati', sans-serif",
        size: 40,
        shareMsg: "મેં મારા નામ સાથે ઈદ કાર્ડ બનાવ્યું છે! તમે પણ બનાવો: "
    }
};

const canvas = document.getElementById('greetingCanvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('nameInput');
const languageSelect = document.getElementById('languageSelect');
const downloadBtn = document.getElementById('downloadBtn');
const image = new Image();

function drawGreeting() {
    if (!image.complete || image.naturalWidth === 0) return; 

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const userName = nameInput.value;
    const selectedLang = languageSelect.value;
    const currentData = langData[selectedLang];
    
    ctx.direction = (selectedLang === 'arabic' || selectedLang === 'urdu') ? 'rtl' : 'ltr';
    ctx.fillStyle = textColor; 
    ctx.textAlign = 'center';
    
    const x = canvas.width / 2;
    let y = (canvas.height / 2) + textStartY; 

    const lines = currentData.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        ctx.font = `normal ${currentData.size}px ${currentData.font}`;
        ctx.fillText(lines[i], x, y);
        y += lineSpacing; 
    }

    if (userName) {
        y += 20; 
        ctx.font = `normal ${nameFontSize}px ${currentData.font}`; 
        ctx.fillStyle = nameColor; 
        ctx.fillText(userName, x, y);
    }
}

document.fonts.ready.then(function() {
    image.onload = drawGreeting;
    image.src = templateImageName; 
});

nameInput.addEventListener('input', drawGreeting);
languageSelect.addEventListener('change', drawGreeting);

// WhatsApp Share Logic
function shareOnWhatsApp() {
    const selectedLang = languageSelect.value;
    const url = "https://dailyazkar.abuumair.in/eid/";
    const message = langData[selectedLang].shareMsg;
    const whatsappUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(message + url);
    window.open(whatsappUrl, '_blank');
}

// === DOWNLOAD LOGIC WITH POPUP ===
downloadBtn.addEventListener('click', function() {
    // Download procedure
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    let fileName = nameInput.value ? nameInput.value.trim().replace(/\s+/g, '_') : 'Greeting';
    link.download = 'DailyAzkar_Eid_' + fileName + '.jpg';
    link.href = dataURL;
    link.click();

    // Jab photo download ho jaye, popup show karein
    showDownloadModal(dataURL);
});

// Popup Show karne ka function
const modal = document.getElementById('downloadModal');
const closeBtn = document.querySelector('.close-btn');

function showDownloadModal(dataUrl) {
    const modalImage = document.getElementById('downloadedPhoto');
    modalImage.src = dataUrl; // Popup mein card dikhao
    modal.style.display = 'block'; // Popup open karo
}

// Popup Close karne ka function
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// === WHATSAPP SHARE PHOTO (POST-DOWNLOAD) ===
const modalShareBtn = document.getElementById('modalShareBtn');

modalShareBtn.addEventListener('click', async () => {
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    // User ki select ki hui language check karein
    const lang = document.getElementById('languageSelect').value;
    
    // langData se usi language ka message uthayega
    const message = langData[lang].shareMsg;
    
    // DataURL ko file mein badalna
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], 'Eid_Greeting.jpg', { type: 'image/jpeg' });

    // Web Share API (Direct Photo WhatsApp par bhejega)
    if (navigator.share) {
        try {
            await navigator.share({
                files: [file],
                title: 'Eid Greeting',
                text: message,
            });
        } catch (error) {
            console.log('Sharing failed', error);
        }
    } else {
        // Agar browser support na kare
        alert("Aapka browser direct image share support nahi karta. Photo download karke share karein.");
    }
});
