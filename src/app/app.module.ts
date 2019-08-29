import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyDatePickerModule } from 'mydatepicker';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { FilterMinMaxPrice, FilterBrands, Highlight } from './filter.pipe';
import { FilterRangePrice } from './filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material';
import { NewcheckoutComponent } from './newcheckout/newcheckout.component';
import { MapComponent } from './newcheckout/map/map.component';
import { PaymentGatewayComponent } from './newcheckout/payment-gateway/payment-gateway.component';
import { UserAddressComponent } from './newcheckout/user-address/user-address.component';
import { OrderReviewComponent } from './newcheckout/order-review/order-review.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    HeaderComponent,
    FooterComponent,
    FilterMinMaxPrice,
    FilterBrands,
    FilterRangePrice,
    Highlight,
    NewcheckoutComponent,
    MapComponent,
    PaymentGatewayComponent,
    UserAddressComponent,
    OrderReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MyDatePickerModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    NgProgressModule.withConfig({
      spinnerPosition: 'left',
      color: '#FC6262',
      thick: true,
      fixed: true,
      spinner: false
    }),
    NgProgressHttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcF7HvQsGeYoVYKGVHXIFHEACyx3xRGw0'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
