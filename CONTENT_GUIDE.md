# INPAND Technologies — Content & Media Guidelines

This guide outlines asset preparation standards, video encoding specifications, and copywriting principles for the **INPAND Digital Project Showcase**.

---

## 1. Imagery & Screenshot Specifications

To maintain the showcase's editorial aesthetic and high performance, adhere to the following image guidelines:

| Property | Standard | Notes |
| :--- | :--- | :--- |
| **Aspect Ratio** | `16:10` (Primary) or `16:9` | Consistent across all grid cards |
| **Recommended Dimensions** | `1200 x 750 px` or `1600 x 1000 px` | Sharp on Retina / 4K displays |
| **Formats** | `.webp` (preferred), `.avif`, `.svg`, `.png` | Avoid uncompressed `.jpg` |
| **Target File Size** | `< 250 KB` per primary image | Use tools like Squoosh or sharp |
| **Storage Directory** | `public/images/projects/` | Relative path: `/images/projects/...` |

### Visual Presentation Rules

1. **Clean Screen Captures**: Take screenshots on a modern desktop viewport (1440px wide). Ensure no browser scrollbars or dev tools clutter the frame.
2. **True Visual Hierarchy**: Highlight meaningful pages (hero layouts, product catalog grids, interactive dashboards, or unique custom UI interactions).
3. **No Watermarks**: Do not place third-party watermarks or stock photo markers onto client work.

---

## 2. Preview Video Specifications

The video preview modal is designed to give prospective clients an immediate sense of UI fluidity, page responsiveness, and motion craft.

| Property | Standard | Notes |
| :--- | :--- | :--- |
| **Container & Codec** | MP4 (`H.264` / `AAC`) or WebM | Broadest cross-device browser compatibility |
| **Optimal Resolution** | `1280 x 720 px` (720p) or `1920 x 1080 px` | Crisp and light |
| **Duration** | `10 – 30 seconds` | Keep previews focused on key interactions |
| **Target Bitrate** | `1,500 – 2,500 kbps` | Balances visual quality with fast buffering |
| **Target File Size** | `< 12 MB` | Ensures instant loading on mobile 4G/5G |
| **Audio** | Silent or muted background audio | Most clients preview in business environments |
| **Storage Directory** | `public/videos/projects/` | Relative path: `/videos/projects/...` |

### Recommended FFmpeg Command for Optimized Web Video

```bash
ffmpeg -i input_recording.mov \
  -c:v libx264 -crf 23 -preset slow \
  -pix_fmt yuv420p -movflags +faststart \
  -an -s 1280x720 \
  public/videos/projects/my-project-preview.mp4
```
*The `-movflags +faststart` flag is essential: it moves video metadata (moov atom) to the front of the file so video playback begins immediately before the entire file finishes downloading.*

---

## 3. Copywriting & Editorial Voice

The showcase represents INPAND Technologies as an authoritative, high-end digital technology studio.

### Tone Principles

- **Clear, architectural, and precise**: Describe what was engineered and why it mattered commercially.
- **Avoid hyperbole**: Avoid words like *"groundbreaking"*, *"revolutionary"*, *"next-gen"*, or *"cutting-edge"*.
- **State facts & capabilities**: Instead of *"We built the best coffee website"*, write *"A direct-to-consumer flagship store featuring recurring bean subscriptions and sub-second checkout"*.
- **Client industry clarity**: Accurately describe the sector (e.g. *Hospitality & Fine Dining*, *Architecture & Spatial Design*, *Logistics & Supply Chain*).

---

## 4. Client Domain & Privacy Guidelines

- **Verified Domains**: Only add a `domain` property if the client has authorized public linking and the domain is live with an active SSL certificate (`https://`).
- **Internal / NDA Projects**: If a project was developed under an NDA or is deployed inside a client intranet, omit the `domain` property or leave it undefined. The UI will automatically hide the "Visit Website" button and indicate "Internal Deployment" with zero broken links.
