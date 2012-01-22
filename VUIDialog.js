/*
 *Copyright (c) 2012, karthi.m(karthi4all@gmail.com)
 *
 *This source code is licensed under Open source license GPL v3
 *
 *For license refer http://www.gnu.org/copyleft/gpl.html
 *
 */
 /*
 *Overlay Dialog
 *
 *Any dialog can be identified uniquely by the DialogDivID,
 *e,g: "#vui-dialog-template-"+DialogDivID
 *
 */
function VUIDialog(DialogDivID){


    this.setWidth=function(width){
        this.dialog.css('width',width);
    }

    this.setHeight=function(height){
        this.dialog.css('height',height);
    }

    this.setPosition=function(top,bottom,right,left){
        if(top){
            this.dialog.css('top',top+'px');
        }else if(bottom){
            this.dialog.css('bottom',bottom+'px');
        }else{
            this.dialog.css('top',20+'px');
        }
        if(right){
            this.dialog.css('right',right+'px');
        }else if(left){
            this.dialog.css('left',left+'px');
        }else{
            this.dialog.css('left',20+'px');
        }
    }

    this.show=function(){
        this.dialog.css('display','inherit');
    }
    this.hide=function(){
        this.dialog.css('display','none');
    }


    var content=$('#'+DialogDivID);
    var _dialoghtml=$('#'+DialogDivID).html();
    var _width=$('#'+DialogDivID).css('width');
    var _height=$('#'+DialogDivID).css('height');
    $('#'+DialogDivID).remove();
    var _dialog="<div id='vui-dialog-template-"+DialogDivID+"' class='vui-dialog'>\n\
                    <div class='vui-dialog-content'></div></div>";
    $('body').append(_dialog);

    this.dialog=$('#vui-dialog-template-'+DialogDivID);
    var dialog_content=this.dialog.find(".vui-dialog-content");

    dialog_content.html(_dialoghtml);
    this.setWidth(_width);
    this.setHeight(_height);
    this.show();

    $( '#vui-dialog-template-'+DialogDivID ).draggable();

}