import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  @Input()showSuccess: boolean = false;
  userForm :FormGroup = new FormGroup({
    name: new FormControl (null, [Validators.required]),
    job: new FormControl (null, [Validators.required])
   });

   constructor(private userService: UserService){}


   addNewUser(data: FormGroup) {
    if(data.valid) {
      this.userService.addNewUser(data.value).subscribe((res)=>{
        this.showSuccess = true;
        let btn = document.getElementById('close-btn');
        btn?.click();
        Swal.fire({
          title: 'Success!',
          text: 'User has been created successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {});
      })
    }
   }

   resetForm() {
    this.userForm.reset();
   }
}
