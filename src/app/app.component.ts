import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentSection = 'recipes';

  onNavigate(sectionName: string) {
  	this.currentSection = sectionName;
  }
  
}
