function picChange(evt){
//bring selected photo in

//get files captured through input
var fileInput = evt.target.files;

if(fileInput.length>0){
//get the file

//window url
var windowURL = window.URL || window.webkitURL;
//picture url

//If the createObjectURL method is not supported by the user’s browser, this code will fail.
var picURL = windowURL.createObjectURL(fileInput[0]);

//get canvas
var photoCanvas = document.getElementById("capturedPhoto");
var ctx = photoCanvas.getContext("2d");
var photo = new Image();

photo.onload = function(){
  //draw photo into canvas when ready
  ctx.drawImage(photo, 0, 0, 500, 400);
};

//load photo into canvas
photo.src = picURL;
//release object url
windowURL.revokeObjectURL(picURL);

}
}
