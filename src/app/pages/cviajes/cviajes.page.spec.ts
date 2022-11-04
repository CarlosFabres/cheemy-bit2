import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { CviajesPage } from './cviajes.page';

describe('CviajesPage', () => {
  let component: CviajesPage;
  let fixture: ComponentFixture<CviajesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CviajesPage ],
      imports: [IonicModule.forRoot()],
      providers:[SQLite, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(CviajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
