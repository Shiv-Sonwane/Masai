function timer(duration,callback){
  setTimeout(() =>{
    callback(`Timer of ${duration} ms finished`)
  }, duration);
}

function onComplete(message){
  console.log(message)
}

timer(1000,onComplete)