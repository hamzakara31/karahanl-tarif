'use client';

import { Share2, Copy, Check, Facebook, Twitter, Whatsapp } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  recipeId: string;
  recipeTitle: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ShareButton({ recipeId, recipeTitle, size = 'md' }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/recipe/${recipeId}`
    : '';

  const shareText = `${recipeTitle} tarifini keşfet! 🍳`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipeTitle,
          text: shareText,
          url: shareUrl,
        });
        setShowMenu(false);
      } catch (err) {
        // Kullanıcı paylaşımı iptal etti
        console.log('Paylaşım iptal edildi');
      }
    } else {
      // Fallback: menüyü göster
      setShowMenu(true);
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(url, '_blank');
    setShowMenu(false);
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={`p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 hover:scale-110`}
        title="Paylaş"
      >
        {copied ? (
          <Check className={`${sizeClasses[size]} text-green-500`} />
        ) : (
          <Share2 className={sizeClasses[size]} />
        )}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-12 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[200px] animate-scaleIn">
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kopyalandı!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Linki Kopyala
                  </span>
                </>
              )}
            </button>
            <button
              onClick={shareToFacebook}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Facebook
              </span>
            </button>
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Twitter
              </span>
            </button>
            <button
              onClick={shareToWhatsApp}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
            >
              <Whatsapp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                WhatsApp
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

