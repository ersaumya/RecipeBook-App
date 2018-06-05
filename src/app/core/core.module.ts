import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthIntercepter } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
    declarations:[
        HeaderComponent,
        HomeComponent
    ],
    imports:[
        SharedModule,
        AppRoutingModule
    ],
    exports:[
        AppRoutingModule,
        HeaderComponent
    ],
    providers:[
        ShoppingListService,
        RecipeService,
        DataStorageService,
        AuthService,
        {provide:HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true},
        {provide:HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ]
})
export class CoreModule{

}