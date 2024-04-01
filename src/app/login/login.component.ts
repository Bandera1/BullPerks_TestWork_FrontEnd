import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
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

  formLogin: FormGroup;
  formRegister: FormGroup;
  aSab: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });

    this.formRegister = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

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

  onSubmitLogin() {
    console.log(this.formLogin.value);

    this.aSab = this.authService
      .login(this.formLogin.value)
      .subscribe((token: any) => {
        console.log('Login succesed, token - ', token);
        this.router.navigate(['/table']);
      }, (err: any) => {
        alert("Wrong credentials");
      });
  }

  onSubmitRegister() {
    console.log(this.formRegister.value);

     this.aSab = this.authService.register(this.formRegister.value).subscribe(
       (token: any) => {
         console.log('Register succesed, token - ', token);
         this.router.navigate(['/table']);
       },
       (err: any) => {
         alert('There is something error');
       }
     );
  }

  ngOnDestroy() {
    if (this.aSab) {
      this.aSab.unsubscribe();
    }
  }

  toogleLoginAnimation(): void {
    $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
  }
}
