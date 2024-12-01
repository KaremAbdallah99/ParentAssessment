import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  @Input()showSuccess: boolean = false;
  @Input() name: string = '';
  @Input() userId: number = 0;

  constructor(private userService: UserService){}

  deleteUser() {
    if(this.userId !== 0) {
      this.userService.deleteUserById(this.userId).subscribe((res)=>{
        let btn = document.getElementById('close-delete');
        btn?.click();
        Swal.fire({
          title: 'Success!',
          text: 'User has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {});
      })
    }
  }

}
