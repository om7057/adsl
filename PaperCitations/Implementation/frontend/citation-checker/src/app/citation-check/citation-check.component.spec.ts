import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationCheckComponent } from './citation-check.component';

describe('CitationCheckComponent', () => {
  let component: CitationCheckComponent;
  let fixture: ComponentFixture<CitationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitationCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
