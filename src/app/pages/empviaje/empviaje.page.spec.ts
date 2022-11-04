import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { EmpviajePage } from './empviaje.page';

describe('EmpviajePage', () => {
  let component: EmpviajePage;
  let fixture: ComponentFixture<EmpviajePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpviajePage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //it('should create', () => {
    //expect(component).toBeTruthy();
  //});
});
