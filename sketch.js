//get canvas
var photoCanvas = document.getElementById("capturedPhoto");
var ctx = photoCanvas.getContext("2d");

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


var photo = new Image();

photo.onload = function(){
  //draw photo into canvas when ready
  ctx.drawImage(photo, 0, 0, photoCanvas.width, photoCanvas.height);
      var originalData = ctx.getImageData(0, 0, photoCanvas.width, photoCanvas.height);
      findEdges(originalData);

};

//load photo into canvas
photo.src = picURL;
//release object url
windowURL.revokeObjectURL(picURL);

}
}

function findEdges(originalData) {
    var output = ctx.createImageData(photoCanvas.width, photoCanvas.height);
    var w = originalData.width, h = originalData.height;
    var inputData = originalData.data;
    var outputData = output.data;
    var threshold = 100;
    // edge detection goes here
  // edge detection
  for (var y = 0; y < h; y += 1) {
    for (var x = 0; x < w; x += 1) {
      var i = (y * w + x) * 4;
        outputData[i] = inputData[i - w*4 - 4]  +
                        inputData[i - w*4]  + inputData[i - w*4 + 4] +
                        inputData[i - 4] - 8 * inputData[i] + inputData[i + 4] +
                        inputData[i + w*4 - 4] + inputData[i + w*4] + inputData[i + w*4 + 4];
        if (outputData[i] < threshold)
        {
         outputData[i] = 255;
         outputData[i+1] = 255;
         outputData[i+2] = 255;
        } else {
         outputData[i] = 0;
         outputData[i+1] = 0;
         outputData[i+2] = 0;
        }
         outputData[i + 3] = 255; // alpha
   }
 }


    // put the image data back after manipulation
    ctx.putImageData(output, 0, 0);
}
