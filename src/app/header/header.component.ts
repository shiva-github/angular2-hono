import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as bootstrap from 'bootstrap';

import { ConfigFunctions } from '../config';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  	(function($){
  		$(document).ready(function(){
  			
  		});
  		
  	}(jQuery));
  }
  logout(){
    ConfigFunctions.setCookie("user","", 0);
  }
  ngOnInit() {
  }

}
