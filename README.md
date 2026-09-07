# Jureeporn's Portfolio (Aon) 🚀

ยินดีต้อนรับสู่โปรเจค Portfolio ส่วนตัวของ **อ้อน (Jureeporn Chomloke)** โปรเจคนี้ถูกสร้างขึ้นเพื่อนำเสนอประสบการณ์การทำงานในสาย Backend Developer ทักษะการเขียนโปรแกรม และสะท้อนตัวตนผ่านงานอดิเรก (การทำขนมและน้องแมว) 

โปรเจคนี้เน้นการออกแบบสไตล์ **Minimalist & Glassmorphism** ให้ความรู้สึกเรียบหรู ดูแพง สบายตา และจัดทำเป็นรูปแบบหน้าเดียว (Single Page) เพื่อให้อ่านง่ายและลื่นไหลที่สุด

---

## 🛠 Tech Stack (เทคโนโลยีที่ใช้)

* **Framework:** [Nuxt 4](https://nuxt.com/) (Vue.js Framework)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Language:** TypeScript
* **Deployment:** GitHub Pages (ผ่าน GitHub Actions CI/CD)
* **Data Management:** JSON-driven architecture (ขับเคลื่อนข้อมูลด้วยไฟล์ JSON)

---

## 📂 โครงสร้างระบบ (Project Structure)

โปรเจคนี้ถูกออกแบบโครงสร้างให้แยกส่วนการทำงานออกจากกันอย่างชัดเจน เพื่อง่ายต่อการบำรุงรักษาและการอัปเดตข้อมูลในอนาคต:

```text
protfolio-aon/
├── .github/
│   └── workflows/
│       └── deploy.yml            # ตั้งค่า CI/CD สำหรับรันอัตโนมัติขึ้น GitHub Pages
├── app/
│   ├── components/               # ส่วนประกอบของหน้าจอ (UI Components)
│   │   ├── HeroSection.vue       # ส่วนบนสุด (แนะนำตัวและรูปภาพ)
│   │   ├── DetailedProjectSection.vue # ส่วนแสดงรายละเอียดโปรเจคหลัก (SPRC, SCG)
│   │   ├── PastProjectsSection.vue # ส่วนแสดงประสบการณ์โปรเจคที่ผ่านมา
│   │   ├── PersonalSection.vue   # ส่วนงานอดิเรก (ขนมปังซาวโดว์ และ แมว)
│   │   └── SkillTags.vue         # ส่วนแสดงทักษะ (Core Stack & AI Learning)
│   ├── data/
│   │   └── portfolio-data.json   # 🔥 ฐานข้อมูลหลักที่ใช้เก็บข้อความและรายละเอียดทั้งหมด
│   ├── pages/
│   │   └── index.vue             # หน้าหลักของเว็บไซต์ (นำ Components มารวมกัน)
│   └── app.vue                   # Root component
├── public/                       # ไฟล์ภาพ (เช่น รูปแมว, รูปทำขนม, favicon)
├── shared/
│   └── types/
│       └── profile.ts            # กำหนด Type (Interface) สำหรับข้อมูลพอร์ตโฟลิโอ
├── nuxt.config.ts                # ไฟล์ตั้งค่าหลักของ Nuxt (รวมถึง BaseURL สำหรับ GitHub Pages)
└── package.json                  # ไฟล์จัดการ Dependencies
```

---

## 💡 จุดเด่นของระบบ (Key Features)

1. **JSON-Driven Content:** ข้อมูลเกือบทั้งหมดในเว็บ (ชื่อ, รายละเอียดโปรเจค, งานอดิเรก) ถูกดึงมาจากไฟล์ `app/data/portfolio-data.json` เพียงไฟล์เดียว ทำให้หากต้องการแก้ไขข้อความในอนาคต **สามารถแก้ที่ JSON ได้เลย โดยไม่ต้องไปยุ่งกับไฟล์โค้ด (Vue/HTML)**
2. **Automated Deployment:** ระบบถูกผูกไว้กับ GitHub Actions ทันทีที่กด `git push` ขึ้น Branch `main` ระบบจะทำการ Build โค้ดและนำไปอัปเดตบนหน้าเว็บจริง (GitHub Pages) ให้อัตโนมัติ
3. **Premium Animations:** ผสานลูกเล่นการแสดงผลแบบค่อยๆ ปรากฏเมื่อเลื่อนจอ (Reveal on Scroll) และ Text Reveal ทำให้เว็บไซต์ดูหรูหราและมีมิติ
4. **Interactive Mouse Effect:** เพิ่ม Custom Cursor แบบ Spotlight และ Trailing ring ช่วยยกระดับความรู้สึกพรีเมียมขณะเลื่อนเมาส์บน Desktop

---

## 🚀 การรันโปรเจคในเครื่อง (Local Development)

หากต้องการรันโปรเจคนี้เพื่อดูและแก้ไขบนเครื่องส่วนตัว:

1. ติดตั้ง Dependencies ก่อน:
   ```bash
   npm install
   ```

2. สั่งรัน Development Server:
   ```bash
   npm run dev
   ```

3. เปิดเบราว์เซอร์แล้วเข้าไปที่ `http://localhost:3000`

---

## 🌐 การนำขึ้นระบบจริง (Deployment)

โปรเจคนี้ถูกคอนฟิกมาเพื่อให้ทำงานร่วมกับ GitHub Pages ผ่าน GitHub Actions:
- ข้อมูลการทำ CI/CD อยู่ที่ไฟล์ `.github/workflows/deploy.yml`
- Base URL ถูกตั้งค่าเป็น `/protfolio-aon/` ใน `nuxt.config.ts`

**เมื่อต้องการอัปเดตหน้าเว็บจริง:**
เพียงแค่ใช้คำสั่งมาตรฐานของ Git:
```bash
git add .
git commit -m "อัปเดตข้อมูลพอร์ตโฟลิโอ"
git push
```
หลังจาก Push เสร็จ รอประมาณ 1-2 นาที GitHub Actions จะจัดการแปลงไฟล์เป็น Static HTML (`npm run generate`) และอัปโหลดให้คนทั่วไปดูได้ที่ `https://jureeporn.github.io/protfolio-aon/` ทันที
