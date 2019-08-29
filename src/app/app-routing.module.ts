import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { HomeComponent } from './home/home.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { UploadComponent } from './prescription/upload/upload.component';
import { CustomerAddressComponent } from './prescription/customer-address/customer-address.component';
import { FindStoreComponent } from './prescription/find-store/find-store.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { ForgotPasswordComponent } from './login-and-register/forgot-password/forgot-password.component';
import { RegisterComponent } from './login-and-register/register/register.component';
import { UserLoginComponent } from './login-and-register/user-login/user-login.component';
import { NewcheckoutComponent } from './newcheckout/newcheckout.component';
import { MapComponent } from './newcheckout/map/map.component';
import { UserAddressComponent } from './newcheckout/user-address/user-address.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'non-prescriptions/:parentCat1/:parentCat2/:childCat', component: ProductPageComponent },
  { path: 'search', component: ProductPageComponent },
  { path: 'browse/:title/:id', component: ProductSingleComponent },
  { path: 'upload-prescription', component: PrescriptionComponent },
  { path: 'checkout', component: CheckoutComponent },
  { 
    path: 'newcheckout', component:NewcheckoutComponent,
    children:[
      { path: '', component:UserAddressComponent },
      { path: 'map', component:MapComponent },
    ]  
  },
  
  {
    path: 'account', component: LoginAndRegisterComponent,
    children: [
      { path: 'login', component: UserLoginComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'signup', component: RegisterComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
export const RoutingComponents = [
  HomeComponent,
  ProductPageComponent,
  ProductSingleComponent,
  PageNotFoundComponent,
  UploadComponent,
  CustomerAddressComponent,
  FindStoreComponent,
  PrescriptionComponent,
  CheckoutComponent,
  LoginAndRegisterComponent,
  UserLoginComponent,
  ForgotPasswordComponent,
  RegisterComponent,
  NewcheckoutComponent,
  MapComponent
];
