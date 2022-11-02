import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'telco-frontend';
  isLoading: boolean=false;
  today: Date =new Date();

  constructor(private loadingService: LoadingService, private localStoreService: LocalStorageService){

  }
  ngOnInit(): void {
    this.subscribeToLoading();
  }

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
      console.log(`Is loading değeri: ${isLoading}`)
    });
  }

  startLoading() {
    this.loadingService.startLoading();
  }
  stopLoading() {
    this.loadingService.stopLoading();
  }
  
}
