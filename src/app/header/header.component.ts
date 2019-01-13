import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	@Output() sectionSelected = new EventEmitter<string>();

	onSelect(sectionName: string) {
		this.sectionSelected.emit(sectionName);
	}
	
}