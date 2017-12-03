import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user = {};
  users = [];
  isLoading = true;
  isEditing = false;

  addUserForm: FormGroup;
  id = new FormControl('', Validators.required);
  dataInclusao = new FormControl('', Validators.required);
  cpf = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);


  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.addUserForm = this.formBuilder.group({
      id: this.id,
      dataInclusao: this.dataInclusao,
      cpf: this.cpf,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addUser() {
    this.userService.addUser(this.addUserForm.value).subscribe(
      res => {
        const newUser = res.json();
        this.users.push(newUser);
        this.addUserForm.reset();
        this.toast.setMessage('Item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }
  
  enableEditing(user) {
    this.isEditing = true;
    this.user = user;
  }

  cancelEditing() {
    this.isEditing = false;
    this.user = {};
    this.toast.setMessage('Edição de item cancelado!', 'warning');
    this.getUsers();
  }
  editUser(user) {
    this.userService.editUser(user).subscribe(
      res => {
        this.isEditing = false;
        this.user = user;
        this.toast.setMessage('Item editado com sucesso!', 'success');
      },
      error => console.log(error)
    );
  }
  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => this.toast.setMessage('Usuario deletado com sucesso!', 'success'),
      error => console.log(error),
      () => this.getUsers()
    );
  }
 
}
