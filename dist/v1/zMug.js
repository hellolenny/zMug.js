/* zMug - aux */

var inf = {
  sel(c,n){
      var idreg = /#/g,
      classreg = /\./g,
      res,san;
    if (c.match(idreg) == "#") {
        san = c.replace(idreg,'');
        res=document.getElementById(san);
      return res;
    } else if (c.match(classreg) == ".") {
          san = c.replace(classreg,'');
          classcount = document.getElementsByClassName(san);
        if (typeof n != "number"){
          return classcount;
        } else {
          res=classcount.item(n);
          return res;
        }
    } else {
          tagcount = document.getElementsByTagName(c);
        if (typeof n != "number"){
            return tagcount;
        }
          res=tagcount.item(n);
        return res;     
    }
  }, 
},
att = {
  giveAtt(parent, att, val,n){
    var tAtt = document.createAttribute(att);
    tAtt.value = val;
    inf.sel(parent,n).setAttributeNode(tAtt);
  },
  addCl(parent, clname,n){
    inf.sel(parent,n).classList.add(clname);
  },
  strong(parent,select,n){
    var toReg = select,
    paDiv = inf.sel(parent,n),
    origStr= paDiv.innerHTML,
    strStr = origStr.replace(toReg, "<strong>"+toReg+"</strong>");
    paDiv.innerHTML = strStr;
  }
},

build = {
  el(parent, type, id,n){
    var tEl = document.createElement(type),
    paDiv = inf.sel(parent,n);
    if(typeof id != 'undefined') {
      tEl.id = id;
    }
    paDiv.append(tEl);
  },
  text(parent,type,txtCont,id,n)
  { var tText = document.createElement(type),
    paDiv = inf.sel(parent,n);
    if(typeof id != 'undefined') {
      tText.id = id;
    }
    tText.textContent = txtCont;
    paDiv.append(tText);
  },
  img(parent,src,id,n){
    var tImg = document.createElement("img"),
    paDiv = inf.sel(parent,n);
    if(typeof id != 'undefined') {
      tImg.id = id;
    }
    tImg.src = src;
    paDiv.append(tImg);
  }
};


/* zMug - builder */

