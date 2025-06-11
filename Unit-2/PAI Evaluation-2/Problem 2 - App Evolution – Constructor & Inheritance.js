function App(name, version, features){
  this.name=name
  this.version=version
  this.features=features
}

App.prototype.getSummary=function(){
  return `${this.name} ${this.version} supports: ${this.features}`
}

App.prototype.addfeature=function (feature){
  if(!this.features.includes(feature)){
    this.features.push(features)
  }
  
}

function VersionTwoApp(name, version, features, releaseYear){
  App.call(this,name, version, features)
  this.releaseYear=releaseYear
}