const ROLE_FEATURES = {
  admin:  ['dashboard', 'settings'],
  viewer: ['dashboard']
};


function createAccessControl(role){
  return function canAccess(feature){
    let features= ROLE_FEATURES[role]
    return features.includes(feature)
  }
}

function showAccessMessage(feature){
  let role=this.role;
  let features = ROLE_FEATURES[role]
  let access=features.includes(feature)
  
  if(access){
    console.log(`${role} has access to ${feature}`)
  }
  else{
    console.log(`${role} does NOT have access to ${feature}`)
  }
}

const adminAccess = createAccessControl("admin");
console.log(adminAccess("settings")); // true

const viewer = { role: "viewer", name: "Joe" };
showAccessMessage.call(viewer, "dashboard");  // Viewer has access to dashboard

const viewerMsg = showAccessMessage.bind({ role: "viewer", name: "Joe" });
viewerMsg("settings");                        // Viewer does NOT have access to settings