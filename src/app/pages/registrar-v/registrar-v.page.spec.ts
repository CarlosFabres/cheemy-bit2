import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { RegistrarVPage } from './registrar-v.page';

describe('RegistrarVPage', () => {
  let component: RegistrarVPage;
  let fixture: ComponentFixture<RegistrarVPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarVPage ],
      imports: [IonicModule.forRoot()],
      providers:[SQLite, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
