'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // iOS kontrolü
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Standalone mode kontrolü (zaten yüklü mü?)
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Eğer standalone değilse ve iOS değilse göster
      if (!standalone && !iOS) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS için localStorage kontrolü (daha önce gösterildi mi?)
    if (iOS && !standalone) {
      const hasSeenPrompt = localStorage.getItem('pwa-ios-prompt-shown');
      if (!hasSeenPrompt) {
        setShowPrompt(true);
        localStorage.setItem('pwa-ios-prompt-shown', 'true');
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) {
    return null;
  }

  if (isIOS) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 animate-slideIn bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-orange-500 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
              Ana Ekrana Ekle
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Bu uygulamayı iPhone'unuzda kullanmak için:
            </p>
            <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-decimal">
              <li>Paylaş butonuna dokunun (⬆️)</li>
              <li>&quot;Ana Ekrana Ekle&quot; seçeneğini seçin</li>
              <li>Uygulama ana ekranınıza eklenecek</li>
            </ol>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slideIn bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-orange-500 p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
            Uygulamayı Yükle
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bu uygulamayı cihazınıza yükleyerek daha hızlı erişebilirsiniz.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 font-semibold"
          >
            <Download className="w-4 h-4" />
            Yükle
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

