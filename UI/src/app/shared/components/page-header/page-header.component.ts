import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {

  hName: string = "";
  loggedIn: boolean = false;
  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.userStatus.subscribe({
      next: (status) => {
        if (status == 'loggedIn') {
          let user = this.apiService.getUserInfo()!;
          this.hName = `${user.firstName} ${user.lastName}`;
          this.loggedIn = true;
        }
        else {
          this.hName = ""
          this.loggedIn = false;
        }
      }
    })
  }



  logout() {
    this.apiService.logout();
  }

  profile()
  {
    this.router.navigateByUrl("/profile");
  }
}
