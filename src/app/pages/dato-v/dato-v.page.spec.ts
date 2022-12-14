import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DatoVPage } from './dato-v.page';

describe('DatoVPage', () => {
  let component: DatoVPage;
  let fixture: ComponentFixture<DatoVPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatoVPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(DatoVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
