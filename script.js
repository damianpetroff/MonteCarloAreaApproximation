//TODO : CHECK ALL THE TODOS
//TODO : make all number inputs simpleinputs and check if number, in order to allow float values
//TODO : more infos on datapanel
//TODO : more simple shapes
//TODO : comment !
//TODO : clarify *1


//BONUS TODO :
// custom color
// custom polygon
// dark mode
// Run 100 times and get best precision
// Make an option abling to do "infinite" iterations, refreshing the datas all the time getting more and more precise. may be difficult. with button stop of course

// *1 : Is it better to run it 100 times and get the most precise or run it 1 time with more iteration ? To be clarifed

//______________________________________________________________________________________________________________________________________________

let cWidth = 700;
let cHeight = 700;
let points = [];
let POW = 6;

function setup(){
  let canvas = createCanvas(cWidth+1,cHeight+1);
  canvas.parent("draw");
}

function draw() {
  background(255,255,255,255);
  stroke(color(200,200,255));
  noFill();
  //rect(0,0,cWidth,cHeight);
  stroke(color(0,0,0));
  switch($('option:selected', '#shapes').val()){
    case 'circle':
      //rect(0,0,cWidth-1, cHeight-1);
      //fill(color(255,109,0))
      fill(color(18,232,75));
      ellipse(cWidth/2, cHeight/2, cWidth, cHeight);
      break;
    case 'rectangle':
      //rect(0,0,cWidth-1, cHeight-1);
      fill(color(255,250,96));
      //fill(color(0,160,178))
      let w = parseFloat($('#side_a').val());
      let h = parseFloat($('#side_b').val());
      let r = parseFloat(w/h);
      if(w>h) rect(0,(cHeight-(cHeight/r))/2,cWidth,cHeight/r);
      else rect((cWidth-(cWidth*r))/2,0,cWidth*r,cHeight);
      break;
    case 'triangle':
      textSize(32);
      fill(255,0,0);
      text('Not yet implemented', cWidth/3, cWidth/2);
      break;
    default:
      break;
  }

  //Random points display
  noStroke();
  fill(color(255,20,30));
  let nPointsToDraw=min(points.length, Math.pow(10,POW-2));
  for(i=0;i<nPointsToDraw;i++)
    if(nPointsToDraw!=0)
      ellipse(points[i][0]*cWidth,points[i][1]*cHeight,POW-Math.log10(nPointsToDraw),POW-Math.log10(nPointsToDraw));
}

function solve() {
  let n = $('#n_points').val(); //TODO : champ de saisie du nombre d'itérations
  let ratio = 0;
  let trueArea = 0;
  let foundArea = 0;
  let precisionInPercent = 0;
  let approxPi = -1;
  points = [];
  generateRandomPoints(n);
  switch($('option:selected', '#shapes').val()){
    case 'circle':
      let radius = $('#radius_number').val();
      ratio = evaluateRatioCircle(radius);
      trueArea = (Math.pow(radius,2))*Math.PI;
      foundArea = Math.pow(radius*2,2)*ratio;
      approxPi = foundArea/(Math.pow(radius, 2));
      break;
    case 'rectangle':
      let rect_width = parseInt($('#side_a').val());
      let rect_height = parseInt($('#side_b').val());
      ratio = evaluateRatioRectangle(rect_width, rect_height, n);
      trueArea = rect_width*rect_height;
      foundArea = Math.pow(max(rect_width, rect_height),2)*ratio;
      //TODO : généraliser foundArea avec un truc genre intSizeOfSquare

      break;
  }
  precisionInPercent = (1-Math.abs(trueArea-foundArea)/trueArea)*100;
  updateData(trueArea, foundArea, precisionInPercent, n, approxPi);
  //TODO : Afficher tout ça dans un div.
}

function evaluateRatioCircle(radius){
  let nOfIn=0;
  for(let i=0;i<points.length;i++)
    if(Math.sqrt(Math.pow(points[i][0],2)+Math.pow(points[i][1],2))<=1) //Fonction d'évaluation
      nOfIn++;
  return nOfIn/points.length;
}

