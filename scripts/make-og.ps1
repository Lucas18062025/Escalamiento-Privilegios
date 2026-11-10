# Genera assets/og.png (1200x630) sin dependencias externas.
# Uso: pwsh -File scripts/make-og.ps1
param([string]$Out = (Join-Path (Split-Path $PSScriptRoot -Parent) "assets\og.png"))

Add-Type -AssemblyName System.Drawing

$W = 1200; $H = 630
$accent = [System.Drawing.ColorTranslator]::FromHtml("#22e0b8")
$bg = [System.Drawing.ColorTranslator]::FromHtml("#0f0f0f")
$surface = [System.Drawing.ColorTranslator]::FromHtml("#141414")

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Fondo con gradiente sutil
$rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $bg, [System.Drawing.ColorTranslator]::FromHtml("#101d1a"), 25)
$g.FillRectangle($brush, $rect)

# Rejilla tenue
$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(18, 255, 255, 255), 1)
for ($x = 0; $x -le $W; $x += 40) { $g.DrawLine($gridPen, $x, 0, $x, $H) }
for ($y = 0; $y -le $H; $y += 40) { $g.DrawLine($gridPen, 0, $y, $W, $y) }

# Barra de acento izquierda
$accentBrush = New-Object System.Drawing.SolidBrush($accent)
$g.FillRectangle($accentBrush, 0, 0, 6, $H)

function New-Font([string]$name, [float]$size, [System.Drawing.FontStyle]$style) {
  try { return New-Object System.Drawing.Font($name, $size, $style, [System.Drawing.GraphicsUnit]::Pixel) }
  catch { return New-Object System.Drawing.Font("Segoe UI", $size, $style, [System.Drawing.GraphicsUnit]::Pixel) }
}

$fBadge = New-Font "Consolas" 20 ([System.Drawing.FontStyle]::Bold)
$fTitle = New-Font "Segoe UI Semibold" 86 ([System.Drawing.FontStyle]::Bold)
$fSub = New-Font "Segoe UI" 30 ([System.Drawing.FontStyle]::Regular)
$fMono = New-Font "Consolas" 24 ([System.Drawing.FontStyle]::Regular)
$fUrl = New-Font "Consolas" 20 ([System.Drawing.FontStyle]::Regular)

$text = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#f5f5f5"))
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#b8b8b8"))
$dim = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#8a8a8a"))

# Badge superior
$badgeText = "GUÍA INTERACTIVA  /  PENTESTING AUTORIZADO"
$g.DrawString($badgeText, $fBadge, $accentBrush, 80, 78)

# Titulo
$g.DrawString("Escalamiento de", $fTitle, $text, 74, 130)
$g.DrawString("Privilegios", $fTitle, $accentBrush, 74, 226)

# Subtitulo
$g.DrawString("Linux  ~  Windows  ~  Mitigación  ~  Laboratorios", $fSub, $muted, 78, 340)

# Chip tipo terminal
$chipRect = New-Object System.Drawing.Rectangle(78, 410, 720, 74)
$chipBrush = New-Object System.Drawing.SolidBrush($surface)
$g.FillRectangle($chipBrush, $chipRect)
$chipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 255, 255), 1)
$g.DrawRectangle($chipPen, $chipRect)
$g.DrawString('$ sudo -l  →  (root) NOPASSWD: /usr/bin/awk', $fMono, $muted, 100, 432)

# URL
$g.DrawString("escalamiento-privilegios.lucaslean1806.workers.dev", $fUrl, $dim, 78, 540)

# Marco
$framePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(45, 34, 224, 184), 2)
$g.DrawRectangle($framePen, 40, 40, $W - 80, $H - 80)

$g.Dispose()
$bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "OK -> $Out"
