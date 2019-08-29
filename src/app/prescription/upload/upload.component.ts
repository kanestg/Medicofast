import { Component, OnInit } from '@angular/core';
//import { $ } from 'protractor';
declare var $:any
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.image-preview').css('width','100%');


      //****************** *Date PICKER **************/
      $('#date-time').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        time: false
    });
  }
  // in app.component.ts
onFilesAdded(files: File[]) {
  console.log(files[0].name);
 
  files.forEach(file => {
    const reader = new FileReader();
 
    reader.onload = (e: ProgressEvent) => {
      const content = (e.target as FileReader).result;
 
      // this content string could be used as an image source
      // or be uploaded to a webserver via HTTP.
      //console.log(content);
    };

  //   use this for basic text files like .txt or .csv
  //  reader.readAsText(file);
 
    // use this for images
    // reader.readAsDataURL(file);
  });
}

}
