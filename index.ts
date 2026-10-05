import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const URL=Deno.env.get('SUPABASE_URL')!;
const SERVICE=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON=Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!;
const db=createClient(URL,SERVICE);
Deno.serve(async(req)=>{
  try{
    const auth=req.headers.get('Authorization')||'';
    const token=auth.replace(/^Bearer\s+/i,'');
    if(!token) throw new Error('Unauthorized');
    const userClient=createClient(URL,ANON,{global:{headers:{Authorization:`Bearer ${token}`}}});
    const {data:{user}}=await userClient.auth.getUser(token);
    if(!user) throw new Error('Unauthorized');
    const {data:admin}=await db.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();
    if(!admin) throw new Error('Not an admin');
    const {examId,publishAt,status}=await req.json();
    if(!examId) throw new Error('examId required');
    if(!['scheduled','published','unpublished','draft'].includes(status)) throw new Error('Invalid status');
    const patch:any={status,publish_at:publishAt||null,updated_at:new Date().toISOString()};
    if(status==='published') patch.published_at=new Date().toISOString();
    else if(status==='unpublished' || status==='draft') patch.published_at=null;
    const {data,error}=await db.from('exams').update(patch).eq('id',examId).select().single();
    if(error) throw error;
    return new Response(JSON.stringify({ok:true,exam:data}),{headers:{'content-type':'application/json'}});
  }catch(e){return new Response(JSON.stringify({ok:false,error:String(e)}),{status:400,headers:{'content-type':'application/json'}})}
});
