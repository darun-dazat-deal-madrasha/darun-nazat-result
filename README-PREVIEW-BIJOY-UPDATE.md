# Preview + Bijoy/SutonnyMJ Update

এই প্যাকেজে দুইটি বড় পরিবর্তন আছে:

1. Admin Panel-এ প্রতিটি exam-এর পাশে **👁 Preview** যোগ করা হয়েছে। Preview private; Publish না করা পর্যন্ত Public Result Website-এ দেখা যাবে না।
2. Excel import-এর সময় Bijoy / SutonnyMJ legacy ANSI লেখা Unicode Bengali-তে রূপান্তর করা হয়েছে। পুরোনো DB-তে থাকা legacy text দেখানোর সময় Public/Admin UI-ও conversion করার চেষ্টা করবে।

## কোন ফাইল কোথায়
- `website/admin.html` → নতুন Admin Panel + Preview
- `website/index.html` → module script চালু করা হয়েছে
- `website/script.js` → Public Result-এ legacy Bijoy text display conversion
- `website/bijoy2unicode.py` → পুরোনো conversion helper
- `supabase/functions/import-excel-v2/index.ts` → **নতুন Excel importer source**, এখানে server-side Bijoy/SutonnyMJ conversion আছে

## গুরুত্বপূর্ণ
শুধু GitHub Pages-এ `website` ফাইল আপলোড করলে Preview চালু হবে।
Bijoy/SutonnyMJ-কে Excel import-এর সময় সত্যিকারভাবে Unicode-এ সংরক্ষণ করতে `supabase/functions/import-excel-v2/index.ts`-টি Supabase Edge Function `import-excel-v2` হিসেবে Deploy করতে হবে। Supabase Dashboard-এর Edge Functions editor থেকেই নতুন/আপডেটেড function deploy করা যায়।
