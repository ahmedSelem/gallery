import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AlbumsComponent } from './albums/albums.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, AlbumsComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
