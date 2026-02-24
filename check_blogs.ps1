$files = @('blog-tips-persiapan.html','blog-wisata-keluarga.html','blog-waktu-terbaik.html','blog-tips-foto.html')
foreach ($f in $files) {
  $lineCount = (Get-Content $f).Count
  $hasPromoGif  = if (Select-String -Path $f -Pattern 'blog-promo-gif'    -Quiet) {'YES'} else {'NO'}
  $hasAuthor    = if (Select-String -Path $f -Pattern 'blog-author'        -Quiet) {'YES'} else {'NO'}
  $hasShare     = if (Select-String -Path $f -Pattern 'share-btn'          -Quiet) {'YES'} else {'NO'}
  $hasRelated   = if (Select-String -Path $f -Pattern 'related-posts'      -Quiet) {'YES'} else {'NO'}
  $hasBJ        = if (Select-String -Path $f -Pattern 'baca-juga'          -Quiet) {'YES'} else {'NO'}
  $hasBlockquote= if (Select-String -Path $f -Pattern 'blog-quote'         -Quiet) {'YES'} else {'NO'}
  $hasFAQ       = if (Select-String -Path $f -Pattern 'blog-faq'           -Quiet) {'YES'} else {'NO'}
  $hasTOC       = if (Select-String -Path $f -Pattern 'blog-toc'           -Quiet) {'YES'} else {'NO'}
  Write-Host ""
  Write-Host "=== $f ($lineCount lines) ==="
  Write-Host "  TOC:$hasTOC | BacaJuga:$hasBJ | Blockquote:$hasBlockquote | PromoGif:$hasPromoGif"
  Write-Host "  Author:$hasAuthor | Share:$hasShare | Related:$hasRelated | FAQ:$hasFAQ"
}
