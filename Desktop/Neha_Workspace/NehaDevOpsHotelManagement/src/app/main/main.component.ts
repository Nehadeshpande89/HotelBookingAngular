import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert.service';
import {AuthenticationService} from '../authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common'
import { IfStmt } from '@angular/compiler';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  serviceArr = [{CML_IMG_PATH :'assets/food.jpg',CML_TITLE : 'Food',CML_DESC : 'Yummy yet traditional food'},
  {CML_IMG_PATH :'assets/spa.jpg',CML_TITLE : 'Spa',CML_DESC : 'Relaxing Spa'},
  {CML_IMG_PATH :'assets/gym-1.jpg',CML_TITLE : 'Gym',CML_DESC : 'Fitness Club'},
  {CML_IMG_PATH:'assets/pool.jpg',CML_TITLE : 'Swimming Pool',CML_DESC : 'Catchy swimming pool'}
];

  serviceArr1=[ {CML_IMG_PATH:'assets/pool.jpg',CML_TITLE : 'Swimming Pool',CML_DESC : 'Catchy swimming pool'},
  {CML_IMG_PATH :'assets/hall9.jpg',CML_TITLE : 'Functional Hall',CML_DESC : 'Special events for special peoples'},
  {CML_IMG_PATH :'assets/games.jpg',CML_TITLE : 'pool',CML_DESC : 'Entertainment'},
  {CML_IMG_PATH:'assets/pool.jpg',CML_TITLE : 'Swimming Pool',CML_DESC : 'Catchy swimming pool'}
 ];

 roomArr=[ {CML_IMG_PATH:'assets/villas.webp',CML_TITLE : 'Villas',CML_DESC : 'Ensuite villas'},
 {CML_IMG_PATH :'assets/ensuiterooms.jpg',CML_TITLE : 'Functional Hall',CML_DESC : 'Ensuite Rooms'},
 {CML_IMG_PATH :'assets/partytent1.jpg',CML_TITLE : 'pool',CML_DESC : 'Tents for parties'},
 {CML_IMG_PATH:'assets/twinrooms.jpg',CML_TITLE : 'Swimming Pool',CML_DESC : 'Twin Rooms'}
];

roomArr1=[ {CML_IMG_PATH:'assets/villas.webp',CML_TITLE : 'Villas',CML_DESC : 'Villas for single person'},
 {CML_IMG_PATH :'assets/ensuiterooms.jpg',CML_TITLE : 'Functional Hall',CML_DESC : 'Ensuite Rooms'},
 {CML_IMG_PATH :'assets/party tents',CML_TITLE : 'pool',CML_DESC : 'Tents for parties'},
 {CML_IMG_PATH:'assets/twinrooms.jpg',CML_TITLE : 'Swimming Pool',CML_DESC : 'Twin Rooms'}
];

  BookingFlag = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  data = [];
  addFlag = false;
  addCustObj : any = {CML_TITLE : ''};
  startDateModel : any;
  endDateModel : any;
  customerInfo : any;
  latest_start_date : any;
  latest_end_date : any;
  editFlag = false;
  bookingId : any;
  mindate = new Date();
  maxDate : any;
  selectedstDate : any;
  selectedendDate : any;

  
  constructor(private http: HttpClient,public datepipe: DatePipe,private formBuilder: FormBuilder) { 
    this.http.get('http://localhost/mypage.php').subscribe(data => {
    this.data.push(data);
    console.log(this.data);
    }, error => console.error(error));

  }

  get f() { return this.registerForm.controls; }


  ngOnInit() {
    console.error("AALA AALA")
    this.registerForm = this.formBuilder.group({
      CustomerName: ['', Validators.required],
      StartDate: ['', Validators.required],
      emaEndDateil: ['', [Validators.required, Validators.email]]
  });
}  

  
  bookingFunc(){
    this.BookingFlag = true;
  }

  refresh()
  {
  this.data.length=0;
   this.http.get('http://localhost/mypage.php').subscribe(data => {
  this.data.push(data);
    console.log(this.data);
    }, error => console.error(error));
  }

  DelteFunc(id){
    var myFormData = new FormData();
    myFormData.append('id', id);
    return this.http.post('http://localhost/mypage.php', myFormData).subscribe((res: Response) => {
    alert("Booking has been deleted successfully.");
    this.refresh();
      
  });
}

  addFunc(){
      this.addFlag = true;
  }

  editFunc(iId,iUpdate,iStDate,iEndDate){
    this.editFlag = true;
    this.customerInfo = iUpdate;
    this.bookingId = iId;
    this.selectedendDate = this.latest_end_date = this.endDateModel = iEndDate;
    this.selectedstDate = this.latest_start_date = this.startDateModel = iStDate;
  }
  
  updateStartDate(iEvent){
    console.log(iEvent)
    this.startDateModel = new Date(iEvent.value);
    this.maxDate = this.startDateModel;
    this.latest_start_date =this.datepipe.transform(this.startDateModel,'yyyy-MM-dd');
  }
  
  updateEndDate(iEvent){
    console.log(iEvent)
    this.endDateModel = new Date(iEvent.value);
    this.latest_end_date =this.datepipe.transform(this.endDateModel,'yyyy-MM-dd');
    
  }

    onSubmit() {
        if (this.customerInfo == '' || this.startDateModel == undefined || this.endDateModel == undefined) {
              alert("Please enter all details");
              return;
        }
        else
        {
        // Initialize Params Object
        if(this.addFlag == true){
        var myFormData = new FormData();
        const headers = new HttpHeaders();
        // Begin assigning parameters
        myFormData.append('CustomerName',this.customerInfo);
        myFormData.append('StartDate', this.latest_start_date);
        myFormData.append('EndDate', this.latest_end_date);
        console.error("Start date",this.latest_start_date);
        console.error('EndDate',this.latest_end_date);
        return this.http.post('http://localhost/mypage.php/'
          , myFormData).subscribe((res: Response) => {
            this.Cancel();
            this.refresh();
          });
        }
        else{
          var myFormData = new FormData();
          myFormData.append('udpateData',this.customerInfo);
          myFormData.append('id', this.bookingId);
          myFormData.append('CustomerName',this.customerInfo);
          myFormData.append('StartDate', this.latest_start_date);
          myFormData.append('EndDate', this.latest_end_date);
          console.error("Start date",this.latest_start_date);
          console.error('EndDate',this.latest_end_date);
          return this.http.post('http://localhost/mypage.php/'
          , myFormData).subscribe((res: Response) => {
            this.Cancel();
            this.refresh();
          });
        }
      } 
        }

    Cancel(){
          this.addFlag = false;
          this.editFlag = false;
          this.startDateModel = undefined;
          this.customerInfo = '';
          this.endDateModel = undefined;
     }
      
    
     backhome()
     {
      this.BookingFlag = false
     }
  
}


     