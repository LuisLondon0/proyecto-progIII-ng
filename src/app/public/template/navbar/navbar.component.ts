import { Component, OnInit } from '@angular/core';

declare const OpenDropDownParameters: any;
declare const OpenDropDownCount: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.OpenDropDown();
  }


  OpenDropDown(){
    OpenDropDownParameters()
    OpenDropDownCount()
  }

}
