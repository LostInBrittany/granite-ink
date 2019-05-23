/*
@license MIT
Copyright (c) 2016 Horacio "LostInBrittany" Gonzalez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from "@polymer/iron-resizable-behavior/iron-resizable-behavior.js";

/*
  `granite-ink` is a webcomponent to hand draw paths on a canvas and get the paths coordinates
  

```html
<granite-ink powered></granite-ink>
```

On a computer with a mouse, path are drawn when the mouse moves inside the canvas while having the button pressed.
Everytime the button is released, current path is ended. When  the button is pressed again, a new path is initiated.

The path data can be obtained via the `paths` variable, or using the `changed` event.
*/

class GraniteInk extends mixinBehaviors([IronResizableBehavior], PolymerElement){

  static get template(){
    return html`
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
      }
      #inputArea {
        width: 100%;
        height: 100%;
      }
    </style>
    <div 
        id="inputArea" 
        on-down="_onDown"
        on-track="_onTrack"
        on-up="_onUp"
        on-mouseenter="_onEntering"
        on-mouseleave="_onLeaving"></div>
      `;
    }


    static get is(){
      return "granite-ink";
    }

    /**
     * Fired when a new point is added to the paths
     *
     * @event changed
     */

    // ***********************************************************************
    // Properties
    // ***********************************************************************

    static get properties() {
      return {
        /** 
         * The coordinates of the paths drawn
         */
        paths: {
          type: Array,
          value: function() {
            return [];
          },
          notify: true,
        },
        /**
         * Set the stroke color
         * @type String
         */
        strokeStyle: {
          type: String,
          value: "#000"
        },
        /**
         * Set the stroke width
         * @type String
         */
        lineWidth: {
          type: Number,
          value: 1
        },

        /**
         * When set to true, the paths are reset and the canvas is emptied, then `reset` is set back to false
         */
        reset: {
          type: Boolean,
          value: false,
          observer: "_onResetChange"
        },

        _canvas: {
          type: Object,
        },

        _context: {
          type: Object,
        },
        /**
         * @type {x: Number, y: Number}
         */
        _position: {
          type: Object,  
          observer: "_onPositionChange",
        },
        _isDrawing: {
          type: Boolean,
          value: false
        }
      }
    }

    // ***********************************************************************
    // Livecycle
    // ***********************************************************************
    ready(){
      super.ready();
      this.addEventListener("iron-resize", function(e){
        this._onResize(e);
      }.bind(this));
    }

    connectedCallback() {
      super.connectedCallback();

      var dimensions = this.$.inputArea.getBoundingClientRect();
      this._canvas = document.createElement('canvas');
      this._canvas.width = dimensions.width;
      this._canvas.height = dimensions.height;
      this.$.inputArea.appendChild(this._canvas);         
      this._context = this._canvas.getContext('2d');

      console.debug("[granite-ink] attached - Canvas created, dimensions:", this._canvas.width, this._canvas.height);

    }


    // ***********************************************************************
    // Event listeners
    // ***********************************************************************

    _onDown(evt, detail) {
      console.debug("[granite-draw-sparkline] _onDown", detail, this.$.inputArea.getBoundingClientRect());  
      evt.preventDefault();
      evt.offsetX = detail.x - this.$.inputArea.getBoundingClientRect().left;
      evt.offsetY = detail.y - this.$.inputArea.getBoundingClientRect().top; 
      this._onDrawStart(evt);
    }

    _onUp(evt, detail) {
      console.debug("[granite-draw-sparkline] _onDown", detail);  
      evt.preventDefault();
      this._onDrawStop(evt);
    }

    _onTrack(evt, detail) {
      console.debug("[granite-draw-sparkline] _onTrack", evt);  
      evt.preventDefault();
      evt.offsetX = detail.x - this.$.inputArea.getBoundingClientRect().left;
      evt.offsetY = detail.y - this.$.inputArea.getBoundingClientRect().top; 
      this._onDraw(evt);     
    }

    _onResetChange() {
      if (!this.reset) {
        return;
      }        
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.width);
      this.reset = false;
    }

    _onPositionChange() {
      this.paths[this.paths.length-1].push(this._position);
      this.fire("changed", this.paths)
      console.debug("[granite-ink] _onPositionChange", this.paths);
    }

    _onResize(e) {
    }

    _onEntering(evt) {
      console.debug("[granite-ink] _onEntering", evt);
      if ((evt.buttons % 2 > 0) || (evt.button == 1) ) {
        this._onDrawStart(evt);
      }
    }

    _onLeaving() {
      console.debug("[granite-ink] _onLeaving");
      this._onDrawStop();  
    }
    

    _onDrawStart(evt) {
      console.debug("[granite-ink] _onDrawStart", evt);
      this._isDrawing = true;   
      this.paths.push([]);
      this._position = { x: evt.offsetX, y: evt.offsetY };

    }
    _onDrawStop() {
      console.debug("[granite-ink] _onDrawStop");
      this._isDrawing = false;  
    }

    _onDraw(evt) {
      if (!this._isDrawing) {
        return;
      }
      // console.debug("[granite-ink] _onDraw", evt);
      this._context.beginPath();
      this._context.moveTo(this._position.x,this._position.y);
      this._context.lineTo(evt.offsetX, evt.offsetY);
      this._context.strokeStyle = this.strokeStyle;
      this._context.lineWidth = this.lineWidth;
      this._context.stroke();
      this._context.closePath();
      this._position = { x: evt.offsetX, y: evt.offsetY };
    }


    _init() {
    }

}
window.customElements.define(GraniteInk.is, GraniteInk);