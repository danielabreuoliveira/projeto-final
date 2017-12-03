import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  id = new FormControl('', [Validators.required]);
  
  dataInclusao = new FormControl('', [Validators.required]);
  
  cpf = new FormControl('', [Validators.required,
                             Validators.minLength(11),
                              Validators.maxLength(11)]);
  
  username = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  email = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
                                  Validators.minLength(6),
                                  Validators.maxLength(18)]);

  role = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: this.id,
      dataInclusao: this.dataInclusao,
      cpf: this.cpf,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  setClassUserid() {
    return { 'has-danger': !this.id.pristine && !this.id.valid };
  }
  setClassDataInclusao() {
    return { 'has-danger': !this.dataInclusao.pristine && !this.dataInclusao.valid };
  }
  setClassCpf() {
    return { 'has-danger': !this.cpf.pristine && !this.cpf.valid };
  }
  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('você foi cadastrado!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('dado inserido já cadastrado!', 'danger')
    );
  }
}
