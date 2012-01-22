/*
 *Copyright (c) 2012, karthi.m(karthi4all@gmail.com)
 *
 *This source code is licensed under Open source license GPL v3
 *
 *For license refer http://www.gnu.org/copyleft/gpl.html
 *
 */

/*
 *Depency
 *
 *1)control pane area content div should be
 *
 *id="control_panel"
 *
 */


var VISUALUI=(function(){

    function VisualUI(){
        this.controlPanel=null;
        this.objectTrace=null;
        this.currentTarget=null;

        this.activatePicker=function(){
            $("body *").on("mouseover",pickerMoveEventHandler);
            $("body *").on("click",pickerClickEventHandler);
        };

        this.deactivatePicker=function(){
            $("body *").off("mouseover",pickerMoveEventHandler);
        };

        this.showControlPanel=function(){
            this.controlPanel.show();
        };

        this.hideControlPanel=function(){
            this.controlPanel.hide();
        };

        this.init=function(controlPanelContentDivID){
            controlPanelContentDivID=controlPanelContentDivID?controlPanelContentDivID:'control_panel';
            this.objectTrace=new Overlay();
            this.controlPanel=new VUIDialog(controlPanelContentDivID)
            this.controlPanel.show();

            //temp
            this.showControlPanel();
            this.activatePicker();
        };

        function pickerClickEventHandler(e){
            VISUALUI.getInstance().deactivatePicker();
            e.preventDefault();
            return false;
        };

        function pickerMoveEventHandler(e){
            VISUALUI.getInstance().currentTarget = $(e.target);

            //leave control panel div area //not working due to jquery ui
            if(VISUALUI.getInstance().currentTarget.isChildOf('.vui-dialog') || VISUALUI.getInstance().currentTarget.is('.vui-dialog')){
                return false;
            }

            //leave elemet trece box
            if(VISUALUI.getInstance().currentTarget.isChildOf('.outer') ||VISUALUI.getInstance().currentTarget.is('.outer')){
                return false;
            }

            VISUALUI.getInstance().updatePickerStatus();
            return false;
        }

        this.updatePickerStatus=function(){
            var target_id=this.currentTarget.get(0).id? this.currentTarget.get(0).id:"no id";
            var target_class=this.currentTarget.get(0).className? this.currentTarget.get(0).className:"no class";
            var target_title=this.currentTarget.get(0).tagName+"["+target_id+"]";
            var target_style=this.currentTarget.get(0).style? this.currentTarget.get(0).style:"no style";

            //VISUALUI.getInstance().controlPanel.dialog("option","title", target_title );
            $('#target_element_detail').text(this.currentTarget.html());
            $('#cp_class').attr('value',target_class);
            $('#cp_style').attr('value',target_style.cssText);
            $('#cp_id').attr('value',target_id);

            var offset = VISUALUI.getInstance().currentTarget.offset();
            this.objectTrace.render(this.currentTarget.outerWidth(), this.currentTarget.outerHeight(), offset.left, offset.top);
        }

    }

    var instance;

    //emulate static instance
    var _static = {
        name: 'VisualUi',
        //It returns a singleton instance of a singleton object
        getInstance: function (){
            if (instance === undefined) {
                instance = new VisualUI();
            }
            return instance;
        }
    };

    return _static;
})();


function Overlay(width, height, left, top) {

    this.width = this.height = this.left = this.top = 0;

    // outer parent
    var outer = $("<div class='outer' />").appendTo("body");

    // red lines (boxes)
    var topbox    = $("<div />").css("height", 1).appendTo(outer);
    var bottombox = $("<div />").css("height", 1).appendTo(outer);
    var leftbox   = $("<div />").css("width",  1).appendTo(outer);
    var rightbox  = $("<div />").css("width",  1).appendTo(outer);

    // don't count it as a real element
    outer.mouseover(function(){
        outer.hide();
    });
    outer.mouseleave(function(){
        outer.show();
    });


    /**
                 * Public interface
                 */

    this.resize = function resize(width, height, left, top) {
        if (width != null)
            this.width = width;
        if (height != null)
            this.height = height;
        if (left != null)
            this.left = left;
        if (top != null)
            this.top = top;
    };

    this.show = function show() {
        outer.show();
    };

    this.hide = function hide() {
        outer.hide();
    };

    this.render = function render(width, height, left, top) {

        this.resize(width, height, left, top);

        topbox.css({
            top:   this.top,
            left:  this.left,
            width: this.width
        });
        bottombox.css({
            top:   this.top + this.height - 1,
            left:  this.left,
            width: this.width
        });
        leftbox.css({
            top:    this.top,
            left:   this.left,
            height: this.height
        });
        rightbox.css({
            top:    this.top,
            left:   this.left + this.width - 1,
            height: this.height
        });

        this.show();
    };

// initial rendering [optional]
//this.render(width, height, left, top);
}