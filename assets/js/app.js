const db=supabase.createClient(ZOMA_CONFIG.supabaseUrl,ZOMA_CONFIG.supabaseKey);
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const money=v=>Number(v||0).toLocaleString("ar-EG",{style:"currency",currency:"EGP"});
const fmt=v=>v?new Date(v).toLocaleString("ar-EG"):"—";
const st={pending_review:"قيد المراجعة",confirmed:"تم التأكيد",preparing:"جاري التجهيز",ready:"جاهز",shipped:"تم الشحن",delivered:"تم التسليم",rejected:"مرفوض",unactivated:"غير مفعلة",active:"نشطة",suspended:"موقوفة"};
const statusText=x=>st[x]||x||"—";
function showMsg(el,text,type="error"){if(!el)return;el.textContent=text;el.className="msg show "+type}
async function getUser(){return (await db.auth.getUser()).data.user}
async function requireAuth(url="../customer/login.html"){const u=await getUser();if(!u){location.href=url;return null}return u}
async function getCustomer(id){return (await db.from("customers").select("*").eq("id",id).maybeSingle()).data}
async function getAdmin(id){return (await db.from("admins").select("*").eq("id",id).maybeSingle()).data}
async function signOut(){await db.auth.signOut();location.href="../index.html"}
function cardUrl(id){return new URL(`../card/index.html?id=${encodeURIComponent(id)}`,location.href).href}
function newCode(prefix,n=6){return prefix+"-"+Math.random().toString(36).slice(2,2+n).toUpperCase()}
async function loginUniversal(login,password){
  const v=login.trim();
  let email=v;
  if(!v.includes("@")){
    const r=await db.rpc("zoma_get_login_email",{p_login:v});
    if(r.error)throw r.error;
    if(!r.data)throw Error("بيانات الدخول غير صحيحة");
    email=r.data;
  }
  const r=await db.auth.signInWithPassword({email,password});
  if(r.error)throw r.error;
}
async function track(cardId,eventType,meta={}){
  try{await db.from("analytics").insert({card_id:cardId,event_type:eventType,metadata:meta})}catch(_){}
}
