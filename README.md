# 🗺️ Route Mapping System (ระบบคำนวณเส้นทางและแผนที่)

โปรเจกต์นี้คือ Web Application สำหรับคำนวณเส้นทาง ระยะทาง และระยะเวลาในการเดินทางจาก **"ตำแหน่งปัจจุบันของผู้ใช้งาน"** ไปยัง **"ตำแหน่งของบริษัท"** โดยอ้างอิงจากสภาพการจราจรแบบเรียลไทม์ 

โปรเจกต์ถูกออกแบบโดยใช้สถาปัตยกรรมแบบแยกส่วน **Frontend** และ **Backend** ภายในโครงสร้างของ Nuxt เพื่อตอบโจทย์ด้านความปลอดภัยขั้นสูงสุดในการเก็บรักษา API Key ตามข้อกำหนดที่ว่า **"ห้ามนำ Google API key เข้าสู่ git"**

---

## ⚙️ การทำงานของโปรเจกต์ (System Workflow)

ระบบถูกออกแบบมาเพื่อ **ซ่อน API Key ไม่ให้หลุดไปที่ฝั่งผู้ใช้งานโดยตรง (Client-side) หรือบน GitHub** โดยมีขั้นตอนการทำงานดังนี้:

1.  **ขอพิกัด (Geolocation):** เมื่อผู้ใช้กดปุ่มคำนวณเส้นทาง หน้าเว็บ (Frontend) จะใช้ HTML5 Geolocation API ดึงพิกัด Latitude/Longitude ปัจจุบันของผู้ใช้งาน
2.  **ส่งข้อมูลไป Backend:** Frontend จะส่งพิกัดต้นทางที่ได้ ยิง Request ไปยัง API ฝั่ง Backend ของเราเอง (`GET /api/route?lat=...&lng=...`)
3.  **ประมวลผลที่ Backend:** 
    *   Backend จะดึงพิกัดของบริษัท (จุดหมายปลายทาง) จากไฟล์ `config/company.json`
    *   Backend จะดึงรหัส `GOOGLE_MAPS_API_KEY` จากไฟล์ `.env` ที่ถูกซ่อนไว้
    *   Backend ทำการส่ง Request ไปยัง **Google Maps Routes API** พร้อมพารามิเตอร์ `TRAFFIC_AWARE` เพื่อให้คำนวณระยะเวลาจากสภาพจราจรปัจจุบัน
4.  **ส่งมอบผลลัพธ์:** Backend รับข้อมูลจาก Google, ทำการจัดรูปแบบข้อมูล (ระยะทาง, เวลา, เส้นทาง Polyline ที่ผ่านการเข้ารหัส) ให้พร้อมใช้งาน แล้วส่งกลับมาให้ Frontend
5.  **แสดงผล (Render):** Frontend นำตัวเลขระยะทางและเวลามาแสดงที่หน้าจอ และส่งข้อมูล Polyline ไปให้ Component เพื่อถอดรหัสและวาดเป็นเส้นทางสีน้ำเงินบน Google Map

---

## 📂 โครงสร้างระบบ (Project Structure)

โปรเจกต์นี้แยกส่วนการทำงานระหว่าง UI (Frontend) และ API (Backend) ออกจากกันอย่างชัดเจนตามมาตรฐานของ Nuxt 4:

```text
Next4Aon/
├── app/                          # ส่วนของ Frontend (UI & Components)
│   ├── components/
│   │   ├── MapDisplay.vue        # Component สำหรับเรนเดอร์ Google Maps
│   │   └── MouseEffect.vue       # Component สร้างเอฟเฟกต์เมาส์
│   ├── pages/
│   │   └── index.vue             # หน้าเว็บหลัก (แสดงฟอร์มคำนวณและผลลัพธ์ ดีไซน์ Glassmorphism)
│   └── app.vue                   # Root Component
├── config/                       # ส่วนตั้งค่าคงที่
│   └── company.json              # ไฟล์เก็บพิกัดบริษัท (แก้ไขจุดหมายได้ที่นี่)
├── server/                       # ส่วนของ Backend (API & Logic)
│   └── api/
│       └── route.get.ts          # API ซ่อน Key และยิงไปหา Google Routes API
├── .env                          # ไฟล์เก็บ API Key (ถูกตั้งค่าให้ไม่ขึ้น Git)
├── nuxt.config.ts                # ไฟล์ตั้งค่าหลักของโปรเจกต์ (รวมถึง Runtime Config)
└── package.json                  # จัดการ Dependencies
```

---

## 🛠 Tech Stack (เทคโนโลยีที่ใช้)

*   **Framework หลัก:** [Nuxt 4](https://nuxt.com/) (ครอบคลุมการทำงานทั้ง Frontend และ Backend ในโปรเจกต์เดียว)
    *   **Frontend:** Vue 3 (Composition API) 
    *   **Backend:** Nitro Server (Nuxt Server Routes)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Language:** TypeScript
*   **External Services (Google Maps Platform):**
    *   **Google Maps Routes API (Backend):** คำนวณเส้นทาง
    *   **Google Maps JavaScript API (Frontend):** แสดงผลแผนที่

---

## 🚀 การรันโปรเจกต์ (Local Setup)

1. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

2. **ตั้งค่า Environment Variables (สำคัญมาก):**
   *   สร้างไฟล์ชื่อ `.env` ไว้ที่โฟลเดอร์นอกสุดของโปรเจกต์ 
   *   ใส่ Google Maps API Key ของคุณลงไปดังนี้:
       ```env
       GOOGLE_MAPS_API_KEY=ใส่_KEY_ของคุณที่นี่
       ```

3. **รัน Development Server:**
   ```bash
   npm run dev
   ```
4. **ทดสอบใช้งาน:** เปิดเบราว์เซอร์และเข้าไปที่ `http://localhost:3000`

---

## 📦 วิธีการอัปโค้ดขึ้น Git (Version Control)

เมื่อคุณรันโปรเจกต์และทดสอบระบบเสร็จเรียบร้อยแล้ว สามารถนำโค้ดขึ้นเก็บหรือส่งงานผ่าน Git ได้ด้วยคำสั่งดังนี้:

1. **เพิ่มไฟล์ที่ถูกแก้ไขทั้งหมดเข้า Staging:**
   ```bash
   git add .
   ```

2. **บันทึกการเปลี่ยนแปลง (Commit) พร้อมคำอธิบาย:**
   ```bash
   git commit -m "feat: ระบบแผนที่นำทางแยก Frontend-Backend สมบูรณ์"
   ```

3. **อัปโหลดโค้ดขึ้น Repository (Push):**
   ```bash
   git push
   ```

> 🔒 **เรื่องความปลอดภัย (Security Note):** 
> เนื่องจากเราได้ตั้งค่าบอกให้ Git เพิกเฉยไฟล์ `.env` ไว้ในไฟล์ `.gitignore` ตั้งแต่แรกแล้ว ดังนั้นเมื่อคุณพิมพ์คำสั่ง `git add .` ตัว Git จะ **ข้ามไฟล์ `.env` ไปโดยอัตโนมัติ** ทำให้ Google API Key ของคุณปลอดภัย ไม่หลุดขึ้นไปโชว์บน GitHub อย่างแน่นอน!
