
console.log('script start');

async function async1(){
  let res;
   res = await async2();
  console.log('async1');
  console.log(res);
  
}
async function async2(){
  console.log('async2');
  return 'ok';
}
async1();
console.log('script end');