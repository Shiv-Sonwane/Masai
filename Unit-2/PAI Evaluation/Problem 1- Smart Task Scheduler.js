function scheduleTask(taskName, delay, repeat = false){
  if(repeat){
    let id= setInterval(()=>{
      console.log(`Task ${taskName} started after ${delay} ms`)
    },delay);
    return id
  }
  else{
    let id= setTimeout(()=>{
      console.log(`Task ${taskName} started after ${delay} ms`)
    },delay);
    return id
  }
}

function cancelRepeatingTask(id){
  clearInterval(id);
  console.log(`Repeating task cancelled with ${id}`)
}

function scheduleTaskPromise(taskName, delay){
  return new Promise((res)=>{
    setTimeout(()=>{
      res(`Task ${taskName} completed after ${delay} ms`)
    },delay)
  });
}

scheduleTask("Log Session", 1000);                     // one-time
const intervalId = scheduleTask("Check Notifications", 2000, true); // repeating
setTimeout(() => cancelRepeatingTask(intervalId), 8000);            // cancel after 8 s

scheduleTaskPromise("Data Export", 1500).then(console.log);