import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { HiComponent } from './hi/hi.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloComponent, HiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular100days';
}
