import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-newcheckout',
  templateUrl: './newcheckout.component.html',
  styleUrls: ['./newcheckout.component.css']
})
export class NewcheckoutComponent implements OnInit {

 checkAddressForm: FormGroup;


  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    
    var progressBar = {
      Bar : $('#progress-bar'),
      Reset : function(){
      if (this.Bar){
      this.Bar.find('li').removeClass('active'); 
      }
      },
      Next: function(){
      
      $('#progress-bar li:not(.active):first').addClass('active');
      
      },
      Back: function(){
      $('#progress-bar li.active:last').removeClass('active');
      }
      }
      
      progressBar.Reset();
      
      ////
      $("#Next").on('click', function(){
      progressBar.Next();
      })
      $("#Back").on('click', function(){
      progressBar.Back();
      })
      $("#Reset").on('click', function(){
      progressBar.Reset();
      })
  }

  // this.prescriptionAddressForm = this.fb.group({
  //   full_name: ['', Validators.required],
  //   phone: ['', Validators.required],
  //   address: ['', Validators.required],
  //   city: ['', Validators.required],
  //   pincode: ['', Validators.required],
  //   state: ['', Validators.required]
  // });

}
