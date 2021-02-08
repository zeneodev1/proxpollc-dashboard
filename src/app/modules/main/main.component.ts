import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../shared/model/user';

const helper = new JwtHelperService();

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public sideMenuExpanded: any;
  public profileExpanded: boolean;
  public notificationsExpanded: boolean;
  public user: User;

  constructor(private router: Router) {
    this.profileExpanded = false;
    this.notificationsExpanded = false;
    this.initSideItems();
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.user = helper.decodeToken<User>(token);
      console.log(this.user);
    } else {
      this.user = new User();
    }
  }

  private initSideItems(): void {
    this.sideMenuExpanded = {
      interfaces: false,
      components: false,
      pages: false
    };
  }

  ngOnInit(): void {
  }

  toggleSideItems(item: string): void {
      this.sideMenuExpanded[item] = !this.sideMenuExpanded[item];
  }

  toggleProfile($event: any): void {
    if (!this.profileExpanded && !this.notificationsExpanded) {
      $event.stopPropagation();
    }
    this.profileExpanded = !this.profileExpanded;
  }

  toggleNotifications($event: any): void {
    if (!this.profileExpanded && !this.notificationsExpanded) {
      $event.stopPropagation();
    }
    this.notificationsExpanded = !this.notificationsExpanded;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any): void {
    if (this.profileExpanded) {
      this.profileExpanded = !this.profileExpanded;
    }
    if (this.notificationsExpanded) {
      this.notificationsExpanded = !this.notificationsExpanded;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
