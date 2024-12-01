import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
   job: string = '';
   @Input() name: string = '';
   @Input() userId: number = 0;
   @Input() userAvatar: string = '';

   constructor(private userService: UserService){}

   ngOnInit(): void {
   }

   updateUser() {
    if(this.name !== '') {
      let data = {
        name: this.name,
        job: this.job
      }
      this.userService.updateUser(this.userId, data).subscribe((res)=>{
        let btn = document.getElementById('edit-btn');
        btn?.click();
        Swal.fire({
          title: 'Success!',
          text: 'User has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {});
      })
    }
   }

   resetForm() {
    this.name = '';
    this.job = '';
   }
}
