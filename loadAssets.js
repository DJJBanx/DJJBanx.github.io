let assets = document.getElementById("assets");

//This is the path for the resources
let loc = "models/";

//Add Names of the OBJ and MTL files here
let objs = [
  ["banana-car-png-6.obj", "banana-car-png-6.mtl"],
  ["jeep.obj", "jeep.mtl"],
  ["redcar.obj", "redcar.mtl"],
  ["road.obj", "road.mtl"],
  ["Towers.obj", "Towers.mtl"],
  ["SM_Elevator.obj", "SM_Elevator.mtl"],
    ["dungeon.obj","dungeon.mtl"]
];

//Enable everything
objs.forEach(function (element) {
    const assetobj = document.createElement("a-asset-item");
    const assetmtl = document.createElement("a-asset-item");
    assetobj.setAttribute("id", element[0].slice(0,-4) + "OBJ");
    assetmtl.setAttribute("id", element[1].slice(0,-4) + "MTL");
    assetobj.setAttribute("src", loc + element[0]);
    assetmtl.setAttribute("src", loc + element[1]);
    assets.appendChild(assetobj);
    assets.appendChild(assetmtl);
});