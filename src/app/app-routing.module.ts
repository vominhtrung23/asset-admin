import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [
//   // {
//   //   path: 'list',
//   //   component: ListComponent,
//   //   children: [
//   //     { path: 'detail', component: DetailComponent },
//   //     { path: 'detail/:id', component: DetailComponent, outlet: 'detail' },
//   //     { path: 'someUrl/:id', component: DetailComponent, outlet: 'popup' }
//   //   ]
//   // },
//   {
//     path: 'profile',
//     loadChildren: './profile/profile.module#ProfileModule'
//   },
//   { path: '', redirectTo: '/list', pathMatch: 'full' }
// ];
const routes: Routes = [
  // { path: 'block', component: EditorSidenavBlockComponent },
  // { path: 'element', component: EditorSidenavElementComponent },
  // { path: 'privacy', component: PrivacyComponent },
  // { path: 'terms', component: TermsComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
