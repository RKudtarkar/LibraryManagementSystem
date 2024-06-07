import { Component, ElementRef } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AccountStatus, User, UserInfo } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'approval-requests',
  templateUrl: './approval-requests.component.html',
  styleUrl: './approval-requests.component.scss'
})
export class ApprovalRequestsComponent {
  columns: string[] = [
    'userId',
    'userName',
    'email',
    'userType',
    'createdOn',
    'approve',
  ];
users:User[]=[];
  constructor(private apiService:ApiService,private snakbar:MatSnackBar){
      this.apiService.getUsers().subscribe({
        next: (res:User[])=>{
          console.log(res);
          this.users=res.filter(r=>r.accountStatus==AccountStatus.UNAPROOVED)
        }
      });
  }

  approve(user: User) {
    // let id=user.nativeElement.get('id')
    this.apiService.unblock(user.id).subscribe({
      next: (res) => {
        if (res === 'approved') {
          this.snakbar.open(`Approved for ${user.id}`, 'OK');
        } else this.snakbar.open(`Not Approved`, 'OK');
      },
    });
  }

}
