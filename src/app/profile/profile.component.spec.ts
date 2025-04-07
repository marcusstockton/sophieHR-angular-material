import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenStorageService } from '../_services/token-storage.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockTokenStorageService: jasmine.SpyObj<TokenStorageService>;

  beforeEach(async () => {
    // Mock TokenStorageService
    mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getToken', 'getUser']);
    mockTokenStorageService.getToken.and.returnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    mockTokenStorageService.getUser.and.returnValue({ id: "1", userName: 'testuser', email: 'test@example.com' });

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule if HttpClient is used
      providers: [
        { provide: TokenStorageService, useValue: mockTokenStorageService } // Provide the mocked TokenStorageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
