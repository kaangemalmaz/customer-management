import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

}
