const CACHE_NAME = 'iqr-cache-v1';

// ضع هنا جميع الملفات التي تريد أن تعمل بدون إنترنت (مهم جداً: ملفات الـ AI والـ Model)
const urlsToCache = [
  './',
  './index.html',
  './favicon.png.ico',
  // أضف هنا مسارات ملفات الـ CSS أو الـ JavaScript الخاصة بك إن وجدت
  // مثال: './style.css',
  // مثال: './app.js',
  // مثال: './model/model.json',  <-- ملفات نموذج الذكاء الاصطناعي (مهم جداً)
  // مثال: './model/weights.bin'   <-- أوزان النموذج
];

// 1. مرحلة التثبيت وحفظ الملفات في الذاكرة المؤقتة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. مرحلة الجلب (عندما يحاول الموقع تحميل ملف، يتم جلبه من الكاش إذا لم يوجد إنترنت)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إذا وجد الملف مخزناً، أعطه للمتصفح، وإلا اجلبه من الإنترنت
        return response || fetch(event.request);
      })
  );
});
