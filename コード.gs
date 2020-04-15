/**
 * Return a list of sheet names in the Spreadsheet with the given ID.
 * @param {String} a Spreadsheet ID.
 * @return {Array} A list of sheet names.
 */

var sname="アイマス誕生日";
var moment = Moment.load();
var imas=["ml","cg","sm","sc","ds"];
 

function doGet() {
  var ss = SpreadsheetApp.openById("1CpwNLrurUVVLX2dmMgZHU-uQC7WQfyfWqLlaiooRaN8");
  var sheets = ss.getSheetByName(sname);
  var imass={};
  
　var last_row = 58;//cg 200
　var last_col = 2;//++4;
  
  for(var i=0;i<imas.length;i++){
  last_row = sheets.getRange(1,4+4*i).getValue()-1;  
  
  var values= sheets.getRange(2,1+(4*i),last_row ,2).getValues();
  
    var str=JSON.stringify(values);
    var js=JSON.parse(str);
    imass[imas[i]]=js;
  }
  var str=JSON.stringify(imass);
  var value=(JSON.parse(str));
 
  value=value.cg;
  
  var title3="";
  var stat= "";
  var moment = Moment.load();
  
  var magic_imas="http://sokudon.s17.xrea.com/neta/imm.html#";
  var html="";
  var url="http://www.shurey.com/js/timer/countdown.html?C,"; //154626840,
  
  for(var k=0;k<value.length;k++){
  var titleraw=value[k][1] ;
  title3=value[k][1] +"の誕生日";
  var reg = new RegExp('[<>#"%]',"gm");
  title3 = title3.replace(reg,"");
  stat= value[k][0];
  
  
  if(stat!=""){
  stat = (moment(stat).valueOf()/10000).toFixed(0);
  var kotosi = (moment(moment().format("YYYY-")+moment(stat*10000).format("MM-DDT00:00:00Z"))/10000).toFixed(0);
  var kotosiend =((kotosi*10000+ 24*3600*1000)/10000).toFixed(0);
      
    
  html += "<tr><td>"+hyperlink(magic_imas +title3+","+moment(kotosi*10000).format() +","+moment(kotosiend*10000).format(),titleraw)+"</td>";
  html += "<td>"+ hyperlink( url + kotosi +"," +geturl(title3),moment(kotosi*10000).format()) +"</td>";
  html += "<td>"+ hyperlink( url + kotosiend +"," +geturl(title3),moment(kotosiend*10000).format()) +"</td>";
  html += "</td>";
  }    
    html += "</tr>";
  }
    

  var header= "<style>th,td{  border:solid 1px #aaaaaa;},.table-scroll{  overflow-x : auto}</style>";
  var h ="<table><thead><tr><th>アイドル名</th><th>今年の誕生日</th><th>今年の誕生日終わりまで</th></thead>";
  
  
  
  
 html= h+"<tbody>"+ header  +html + "<tbody></table>";
  
  return HtmlService.createHtmlOutput(html);
  //return ContentService.createTextOutput(url).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

//<>#"%　"#"はURI参照として、"%"はエスケープ用文字として使われます。
//除外されている記号 (RFC2396 に定義がないもの)
//以下の文字は使用できません。
// {}|\^[]`<>#"%

function geturl(title){

   var i, len, arr;
        for(i=0,len=title.length,arr=[]; i<len; i++) {
          if(title.charCodeAt(i) < 0x80){
            arr += title.substr(i, 1);
          }
          else{
            arr +="%25u"+  ("00"+title.charCodeAt(i).toString(16)).slice(-4);
          }
        }

  return arr;
}

function hyperlink(link,name){
  link= "<a href='" + link +"' target=\"_blank\" rel=\"noopener\">" +name +"</a>";
  
  return link;
}

function wmap_getSheetsName(sheets){
  //var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var sheet_names = new Array();
  
  if (sheets.length >= 1) {  
    for(var i = 0;i < sheets.length; i++)
    {
      sheet_names.push(sheets[i].getName());
    }
  }
  return sheet_names;
}