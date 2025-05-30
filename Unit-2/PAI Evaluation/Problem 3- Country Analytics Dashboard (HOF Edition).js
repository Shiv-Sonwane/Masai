const countries = [
  { name: "India",         region: "Asia",     population: 1380004385, area: 3287263,  capital: "New Delhi" },
  { name: "China",         region: "Asia",     population: 1444216107, area: 9596961,  capital: "Beijing" },
  { name: "USA",           region: "Americas", population: 331002651,  area: 9372610,  capital: "Washington, D.C." },
  { name: "Brazil",        region: "Americas", population: 212559417,  area: 8515767,  capital: "Brasília" },
  { name: "Russia",        region: "Europe",   population: 145934462,  area: 17098242, capital: "Moscow" },
  { name: "Bangladesh",    region: "Asia",     population: 164689383,  area: 147570,   capital: "Dhaka" },
  { name: "Japan",         region: "Asia",     population: 126476461,  area: 377975,   capital: "Tokyo" },
  { name: "Nigeria",       region: "Africa",   population: 206139589,  area: 923768,   capital: "Abuja" },
  { name: "Pakistan",      region: "Asia",     population: 220892340,  area: 881912,   capital: "Islamabad" },
  { name: "Germany",       region: "Europe",   population: 83783942,   area: 357114,   capital: "Berlin" },
  { name: "UK",            region: "Europe",   population: 67886011,   area: 243610,   capital: "London" },
  { name: "France",        region: "Europe",   population: 65273511,   area: 551695,   capital: "Paris" },
  { name: "Italy",         region: "Europe",   population: 60461826,   area: 301340,   capital: "Rome" },
  { name: "South Africa",  region: "Africa",   population: 59308690,   area: 1221037,  capital: "Pretoria" },
  { name: "Egypt",         region: "Africa",   population: 102334404,  area: 1002450,  capital: "Cairo" },
  { name: "Mexico",        region: "Americas", population: 128932753,  area: 1964375,  capital: "Mexico City" },
  { name: "Vietnam",       region: "Asia",     population: 97338579,   area: 331212,   capital: "Hanoi" },
  { name: "Philippines",   region: "Asia",     population: 109581078,  area: 300000,   capital: "Manila" },
  { name: "Turkey",        region: "Asia",     population: 84339067,   area: 783562,   capital: "Ankara" },
  { name: "Iran",          region: "Asia",     population: 83992949,   area: 1648195,  capital: "Tehran" },
  { name: "Spain",         region: "Europe",   population: 46754778,   area: 505992,   capital: "Madrid" },
  { name: "Thailand",      region: "Asia",     population: 69799978,   area: 513120,   capital: "Bangkok" },
  { name: "Argentina",     region: "Americas", population: 45195774,   area: 2780400,  capital: "Buenos Aires" },
  { name: "Colombia",      region: "Americas", population: 50882891,   area: 1141748,  capital: "Bogotá" },
  { name: "Canada",        region: "Americas", population: 37742154,   area: 9984670,  capital: "Ottawa" }
];


function analyzeCountries(countries){
  // Total_Countries
  let total_Countries= countries.length
  
  // Avg_population
  let total_population =countries.reduce((acc,curr)=>acc+=curr.population,0)
  let avg_population=Math.floor(total_population/countries.length)
  
  let narr=[...countries]
  top5MostPopulated=narr.sort((a,b)=>b.population-a.population)
  .slice(0,5)
  .map(curr_country=>curr_country.name)
   
  return {
    total_Countries,
    avg_population,
    top5MostPopulated
  }
}


console.log(analyzeCountries(countries))








