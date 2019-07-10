import { DataResolverService } from '../app/data-resolver.service'
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'me', loadChildren: './me/me.module#MePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'stickers', loadChildren: './stickers/stickers.module#StickersPageModule' },
  { path: 'create-account', loadChildren: './create-account/create-account.module#CreateAccountPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'search-results/:id', resolve: { special: DataResolverService }, loadChildren: './search-results/search-results.module#SearchResultsPageModule' },  { path: 'display-user', loadChildren: './display-user/display-user.module#DisplayUserPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'modal-page', loadChildren: './modal-page/modal-page.module#ModalPagePageModule' },
  { path: 'display-list', loadChildren: './display-list/display-list.module#DisplayListPageModule' },
  { path: 'display-post', loadChildren: './display-post/display-post.module#DisplayPostPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
