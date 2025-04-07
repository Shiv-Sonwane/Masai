function numberOfWish(N, S) {
    //write code here
    let obj={
      w:0,
      i:0,
      s:0,
      h:0
    }
    for(let i=0;i<S.length;i++){
      if(S[i]=="w"){
        obj.w+=1
      }
      else if(S[i]=="i"){
        obj.i+=1
      }
      else if(S[i]=="s"){
        obj.s+=1
      }
      else if(S[i]=="h"){
        obj.h+=1
      }
    }
    console.log(Math.min(obj.w,obj.i,obj.s,obj.h))
}
