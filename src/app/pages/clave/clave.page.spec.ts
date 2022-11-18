import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { ClavePage } from './clave.page';

describe('ClavePage', () => {
  let component: ClavePage;
  let fixture: ComponentFixture<ClavePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClavePage ],
      imports: [IonicModule.forRoot()],
      providers:[SQLite, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(ClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
