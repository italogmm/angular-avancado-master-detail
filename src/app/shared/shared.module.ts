import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from '../pages/categories/categories-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import {RouterModule} from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import {FormFieldErrorComponent} from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {MessageModule} from 'primeng/message';
import {BreadcrumbModule, DropdownModule, MenuItem, ToggleButtonModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    PanelModule,
    MessageModule,
    DropdownModule,
    ToggleButtonModule,
    BreadcrumbModule
  ],
  exports: [
    //shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    PanelModule,
    MessageModule,
    DropdownModule,
    ToggleButtonModule,
    BreadcrumbModule,

    //shared components
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent
  ]
})
export class SharedModule { }
