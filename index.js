$(function(){
 var textarea=$("#text4copy");
 if(!("geolocation" in window.navigator)){
  $(".error").text("navigation does not have geolocation");
  return;
 }
 var success=function(position){
  var date=new Date(position.timestamp);

  var map=[
   // 表示, キー/ID, 単位
   ["緯度", "latitude", ""],
   ["経度", "longitude", ""],
   ["精度", "accuracy", "m"],
   ["高度", "altitude", "m"],
   ["高度精度", "altitudeAccuracy", "m"],
   ["方向", "heading", "degree"],
   ["速度", "speed", "m/s"]
  ];

  var text="";

  var coords=position.coords;
  for(var i=0;i<map.length;i++){
   var value=coords[map[i][1]];
   if(value===null || isNaN(value)){
    $("#"+map[i][1]).text("cannot get");
    continue;
   }
   $("#"+map[i][1]).text(value+map[i][2]);
   text+=map[i][0]+": "+value+map[i][2]+"\n";
  }

  $("#timestamp").text(date.toString());
  text+="取得時刻: "+date.toString()+"\n";

  $("#text4copy").val(text);
 };

 var error=function(error){
  $(".error").text("ERROR: "+error.code+"\n"+error.message);
 };

 var big_brother=navigator.geolocation.watchPosition(success,error,{
  enableHighAccuracy: true
 });

 $(".error").hide();
});
