# Final বাংলা + Bijoy Excel Update

এই প্যাকেজে Excel import-এর সময় Bijoy/ANSI/SutonnyMJ লেখা Unicode বাংলা করার ব্যবস্থা রাখা হয়েছে।

## কী ঠিক করা হয়েছে
- Excel-এর শিক্ষার্থীর নাম Unicode বাংলায় রূপান্তর
- Excel-এর বিষয়/header Unicode বাংলায় রূপান্তর
- Grade ও Position-এর বাংলা/legacy text রূপান্তর
- শ্রেণির নাম database-এ বাংলা নামে সংরক্ষণ
- Admin Preview-তে পুরোনো legacy data থাকলেও display-time conversion
- Public website-এ পুরোনো legacy data থাকলেও display-time conversion fallback
- Private Preview রাখা হয়েছে; Preview করলে Public ফলাফল প্রকাশ হয় না
- Schedule / Publish Now / Unpublish আগের মতো রাখা হয়েছে

## গুরুত্বপূর্ণ
এই প্যাকেজের `supabase/functions/import-excel-v2/index.ts` অবশ্যই Supabase-এর `import-excel-v2` Edge Function-এ deploy/update করতে হবে। Supabase Dashboard থেকেই existing function-এর Code খুলে Deploy updates করা যায়।