var zmug = {
  Call(parent,url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var jsonRes=JSON.parse(this.responseText);
          if(jsonRes!=undefined){
            zmug.Build(parent,jsonRes);
          }
          }};
    xhttp.open("GET", url, true);
    xhttp.send();
  },
  Build(parent,response){
    var pa = parent,
        r = response;

    if(r.length==undefined){
      r = new Array(r);
    }
    
    for (let tr = 0; tr < r.length; tr++) {
      var id = r[tr].name,
      typ = r[tr].type,
      cl = r[tr].class,
      vl = r[tr].value,
      st = r[tr].strong,
      aT = r[tr].attrTyp,
      aV = r[tr].attrVal,
      ch = r[tr].child;

      if(typeof id===typeof typ){
        if(typeof id ==="string"){
          zmug.Element(pa, id,typ,vl,st);
        } else if(id.length===typ.length){
          if(typeof id ==="object"){
            for (let tid = 0; tid < id.length; tid++) {
              var strong=undefined, 
                  value=undefined;

              if(vl==undefined){
                if((typ[tid]=="img")||(typ[tid]=="h1")||(typ[tid]=="h2")||(typ[tid]=="h3")||(typ[tid]=="h4")||(typ[tid]=="h5")||(typ[tid]=="p")){
                  console.log("Critical error: value for "+id[tid]+ "which is a "+typ[tid]+"is: "+vl+".");
                }
              }else{
                if(typeof vl == "object"){
                  if(vl!==null){
                    value = vl[tid];
                  } 
                } else if(typeof vl == "string"){
                  value = vl;
                }
              }

            if(st!=undefined){  
              if(typeof id == "object"){
                if(typeof st == "object"){
                  strong = st[tid];
                } else if(typeof st == "string"){
                  strong = st;
                }
              }
            }
              zmug.Element(pa, id[tid],typ[tid],value,strong);
            }
          } 
        } else {
          console.log("Error: id count: "+id.length+" is not equal to the element count: "+typ.length);
        }
      } else {
          console.log("Error: typeof id: "+typeof id+" is not equal to the typeof elements: "+typeof typ);
      }

      /* inject class */

      if((cl!=undefined)&&(cl!=null)){
        if(typeof id == "object"){
          for (let tcl0 = 0; tcl0 < id.length; tcl0++) {
            if(typeof cl[tcl0] == "string"){
              att.addCl("#"+id[tcl0],cl[tcl0]);
            } else if(cl[tcl0]!=null){
              for (let tcl3 = 0; tcl3 < id.length; tcl3++) {
                att.addCl("#"+id[tcl0],cl[tcl0][tcl3]);
              }
            }
          }
        } else if(typeof id == "string"){
          if(typeof cl == "object"){
              for (let tcl1 = 0; tcl1 < cl.length; tcl1++) {
                  if(cl[tcl1]!=null){
                    att.addCl("#"+id,cl[tcl1]);
                  }
                }
              } else {
                att.addCl("#"+id,cl);
          }
        }
      }

      /* inject attribute */

      if((aT!=null)&&(aV!=null)&&((aT!=undefined)&&(aV!=undefined))){
        if(typeof id == "object"){
          for (let tao = 0; tao < id.length; tao++) {
            if((aT[tao]!=null)&&(aV[tao]!=null)){
              if((typeof aT[tao] == "object")&&(typeof aV[tao] == "object")&&(aT[tao].length==aV[tao].length)){
                for (let tat2 = 0; tat2 < aT[tao].length; tat2++) {
                  if((aT[tao][tat2]!=null)&&(aV[tao][tat2]!=null)){
                    att.giveAtt("#"+id[tao],aT[tao][tat2],aV[tao][tat2]);
                  }
                }
              } else {
                att.giveAtt("#"+id[tao],aT[tao],aV[tao]);
              }
            }
            }
        } else if(typeof id == "string"){
          if((typeof aT == "object")&&(typeof aV == "object")&&(aT.length==aV.length)){
            for (let tat = 0; tat < aT.length; tat++) {
              if((aT[tat]!=null)&&(aV[tat]!=null)){
                att.giveAtt("#"+id,aT[tat],aV[tat]);
              }
            }
          } else {
            att.giveAtt("#"+id,aT,aV);
          }
        }
      }

      if((ch!=undefined)&&(ch!=null)){
        if((typeof id == "string")&&(ch.length==undefined)) {
            zmug.Build(id,ch);
        } else if ((typeof id == "string")&&(ch.length!=undefined)){
          for (let tch0 = 0; tch0 < ch.length; tch0++) {
            zmug.Build(id,ch[tch0]);
          }
        } else if((typeof id == "object")&&(ch.length!=undefined)){
              for (let tch2 = 0; tch2 < id.length; tch2++) {
                  if((ch[tch2]!=null)&&(ch[tch2]!=undefined)){
                    if(ch[tch2].length!=undefined){
                      for (let tch3 = 0; tch3 < ch[tch2].length; tch3++) {
                        zmug.Build(id[tch2],ch[tch2][tch3]);
                      }
                    } else if(ch[tch2].length==undefined){
                      zmug.Build(id[tch2],ch[tch2]);
                    }
                  }
              }
          }
      }
    }
  },
  Element(parent,id,type,value,strong){
    switch (type) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "p":
        if(value!=undefined){
          build.text("#"+parent,type,value,id);
        }
        if(strong!=undefined){
          if(typeof strong==="string"){
            att.strong("#"+id,strong)
          }
          if(typeof strong==="object"){
            for (let tst = 0; tst < strong.length; tst++) {
              att.strong("#"+id,strong[tst]);
            }
          }
        }
        break;
      case "img":
        if(value!=undefined){
          build.img("#"+parent,value,id);
        }
        break;
      default:
        build.el("#"+parent,type,id);
        break;
  }
}
}

/* zMug - call funct */

function zMug(parent,url){
  zmug.Call(parent,url);
}

