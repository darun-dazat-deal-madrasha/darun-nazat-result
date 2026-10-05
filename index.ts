import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as XLSX from 'https://esm.sh/xlsx@0.18.5';
import { bijoy2unicode } from './bijoy.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!;
const db = createClient(SUPABASE_URL, SERVICE_KEY);

const CLASS_BN: Record<string,string> = {
  'Class-1':'প্রথম শ্রেণি','Class-2':'দ্বিতীয় শ্রেণি','Class-3':'তৃতীয় শ্রেণি','Class-4':'চতুর্থ শ্রেণি',
  'Class-5':'পঞ্চম শ্রেণি','Class-6':'ষষ্ঠ শ্রেণি','Narsari':'নার্সারি','Hifz':'হিফজ'
};
const EXAMS: Record<string,[string,string]> = {
  '1st-term':['First Term Exam','প্রথম সাময়িক পরীক্ষা'],
  '2nd-term':['Second Term Exam','দ্বিতীয় সাময়িক পরীক্ষা'],
  annual:['Annual Exam','বার্ষিক পরীক্ষা']
};
function clean(v:any){
  if(v==null) return '';
  const s=String(v).replace(/\u00a0/g,' ').trim();
  return s ? bijoy2unicode(s).trim() : '';
}
function num(v:any){
  if(v==null||v==='') return null;
  if(typeof v==='number' && Number.isFinite(v)) return Number.isInteger(v)?v:Number(v);
  const s=String(v).trim().replace(/,/g,'');
  if(['*','-','—'].includes(s)) return null;
  const n=Number(s); return Number.isFinite(n)?(Number.isInteger(n)?n:Number(n)):null;
}
function rankValue(v:any){ const n=num(v); return n!==null?n:clean(v)||null; }

async function assertAdmin(req:Request){
  const auth=req.headers.get('Authorization')||'';
  const token=auth.replace(/^Bearer\s+/i,'');
  if(!token) throw new Error('Unauthorized');
  const userClient=createClient(SUPABASE_URL,ANON_KEY,{global:{headers:{Authorization:`Bearer ${token}`}}});
  const {data:{user},error}=await userClient.auth.getUser(token);
  if(error||!user) throw new Error('Unauthorized');
  const {data}=await db.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();
  if(!data) throw new Error('Not an admin');
  return user;
}

Deno.serve(async(req)=>{
  try{
    const user=await assertAdmin(req);
    const form=await req.formData();
    const file=form.get('file') as File|null;
    const year=Number(form.get('year'));
    const examKey=String(form.get('examKey')||'2nd-term');
    if(!file || !year || !EXAMS[examKey]) throw new Error('file, year and valid examKey are required');
    const [examName,examNameBn]=EXAMS[examKey];

    const bytes=new Uint8Array(await file.arrayBuffer());
    const wb=XLSX.read(bytes,{type:'array',cellDates:false});

    const {data:exam,error:examErr}=await db.from('exams').upsert({
      year,exam_key:examKey,exam_name:examName,exam_name_bn:examNameBn,
      status:'draft',created_by:user.id
    },{onConflict:'year,exam_key'}).select().single();
    if(examErr) throw examErr;

    const {data:classes,error:classErr}=await db.from('classes').select('*');
    if(classErr) throw classErr;
    const classMap=new Map((classes||[]).map((c:any)=>[c.code,c]));

    // Re-importing an exam replaces its previous records, preventing stale rows.
    const {error:deleteErr}=await db.from('result_records').delete().eq('exam_id',exam.id);
    if(deleteErr) throw deleteErr;

    let imported=0; const errors:any[]=[];
    for(const ws of wb.SheetNames){
      if(!classMap.has(ws)) continue;
      const rows=XLSX.utils.sheet_to_json(wb.Sheets[ws],{header:1,defval:''}) as any[][];
      let header=-1,totalCol=-1;
      for(let r=0;r<Math.min(rows.length,40);r++){
        const row=rows[r].map(clean);
        const c=row.findIndex(x=>x.includes('সর্ব মোট')||x.toLowerCase().includes('total'));
        if(c>=0){header=r;totalCol=c;break;}
      }
      if(header<0){errors.push({sheet:ws,error:'Marks header not found'});continue;}
      const subjectCols=[];
      for(let c=2;c<totalCol;c++){
        const h=clean(rows[header][c]).replace(/\n/g,' ').trim();
        if(h) subjectCols.push({col:c,name:h});
      }
      const classRow=classMap.get(ws);
      const payload:any[]=[];
      for(let r=header+1;r<rows.length;r++){
        const row=rows[r];
        const roll=num(row[0]); const name=clean(row[1]);
        if(roll==null && !name) continue;
        if(roll==null || !name){errors.push({sheet:ws,row:r+1,error:'Roll or name missing'});continue;}
        const subjectData=subjectCols.map(x=>({name:x.name,marks:num(row[x.col])}));
        const registration=clean(row[totalCol+5] ?? '');
        payload.push({
          exam_id:exam.id,class_id:classRow.id,roll:String(roll),registration:registration||null,
          student_name:name,subjects:subjectData,total:num(row[totalCol]),average:num(row[totalCol+1]),
          point:num(row[totalCol+2]),grade:clean(row[totalCol+3])||null,rank:rankValue(row[totalCol+4])
        });
      }
      for(let i=0;i<payload.length;i+=500){
        const chunk=payload.slice(i,i+500);
        const {error}=await db.from('result_records').insert(chunk);
        if(error) throw error;
        imported+=chunk.length;
      }
    }
    return new Response(JSON.stringify({ok:true,examId:exam.id,imported,errors}),{headers:{'content-type':'application/json'}});
  }catch(e){
    return new Response(JSON.stringify({ok:false,error:String(e)}),{status:400,headers:{'content-type':'application/json'}});
  }
});
