import { Component, OnInit } from '@angular/core';

declare const Carousel: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.playCarousel();
  }

  playCarousel(){
    Carousel()

  }
}
