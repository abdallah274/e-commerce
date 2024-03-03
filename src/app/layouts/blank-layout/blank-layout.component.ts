import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from 'src/app/component/nav-blank/nav-blank.component';
import {  RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/component/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule,NavBlankComponent , RouterOutlet , FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {

  goUp():void {
    window.scrollTo(0, 0)
  }
  
}
