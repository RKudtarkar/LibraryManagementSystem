import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UserType } from '../../../models/models';

export interface NavigationItem {
  value: string;
  link: string;
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss'
})
export class PageSideNavComponent {

  panelName: string = ""
  navItems: NavigationItem[] = [];

  constructor(private httpService: ApiService, private router: Router) {
    // this.navItems = [
    //   { value: "Master", link: "master" },
    //   { value: "Setting", link: "setting" }
    // ]

    httpService.userStatus.subscribe({
      next: (status) => {

        if (status == 'loggedIn') {
          router.navigateByUrl("/viewBook");
          console.log(status);
          let user = httpService.getUserInfo();
          if (user != null) {
            if (user.userType == UserType.ADMIN) {
              this.panelName = 'Admin Panel'
              this.navItems = [
                { value: "view books", link: "viewBook" },
                { value: "my orders", link: "my-orders" },
                { value: "User Approvals", link: "approval" },
                { value: "Book Master", link: "maintenance" },
                { value: "Return Book", link: "returnBook" },
                
              ]
            } else if (user.userType == UserType.STUDENT) {
              this.panelName = 'Student Panel'
              this.navItems = [
                { value: "view books", link: "viewBook" },
                { value: "my orders", link: "my-orders" },
                // { value: "UserMaster", link: "userMaster" },
                // { value: "user", link: "user" }

              ]
            }

          }
        } else if (status == 'loggedOff') {
          this.panelName = 'Auth Panel'
          router.navigateByUrl("/login");
          this.navItems = [];
        }
      }
    })


  }




}
