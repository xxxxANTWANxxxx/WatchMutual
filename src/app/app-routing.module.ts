import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'me', loadChildren: './me/me.module#MePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'stickers', loadChildren: './stickers/stickers.module#StickersPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
