//
//  ImageProcessor.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation
import UIKit
import CoreImage

/// Görüntü işleme yardımcı sınıfı
class ImageProcessor {
    /// Görüntüyü optimize eder (boyut ve kalite)
    static func optimizeImage(_ image: UIImage, maxSize: CGFloat = 1024) -> UIImage? {
        let size = image.size
        
        // Görüntü zaten küçükse olduğu gibi döndür
        if max(size.width, size.height) <= maxSize {
            return image
        }
        
        // Yeni boyutu hesapla
        let ratio = min(maxSize / size.width, maxSize / size.height)
        let newSize = CGSize(width: size.width * ratio, height: size.height * ratio)
        
        // Yeni görüntü oluştur
        UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
        defer { UIGraphicsEndImageContext() }
        
        image.draw(in: CGRect(origin: .zero, size: newSize))
        return UIGraphicsGetImageFromCurrentImageContext()
    }
    
    /// Görüntüyü döndürür
    static func rotateImage(_ image: UIImage, by degrees: CGFloat) -> UIImage? {
        let radians = degrees * .pi / 180
        let rotatedSize = CGRect(origin: .zero, size: image.size)
            .applying(CGAffineTransform(rotationAngle: radians))
            .integral.size
        
        UIGraphicsBeginImageContextWithOptions(rotatedSize, false, image.scale)
        defer { UIGraphicsEndImageContext() }
        
        guard let context = UIGraphicsGetCurrentContext() else { return nil }
        
        context.translateBy(x: rotatedSize.width / 2, y: rotatedSize.height / 2)
        context.rotate(by: radians)
        image.draw(in: CGRect(
            x: -image.size.width / 2,
            y: -image.size.height / 2,
            width: image.size.width,
            height: image.size.height
        ))
        
        return UIGraphicsGetImageFromCurrentImageContext()
    }
    
    /// Görüntüyü kırpar
    static func cropImage(_ image: UIImage, to rect: CGRect) -> UIImage? {
        guard let cgImage = image.cgImage?.cropping(to: rect) else {
            return nil
        }
        return UIImage(cgImage: cgImage, scale: image.scale, orientation: image.imageOrientation)
    }
}

