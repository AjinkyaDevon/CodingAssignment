import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactComponent } from './contact/contact.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
type PathMatch = "full" | "prefix" | undefined;
const appRoutes=[
    {path:"",redirectTo:"/contact",pathMatch:'full' as PathMatch},
    {path:"contact",component:ContactComponent,children:[
        {path:":id",component:ContactDetailComponent}
    ]},
    {path:"edit-contact",component:ContactEditComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRouterModule{

}