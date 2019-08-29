import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';

export let google: any;
declare var $: any;

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  public lat = 28.632430;
  public lng = 77.218790;
  public radiusMap = 300;
  prescription_date: any;
  prescription_photo_name: any;
  tab_buttons = true;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  prescriptionUploadForm: FormGroup;
  prescriptionAddressForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.prescriptionUploadForm = this.fb.group({
      pres_date: ['', Validators.required]
    });
    this.prescriptionAddressForm = this.fb.group({
      full_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required]
    });

    $('.image-preview').css('width', '100%');
  }

  uploadNext(id: any) {
    const cl = '.' + id;
    if ($('a').hasClass('active')) {
      $('a').removeClass('active');
    }
    $(cl).addClass('active');
  }

  uploadFinal(id: any, full_name: any, phone: any, address: any, city: any, pincode: any, selectedState: any) {
    this.tab_buttons = false;
    const cl = '.' + id;
    if ($('a').hasClass('active')) {
      $('a').removeClass('active');
    }
    $(cl).addClass('active');

    console.log(full_name, phone, address, city, pincode, selectedState, this.prescription_date.formatted, this.prescription_photo_name);
  }

  // in app.component.ts
  onFilesAdded(files: File[]) {
    this.prescription_photo_name = files[0].name;
    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        // this content string could be used as an image source
        // or be uploaded to a webserver via HTTP.
        // console.log(content);
      };

    //   use this for basic text files like .txt or .csv
    //  reader.readAsText(file);

      // use this for images
      // reader.readAsDataURL(file);
    });
  }
}
