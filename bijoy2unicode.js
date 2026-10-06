(function(global){
  const PRE_CONVERSION_MAP={' +':' ','yy':'y','vv':'v','„„':'„','­­':'­','y&':'y','uy':'yu','u“':'“u','u–':'–u','uƒ':'ƒu','„&':'„','u‚':'‚u','uv':'vu','u…':'…u','u„':'„u','uz':'zu','ux':'xu','u~':'~u','‡u':'u‡','wu':'uw',' ,':',',' \\|':'\\|','\\\\ ':'',' \\':'','\\':'','\n +':'\n',' +\n':'\n','\n\n\n\n\n':'\n\n','\n\n\n\n':'\n\n','\n\n\n':'\n\n'};
  const CONVERSION_MAP={'A':'অ','B':'ই','C':'ঈ','D':'উ','E':'ঊ','F':'ঋ','G':'এ','ÿ':'ক্ষ','H':'ঐ','I':'ও','J':'ঔ','K':'ক','L':'খ','M':'গ','N':'ঘ','O':'ঙ','P':'চ','Q':'ছ','R':'জ','S':'ঝ','T':'ঞ','U':'ট','V':'ঠ','W':'ড','X':'ঢ','Y':'ণ','Z':'ত','_':'থ','`':'দ','a':'ধ','b':'ন','c':'প','d':'ফ','e':'ব','f':'ভ','g':'ম','h':'য','i':'র','j':'ল','k':'শ','l':'ষ','m':'স','n':'হ','o':'ড়','p':'ঢ়','q':'য়','r':'ৎ','s':'ং','t':'ঃ','u':'ঁ','0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯','•':'ঙ্','|':'।','°':'ক্ক','±':'ক্ট','²':'ক্ষ্ণ','³':'ক্ত','´':'ক্ম','µ':'ক্র','¶':'ক্ষ','·':'ক্স','¸':'গু','¹':'জ্ঞ','º':'গ্দ','»':'গ্ধ','¼':'ঙ্ক','½':'ঙ্গ','¾':'জ্জ','¿':'্ত্র','À':'জ্ঝ','Á':'জ্ঞ','Â':'ঞ্চ','Ã':'ঞ্ছ','Ä':'ঞ্জ','Å':'ঞ্ঝ','Æ':'ট্ট','Ç':'ড্ড','È':'ণ্ট','É':'ণ্ঠ','Ê':'ণ্ড','Ë':'ত্ত','Ì':'ত্থ','Î':'ত্র','Ï':'দ্দ','Ð':'ণ্ড','Ñ':'-','Ò':'"','Ó':'"','Ô':"'",'Õ':"'",'×':'দ্ধ','Ø':'দ্ব','Ù':'দ্ম','Ú':'ন্ঠ','Û':'ন্ড','Ü':'ন্ধ','Ý':'ন্স','Þ':'প্ট','ß':'প্ত','à':'প্প','á':'প্স','â':'ব্জ','ã':'ব্দ','ä':'ব্ধ','å':'ভ্র','æ':'ু','ç':'ম্ফ','é':'ল্ক','ê':'ল্গ','ë':'ল্ট','ì':'ল্ড','í':'ল্প','î':'ল্ফ','ï':'শু','ð':'শ্চ','ñ':'শ্ছ','ò':'ষ্ণ','ó':'ষ্ট','ô':'ষ্ঠ','õ':'ষ্ফ','ö':'স্খ','÷':'স্ট','ø':'স্ন','ù':'স্ফ','û':'হু','ü':'হৃ','ý':'হ্ন','þ':'হ্ম'};
  const PRE_SYMBOLS_MAP={'®':'ষ্','¯':'স্','”':'চ্','˜':'দ্','™':'দ্','š':'ন্','›':'ন্','¤':'ম্'};
  const REFF={'©':'র্'};
  const POST_SYMBOLS_MAP={'&':'্‌','ú':'্প','è':'্ন','^':'্ব','‘':'্তু','’':'্থ','‹':'্ক','Œ':'্ক্র','—':'্ত','Í':'্ত','œ':'্ন','Ÿ':'্ব','¡':'্ব','¢':'্ভ','£':'্ভ্র','¥':'্ম','¦':'্ব','§':'্ম','¨':'্য','ª':'্র','«':'্র','¬':'্ল','­':'্ল','Ö':'্র'};
  const KAARS={'v':'া','w':'ি','x':'ী','y':'ু','z':'ু','“':'ু','–':'ু','~':'ূ','ƒ':'ূ','‚':'ূ','„':'ৃ','…':'ৃ','†':'ে','‡':'ে','ˆ':'ৈ','‰':'ৈ','Š':'ৗ'};
  const KAAR_POST_CONVERSION={'ো':'ো','ৌ':'ৌ'};
  const POST_CONVERSION_MAP={'অা':'আ','্‌্‌':'্‌'};
  const ALL_SYMBOLS=Object.assign({},CONVERSION_MAP,PRE_SYMBOLS_MAP,POST_SYMBOLS_MAP);
  function escRe(x){return x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}
  function pat(obj, delim=""){return Object.keys(obj).map(escRe).sort().join(delim);}
  const SYMBOLS_CONVERSION_PATTERN=new RegExp("(["+pat(ALL_SYMBOLS)+"])","g");
  const MAIN_CONVERSION_PATTERN=new RegExp("([w†‡ˆ‰Š]?)("+"(["+pat(PRE_SYMBOLS_MAP)+"])*"+"(["+pat(CONVERSION_MAP)+"])?"+"(["+pat(POST_SYMBOLS_MAP)+"])*"+")"+"(["+pat(REFF)+"])?"+"([vxyz“–~ƒ‚„…]?)","g");
  const HASAANT_PATTERN=/্+/g;
  const PRE_CONVERSION_PATTERN=new RegExp("("+pat(PRE_CONVERSION_MAP,"|")+")","g");
  const POST_CONVERSION_PATTERN=new RegExp("("+pat(POST_CONVERSION_MAP,"|")+")","g");
  function bijoy2unicode(input){
    if(input==null)return '';
    let s=String(input);
    if(/[\u0980-\u09ff]/.test(s) && !/[†‡ˆ‰Š„…ƒ~–“”©®™¤š›]/.test(s)) return s;
    s=s.replace(PRE_CONVERSION_PATTERN,m=>PRE_CONVERSION_MAP[m]);
    s=s.replace(MAIN_CONVERSION_PATTERN,(all,g1,g2,g3,g4,g5,g6,g7)=>{
      let core=g2.replace(SYMBOLS_CONVERSION_PATTERN,m=>ALL_SYMBOLS[m]||'');
      core=core.replace(HASAANT_PATTERN,'্');
      const pre=g1?KAARS[g1]:null;
      if(g6) core='র্'+core;
      const post=g7?KAARS[g7]:null;
      const ks=(pre||'')+(post||'');
      return core+(KAAR_POST_CONVERSION[ks]||ks);
    });
    return s.replace(POST_CONVERSION_PATTERN,m=>POST_CONVERSION_MAP[m]);
  }
  global.bijoy2unicode=bijoy2unicode;
})(window);
