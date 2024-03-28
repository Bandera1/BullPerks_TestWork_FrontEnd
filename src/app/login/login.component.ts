import { Component, ElementRef, ViewChild } from '@angular/core';
console.log(`jQuery version: ${$.fn.jquery}`);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('createAccountButton1')
  createAccountButton1: ElementRef<HTMLInputElement>;
  @ViewChild('createAccountButton2')
  createAccountButton2: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.createAccountButton1.nativeElement.addEventListener(
      'click',
      this.toogleLoginAnimation
    );
     this.createAccountButton2.nativeElement.addEventListener(
       'click',
       this.toogleLoginAnimation
     );
  }

  toogleLoginAnimation(): void {
    $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
  }
}
