# 🤖 دليل تعديل البوت الذكي - Chatbot Configuration Guide

## 📋 نظرة عامة
البوت الآن ذكي واحترافي ويرد على جميع الاستفسارات تلقائياً. جميع الإعدادات موجودة في ملف `main.js`

---

## 🎯 كيفية التعديل

### 1️⃣ تعديل المعلومات الأساسية

افتح ملف `main.js` وابحث عن `BOT_CONFIG`:

```javascript
const BOT_CONFIG = {
    name: "إبراهيم",  // ← غير الاسم هنا
    greeting: "مرحباً! 👋 أنا مساعد إبراهيم الذكي...",  // ← غير رسالة الترحيب
```

---

### 2️⃣ تعديل الأسعار والخدمات

```javascript
services: {
    landingPage: {
        name: "صفحة هبوط",
        price: "من 150$",  // ← غير السعر هنا
        duration: "3-5 أيام",  // ← غير المدة
        features: ["تصميم متجاوب", "محسن لـ SEO", "سرعة عالية"]  // ← أضف أو احذف مميزات
    },
    website: {
        name: "موقع كامل",
        price: "من 300$",  // ← غير السعر
        duration: "7-10 أيام",
        features: ["تصميم احترافي", "لوحة تحكم", "استضافة مجانية لشهر"]
    }
    // يمكنك إضافة خدمات جديدة بنفس الطريقة
}
```

**لإضافة خدمة جديدة:**
```javascript
newService: {
    name: "اسم الخدمة",
    price: "السعر",
    duration: "المدة",
    features: ["ميزة 1", "ميزة 2"]
}
```

---

### 3️⃣ تعديل معلومات التواصل

```javascript
contact: {
    email: "ibrahem.kassap@gmail.com",  // ← غير الإيميل
    whatsapp: "+201017358087",  // ← غير رقم الواتساب
    linkedin: "linkedin.com/in/ibrahem-kassap",  // ← غير اللينكد إن
    github: "github.com/ibrahemkassap",  // ← غير الجيت هاب
    location: "القاهرة، مصر"  // ← غير الموقع
}
```

---

### 4️⃣ تعديل أوقات العمل

```javascript
availability: {
    workDays: "السبت - الخميس",  // ← غير أيام العمل
    workHours: "9 صباحاً - 6 مساءً",  // ← غير ساعات العمل
    responseTime: "خلال 24 ساعة",  // ← غير وقت الرد
    timezone: "توقيت القاهرة (GMT+2)"  // ← غير المنطقة الزمنية
}
```

---

### 5️⃣ إضافة كلمات مفتاحية جديدة

```javascript
keywords: {
    greeting: ["مرحبا", "السلام", "هاي", "هلو"],  // ← أضف كلمات جديدة
    services: ["خدمات", "خدمة", "تقدم"],
    pricing: ["سعر", "اسعار", "تكلفة", "كام"],
    // أضف مجموعة جديدة:
    newCategory: ["كلمة1", "كلمة2", "كلمة3"]
}
```

---

### 6️⃣ تعديل الردود

ابحث عن دالة `getIntelligentResponse` في `main.js`:

**مثال - تعديل رد الترحيب:**
```javascript
if (containsKeywords(msg, BOT_CONFIG.keywords.greeting)) {
    return `مرحباً بك! 😊<br><br>أنا ${BOT_CONFIG.name}، مطور ويب محترف...`;
    // ← غير النص هنا
}
```

**مثال - إضافة رد جديد:**
```javascript
// أضف هذا الكود قبل الرد الافتراضي
if (containsKeywords(msg, ['تدريب', 'كورس', 'دورة'])) {
    return `نعم! أقدم دورات تدريبية في:<br>` +
           `• HTML & CSS<br>` +
           `• JavaScript<br>` +
           `• React<br><br>` +
           `تواصل معي للتفاصيل!`;
}
```

---

### 7️⃣ تعديل الأزرار السريعة

في ملف `index.html` (وجميع الصفحات الأخرى):

