import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/passwod_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted:boolean = false;
  returnUrl:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      comfirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]]
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    });

    this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

    get fc()
    {
      return this.registerForm.controls;
    }

    submit()
    {
      this.isSubmitted = true;
      if(this.registerForm.invalid)
      {
        return;
      }

      const user:IUserRegister = {
        name:this.fc['name'].value,
        email:this.fc['email'].value,
        password:this.fc['password'].value,
        comfirmPassword:this.fc['comfirmPassword'].value,
        address:this.fc['address'].value
      }

      this.userService.register(user).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
      })
    }

}
