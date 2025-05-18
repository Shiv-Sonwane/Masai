function getCharacterFrequency(str){
  str = str.trim().toLowerCase();


  return str.split('').reduce((frequency, char) => {
    if (char !== ' ') {
      if (!frequency[char]) {
        frequency[char] = 0;
      }
      frequency[char] += 1;
    }
    return frequency;
  }, {});
}

const str = " Hello World! ";
const result = getCharacterFrequency(str);
console.log(result); 
