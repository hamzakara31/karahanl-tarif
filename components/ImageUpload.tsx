'use client';

import { useRef, useState } from 'react';
import { Camera, Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImagesSelect: (files: File[]) => void;
  imagePreviews: string[];
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onReset: () => void;
  selectedImages: File[];
}

export default function ImageUpload({
  onImagesSelect,
  imagePreviews,
  isAnalyzing,
  onAnalyze,
  onReset,
  selectedImages,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFilesSelect = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      onImagesSelect([...selectedImages, ...imageFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelect(e.target.files);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    onImagesSelect(newFiles);
    // Previews'ı da güncellememiz gerekiyor ama bu parent component'te yapılacak
  };

  return (
    <div className="w-full">
      {imagePreviews.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
            isDragging
              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 bg-white dark:bg-gray-800'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="animate-scaleIn">
            <Camera className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-pulse-slow" />
          </div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 animate-fadeIn">
            Fotoğraf Seç veya Sürükle-Bırak
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 animate-fadeIn">
            Birden fazla fotoğraf seçebilirsiniz • PNG, JPG, GIF formatları desteklenir
          </p>
          <button
            type="button"
            className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto animate-fadeIn"
          >
            <Upload className="w-5 h-5" />
            Fotoğraf Seç
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Seçilen Fotoğraflar Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className="relative group animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <img
                    src={preview}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Daha Fazla Fotoğraf Ekle Butonu */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />
            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Daha Fazla Fotoğraf Ekle</p>
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing || imagePreviews.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Tarifler Hazırlanıyor...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Tarif Ver
                </>
              )}
            </button>
            <button
              onClick={onReset}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Temizle
            </button>
          </div>

          {/* Fotoğraf Sayısı */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {imagePreviews.length} fotoğraf seçildi
          </p>
        </div>
      )}
    </div>
  );
}
