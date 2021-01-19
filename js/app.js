import React from 'react';
import ReactDOM from 'react-dom'


var importObject = {
    env: {
      abort: () => console.log("Abort!")
    }
  };

var size=10000
var iter=10000
function time(){
  return new Date().getTime()
}
function timer(f,n){
  var start=time();    
  var ans=f()
  var elapsed=time()-start
  var oper=n
  var milpersec=oper/elapsed/1000      
  return {ans,elapsed,oper,milpersec}
}

function run_as2(obj,start){
  const {makeFnArr,runArr}=obj  
  function many_runs(ans){
    for (let i=0;i<iter;i++){
      ans=runArr(ar,ans)
    }
    return ans  
  }    
  var ar=makeFnArr(size)
  return timer(()=>many_runs(start),iter*size*2)
}
function run_as(obj,start){
  const {make_func_array,run_ar}=obj  
  function many_runs(ans){
    for (let i=0;i<iter;i++){
      ans=run_ar(ans)
    }
    return ans  
  }    
  make_func_array(size)
  return timer(()=>many_runs(start),iter*size*2)
}

function run_js(start){
  function js_make_func_array(size){
    function f1(val){
      return val+1
    }
    function f2(val){
      return val+10
    }
    var ans=[]
    for (let i=0;i<size;i++){
      ans.push(f1)
      ans.push(f2)    
    }
    return ans
  }
  function js_run_ar(ar,val){
    var w=val
    var n=ar.length
    /*for (const f of ar) //for some reson, this loop is twice as slow
      w=f(w)*/
    
    for(let i=0;i<n;i++){
      w=ar[i](w)
    }
    return w
  }
  var ar=js_make_func_array(size)
  function many_runs(ans){
    for (let i=0;i<iter;i++){
      ans=js_run_ar(ar,ans)
    }
    return ans      
  }
  return timer(()=>many_runs(start),iter*size*2)
}
function run_js2(start){
  function js_make_func_array(size){
    function f1(w){
      return w.val+1
    }
    function f2(w){
      return w.val+10
    }
    var ans=[]
    for (let i=0;i<size;i++){
      ans.push(f1)
      ans.push(f2)    
    }
    return ans
  }
  function js_run_ar(ar,val){
    var w={val}
    var n=ar.length
    /*for (const f of ar) //for some reson, this loop is twice as slow
      w=f(w)*/
    
    for(let i=0;i<n;i++){
      ar[i](w)
    }
    return w.val
  }
  var ar=js_make_func_array(size)
  function many_runs(ans){
    for (let i=0;i<iter;i++){
      ans=js_run_ar(ar,ans)
    }
    return ans      
  }
  return timer(()=>many_runs(start),iter*size*2)
}

function run_it(obj){
  var ans={
    as:run_as(obj,3),
    js:run_js(4),
    as2:run_as(obj,6),
    js2:run_js2(7)
  }
  return JSON.stringify(ans,0,4)
}

function App(){
  var [obj,set_obj]=React.useState(null)
  var [msg,set_msg]=React.useState('msg') 
  function set_it(x){
    set_obj(x.instance.exports)
  }
  function get_wasm(){
    WebAssembly.instantiateStreaming(fetch('build/optimized.wasm',{cache: 'no-cache'}),importObject).then(set_it)
  }
  function onClick(){
    set_msg(run_it(obj))
  }

  React.useEffect(get_wasm,[])
  return <div>
    <button {...{onClick}}>runit</button>
    <pre>{msg}</pre>
  </div> 
}

ReactDOM.render(<App />,document.querySelector('#root') );
