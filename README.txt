দারুন নাজাত আইডিয়াল মাদ্রাসা — Automatic Excel Result Website

এই প্যাকেজটি আগের পছন্দের ওয়েবসাইট ডিজাইন/সিস্টেমের উপর ভিত্তি করে তৈরি।
ব্যক্তিগত ফলাফল, ক্লাসওয়ারী ফলাফল, মোবাইল মেনু এবং Print/PDF ব্যবস্থা রাখা হয়েছে।

AUTOMATIC EXCEL SYSTEM
----------------------
ভবিষ্যতে শুধু excel/ folder-এ Excel ফাইল upload করবেন।
GitHub Actions Excel থেকে data/results.json স্বয়ংক্রিয়ভাবে তৈরি করবে।

Excel ফাইলের নামের নিয়ম:
2026-1st-term.xlsx
2026-2nd-term.xlsx
2026-annual.xlsx
2027-1st-term.xlsx
ইত্যাদি।

Excel-এর ভিতরের format বর্তমান 2nd Term Examination.xlsx-এর মতো রাখবেন।
Class-1, Class-2, Class-3, Class-4, Class-5, Class-6, Narsari এবং Hifz sheet ব্যবহার করা যাবে।
Formula_Test sheet থাকলে সেটি ফলাফলে নেওয়া হবে না।

প্রথমবার GitHub-এ:
1. ZIP খুলে সব ফাইল repository-তে upload করুন।
2. GitHub Pages আগের মতো index.html থেকে চালু রাখুন।
3. Settings > Actions > General-এ Workflow permissions যদি দেখা যায়, "Read and write permissions" নির্বাচন করে Save করুন (সাধারণত workflow-তেই contents: write দেওয়া আছে)।

এরপর:
1. excel/ folder খুলুন।
2. নতুন Excel upload করুন।
3. Commit changes দিন।
4. Actions tab-এ "Update Result Data from Excel" workflow শেষ হওয়া পর্যন্ত অপেক্ষা করুন।
5. কয়েক মুহূর্ত পর website refresh করুন।

একই year + exam-এর Excel আবার upload করলে আগের সেই year + exam-এর data নতুন Excel দিয়ে replace হবে।
নতুন year + exam upload করলে পুরোনো ফলাফল রেখে নতুন ফলাফল যোগ হবে।

গুরুত্বপূর্ণ:
- Excel-এর নামের নিয়ম ঠিক রাখুন।
- Excel-এর sheet/column format বর্তমান template অনুযায়ী রাখুন।
- GitHub Pages public হলে website-এর ফলাফল public থাকবে।

নতুন সংযোজন:
- মেইন মেনুতে “A+ ও মেধা তালিকা” যোগ করা হয়েছে।
- ফলাফল ডাটার Grade = A+ হলে পরীক্ষার্থী স্বয়ংক্রিয়ভাবে A+ তালিকায় আসবে।
- A+ তালিকায় এবং মেধা তালিকায় ক্রমিক নং, পরীক্ষার্থীর নাম, শ্রেণী, মোট নম্বর, গড়, পয়েন্ট, গ্রেড ও অবস্থান দেখানো হয়।
- দুই তালিকাতেই শ্রেণির ক্রম: নার্সারি → প্রথম → দ্বিতীয় → তৃতীয় → চতুর্থ → পঞ্চম → ষষ্ঠ → হিফজ।
- মেধা তালিকায় প্রতি শ্রেণির কেবল ১ম, ২য় ও ৩য় অবস্থানের শিক্ষার্থীরা দেখানো হয়; সমান অবস্থান হলে একই অবস্থানের শিক্ষার্থীরাও থাকে।
- তালিকাটি A4 ল্যান্ডস্কেপ প্রিন্ট/PDF-এর জন্য সাজানো হয়েছে।
- নতুন ফলাফল ডাটায় A+ বা শীর্ষ ৩ অবস্থানের তথ্য থাকলে আলাদা করে তালিকা আপডেট করার প্রয়োজন নেই; data/results.json আপডেট হলে তালিকাও আপডেট হবে।

- ব্যক্তিগত ফলাফল প্রিন্ট/PDF-এর জন্য নতুন পরিচ্ছন্ন A4 ডিজাইন যোগ করা হয়েছে।
