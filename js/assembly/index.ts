// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b+6;
}
function f1(val:i32):i32{
  return val+1
}
function f2(val:i32):i32{
  return val+10
}
var ar:Array<usize>
export function make_func_array(size:i32):void{
  ar=new Array<usize>(size*2)
  for (let i=0;i<size;i++){
    ar[i*2]=changetype<usize>(f1)
    ar[i*2+1]=changetype<usize>(f2)
  }
  //return ans
}
export function run_ar(val:i32):i32{
  var n=ar.length
  var ans:i32
  ans=val
  for(let i=0;i<n;i++){
    var f=changetype<(x:i32)=>i32>(ar[i])
    ans=f(ans)
  } 
  return ans
}

class W {
  val: i32;
}

export function makeFnArr(size: i32): Array<(w: W) => void> {
  const f1 = (w: W): void => {
    w.val += 1;
  }

  const f2 = (w: W): void => {
    w.val += 10;
  }

  let ans: Array<(w: W) => void> = [];
  for (let i = 0; i < size; i++) {
    ans.push(f1);
    ans.push(f2);   
  }

  return ans;
}

export function runArr(arr: Array<(w: W) => void>, val: i32): i32 {
  let w: W = { val };
  for (let i = 0, len = arr.length; i < len; i++) {
    let fn = arr[i];
    fn(w);
  }
  return w.val;
}