function evaluateRatioRectangle(rect_width, rect_height){
  let nOfIn=0;
  let res = rect_width/rect_height;
  for(let i=0;i<points.length;i++){
    if(res<1) //Fonction d'évaluation
    {
      if(points[i][0] <= res + (1-res)/2 && points[i][0] >= (1-res)/2) nOfIn++;
    }
    else if(res>1)
    {
      if(points[i][1] <= 1/res + (1-(1/res))/2 && points[i][1] >= (1-(1/res))/2) nOfIn++;
    }
    else return 1; //Si le rectangle est un carré, on a l'aire 100% des points dedans
  }
  return nOfIn/points.length;
}

function generateRandomPoints(n){ //The points are generated within [0;1[ interval for both x and y coords
  for(let i=0;i<n; i++)
    points.push([(Math.random()), (Math.random())]);
}

function updateData(trueArea, foundArea, precisionInPercent, n, approxPi=-1){
    let precision = decoratePrecision(precisionInPercent);
    document.getElementById("results").innerHTML =  "<hr><b>True area : </b>"+trueArea+
                                                    "<b><br>Found area : </b>"+foundArea+
                                                    "<b><br>Precision : </b>"+precision;
    if(approxPi!=-1) document.getElementById("approx_pi").innerHTML = "<hr><b>π ≈ </b>"+Math.PI+"<br><b>Approxation : </b>"+ compareString(Math.PI.toString(),approxPi.toString())[1];
}

function decoratePrecision(p){
  p=p.toFixed(4);
  if(p>=99.9999)
  {
    return "<font color=\"green\">"+p+" % <span class=\"badge badge-success\">Perfect !</span></font>";
  }
  else if(p>=99.99)
  {
    return "<font color=\"green\">"+p+" % <span class=\"badge badge-success\">Very good !</span></font>";
  }
  else if(p>=99.9)
  {
    return "<font color=\"green\">"+p+" % <span class=\"badge badge-success\">Good</span></font>";
  }
  else if(p>=95.0)
  {
    return "<font color=\"orange\">"+p+" % <span class=\"badge badge-warning\">Ok</span></font>";
  }
  else {
    return "<font color=\"red\">"+p+" % <span class=\"badge badge-danger\">Bad...</span></font>";
  }
}

function compareString(a, b) {
    let minLength = Math.min(a.length, b.length);
    let newAB = ["", "", -1, 0]; //A decorated, B decorated, limite, sum
    let red = false;
    for (let i = 0; i < minLength; i++) {
        let decoratorBegin;
        let decoratorEnd = "</font>";
        if (a[i] != b[i]) {
            decoratorBegin = "<font color='red'>";
            red = true;
            if (newAB[2] == -1)
                newAB[2] = i;
        } else {
            if(!red)decoratorBegin = "<font color='green'>";
            else decoratorBegin = "<font color='red'>";
            newAB[3]++;
        }
        newAB[0] += decoratorBegin + a[i] + decoratorEnd;
        newAB[1] += decoratorBegin + b[i] + decoratorEnd;
    }
    //Removing the count of the dot;
    newAB[2]--;
    newAB[3]--;
    return newAB;
}

function cleanResults(){
  document.getElementById("results").innerHTML = "";
  document.getElementById("approx_pi").innerHTML = "";
}

function cleanPoints(){
  points=[];
}

function cleanResultsAndPoints(){
  cleanResults();
  cleanPoints();
}

function updateFields(){
  switch($('option:selected', '#shapes').val()){
    case 'circle':
      $('#rectangle').hide();
      $('#triangle').hide();
      $('#circle').show();
      document.getElementById('solve').innerHTML = "Approximate area and π";
     break;
    case 'rectangle':
      $('#circle').hide();
      $('#triangle').hide();
      $('#rectangle').show();
      document.getElementById('solve').innerHTML = "Approximate area of the rectangle";
     break;
    case 'triangle':
      $('#rectangle').hide();
      $('#circle').hide();
      $('#triangle').show();
      document.getElementById('solve').innerHTML = "Approximate area of the triangle";
     break;
  }
}

$(document).ready(function(){
  $('#shapes').on('change', function() {
    updateFields();
    cleanResultsAndPoints();
  });
  $('#radius_number').on('change', function() {cleanResultsAndPoints();});
  $('#side_a').on('change', function() {cleanResultsAndPoints();});
  $('#side_b').on('change', function() {cleanResultsAndPoints();});
  updateFields();
})
