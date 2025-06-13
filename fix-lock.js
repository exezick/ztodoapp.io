const fs=require('fs');
const lock=JSON.parse(fs.readFileSync('package-lock.json','utf8'));
function fix(url){
  let u=url.replace('registry.npm.taobao.org','registry.npmjs.org');
  u=u.split('?')[0];
  u=u.replace('/download/','/-/');
  u=u.replace(/\/-\/[@][^/]+\//, '/-/');
  return u;
}
function processDeps(deps){
  if(!deps) return;
  for(const name in deps){
    const dep=deps[name];
    if(dep.resolved){
      dep.resolved=fix(dep.resolved);
    }
    if(dep.dependencies){
      processDeps(dep.dependencies);
    }
  }
}
processDeps(lock.dependencies);
fs.writeFileSync('package-lock.json',JSON.stringify(lock,null,2));