```html
<div class="quick-replies" id="quickReplies">
    <button class="quick-reply-btn" onclick="sendQuickReply('الخدمات والأسعار')">
        💼 الخدمات
    </button>
    <!-- أضف زر جديد: -->
    <button class="quick-reply-btn" onclick="sendQuickReply('النص الذي سيرسل')">
        🎯 اسم الزر
    </button>
</div>
```

---

## 🎨 أمثلة عملية

### مثال 1: إضافة خدمة "تطبيق موبايل"

```javascript
// في BOT_CONFIG.services أضف:
mobileApp: {
    name: "تطبيق موبايل",
    price: "من 800$",
    duration: "30-45 يوم",
    features: ["Android & iOS", "تصميم حديث", "API متكامل"]
}
```

ثم في `getIntelligentResponse` أضف:
```javascript
if (msg.includes('موبايل') || msg.includes('تطبيق')) {
    return `<strong>تطبيق موبايل:</strong><br><br>` +
           `💰 السعر: ${BOT_CONFIG.services.mobileApp.price}<br>` +
           `⏱️ المدة: ${BOT_CONFIG.services.mobileApp.duration}`;
}
```

---

### مثال 2: إضافة رد عن الخبرة

```javascript
// في keywords أضف:
experience: ["خبرة", "سنوات", "تجربة"]

// في getIntelligentResponse أضف:
if (containsKeywords(msg, BOT_CONFIG.keywords.experience)) {
    return `لدي خبرة 5+ سنوات في:<br>` +
           `• تطوير المواقع<br>` +
           `• UI/UX Design<br>` +
           `• SEO Optimization<br><br>` +
           `أكثر من 50 مشروع منجز بنجاح!`;
}
```

---

### مثال 3: إضافة رد عن التقنيات

```javascript
if (msg.includes('تقنيات') || msg.includes('لغات')) {
    return `<strong>التقنيات التي أستخدمها:</strong><br><br>` +
           `🎨 Frontend:<br>` +
           `• HTML5, CSS3, JavaScript<br>` +
           `• React, Vue, Angular<br><br>` +
           `⚙️ Backend:<br>` +
           `• Node.js, PHP<br>` +
           `• MySQL, MongoDB<br><br>` +
           `🛠️ Tools:<br>` +
           `• Git, Docker, AWS`;
}
```

---

## 🔧 نصائح مهمة

### ✅ افعل:
- استخدم `<br>` لفصل الأسطر
- استخدم `<strong>` للنصوص المهمة
- استخدم الإيموجي لجعل الردود جذابة
- اختبر البوت بعد كل تعديل

### ❌ لا تفعل:
- لا تحذف الأقواس `{}` أو الفواصل `,`
- لا تنسى إضافة الكلمات المفتاحية
- لا تستخدم علامات اقتباس مزدوجة داخل النص (استخدم `'` بدلاً من `"`)

---

## 🧪 اختبار البوت

1. افتح الموقع في المتصفح
2. اضغط على أيقونة البوت
3. جرب الأسئلة التالية:
   - "مرحبا"
   - "ما هي خدماتك؟"
   - "كم السعر؟"
   - "كيف أتواصل معك؟"
   - "متى أنت متاح؟"

---

## 📞 إذا واجهت مشكلة

1. افتح Console في المتصفح (F12)
2. ابحث عن أخطاء JavaScript
3. تأكد من حفظ الملف بعد التعديل
4. حدث الصفحة (Ctrl+F5)

---

## 🎯 ملخص سريع

| ما تريد تعديله | أين تجده | مثال |
|----------------|----------|------|
| الأسعار | `BOT_CONFIG.services` | `price: "من 200$"` |
| معلومات التواصل | `BOT_CONFIG.contact` | `email: "your@email.com"` |
| أوقات العمل | `BOT_CONFIG.availability` | `workHours: "9-5"` |
| الردود | `getIntelligentResponse()` | `return "نص الرد"` |
| الأزرار | `index.html` | `<button>نص</button>` |

---

**البوت الآن جاهز ويعمل بذكاء! 🚀**

يمكنك تعديل أي شيء بسهولة باتباع هذا الدليل.
