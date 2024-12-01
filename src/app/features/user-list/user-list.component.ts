import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from "../../modals/add-user/add-user.component";
import { EditUserComponent } from "../../modals/edit-user/edit-user.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteUserComponent } from "../../modals/delete-user/delete-user.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, AddUserComponent, FormsModule, ReactiveFormsModule, EditUserComponent, DeleteUserComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  job: string = '';
  page:number = 2;
  users: any[] = [];
  userAvatar: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  name: string = '';
  isUserGet: boolean = false;
  index: number = -1;
  userId: number = 0;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers(this.page).subscribe((res)=>{
      this.users = res.data;
    })
  }

  getUserById(id: number, event?: any) {
    event?.stopPropagation();
    this.userService.getUserById(id).subscribe((res)=>{
      console.log(res);
      this.userId = res.data.id;
      this.userFirstName = res.data.first_name;
      this.userLastName = res.data.last_name;
      this.name = (this.userFirstName + ' ' + this.userLastName);
      this.userAvatar = res.data.avatar;
    })
  }

  openUserDiv(id: number , i: number) {
    this.getUserById(id);
    this.index = i;
    this.isUserGet = true
  }

  closeUserDiv() {
    this.isUserGet = false;
    this.index = -1;
  }

}
