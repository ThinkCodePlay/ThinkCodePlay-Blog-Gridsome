---
title: "Ultimate Angular Cheat Sheet"
date: "2021-07-27"
categories: 
  - "angular"
tags: 
  - "angular"
cover: "/static/from-blog/cover-images/10.png"
---

Welcome to my Ultimate Angular Cheat Sheet. I made this Cheat Sheet so that I could use it for a quick refresher on a topic I forgot, or for a quick reference on common uses cases in an Angular App.

Hope you find this useful. If you find something I should include, or a mistake in my code or explanation, please leave a comment or reach out to me!

## How To Use This Angular Cheat Sheet

This angular cheat sheet covers all the the basics of Angular Core. If you are already familiar with angular and you just want a refresher on a topic, use the Table Of Contents and jump straight to that section. Other wise you can simply start from the beginning.

I tried to keep this angular cheat sheet as simple as can be. Every topic starts with a short explanation followd by the most basic code you need to run it. The reason for this is so that no matter what you use case is, you can simply copy the code and modify it for your use case.

## What Is Angular

Angular is a open source front-end framework for making dynamic single page applications. Angular was created by Google in 2016 and is updated on a regular basis.

## Creating a new project

Create a new project using NPM command line add:

```powershell
ng new <app-name>
```

## Components

Components are angulars building blocks for creating web pages. Components consist of HTML, CSS and a Typescript class.

A component is a TypeScript class. To get Angular to recognize it as a component it must use the **Component** decorator imported from **@angular/core**

Every decorator must contain a **selector** which is what the component will be called in the html, and a **template** or **templateUrl**. To add styles you can add **Styles** or **StylesUrl**.

Add a new Component by typing

```powershell
ng g c <component-name>
```

Here is the basic structure of a component that gets generated:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

## Passing Data

### String Interpolation

String interpolation is a way of dynamically inserting text into an HTML element that is bound to the array item. For instance when looping of an array you can dynamically display the element from the instance specified.

Example:

```typescript
numbers= ['one', 'two', 'three']
```

```markup
<div *ngFor="let number of numbers;">{{number}}</div>
```

### Local Reference

Local Reference is a way of exposing an HTML element to the rest of the DOM (not TypeScript) within the same scope. You Declare the element name by using the '#' symbol.

Example:

```markup
<input type="text" #nameInput />
<button (click)="onSendInput(nameInput)">Send Input</button>
```

```typescript
onSendInput(nameInput: HTMLInputElement): void {
  console.log(nameInput.value);    
}
```

### View Child

View Child is a way of getting access to an HTML element from the components TypeScript code.

It must be imported from **@angular/core**.

```markup
<input type="text" #nameInput />
<button (click)="onSendInput()">Send Input</button>
```

```typescript
import {Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent{
  @ViewChild("nameInput", {static: true}) nameInputRef: ElementRef;

  onSendInput(): void {
    console.log(this.nameInputRef.nativeElement.value);
  }
}
```

The First argument of the view child decorator must be a selector. It can be the name of a local reference or a component type. It will only get the first element it finds.

Important: in Angular 8 you must use **@ViewChild("nameInput", {static: true})** if you want to use view child in ngOnInit. Set **@ViewChild("nameInput", {static: false})** if you don't need it.

In Angular 9+ you only need to set **{static: true}** if you want to use it in ngOnInit. You can omit the static argument if you don't need it in ngOnInit.

### EventEmitter

EventEmitter is a way for a component to trigger events that can be listened to outside of the component.

It must be instantiated with the **@Output** decorator which is imported from **@angular/core**.

Example:

```typescript
import { Component , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() itemSelected = new EventEmitter<string>();

  onSelect(item: string){
    this.itemSelected.emit(item)
  }

}
```

```markup
<app-item (itemSelected)="onSelected($event)"></app-item>
```

```typescript
  loadedItem = '';

  onSelected(item: string) {
    this.loadedItem = item;
  }
```

When doing cross component data transfer it is recommended to use **Subject** instead of the eventEmitter. See Subject in the Observable section.

### Input

To pass data into a component we use the **@Input** decorator imported from **@angular/core**.

Example:

```typescript
import { Component, OnInit } from '@angular/core';
import { Item } from '../Item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent{

  recipes: Item[] = [
    new Item('First'),
    new Item('Second')
  ]

  constructor() { }
}
```

```markup
<div>
  <div *ngFor="let item of items">
    <app-item [item]="item"></app-item>
  </div>
</div>
```

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../item.model';

@Component({
  selector: 'app-item-item',
  templateUrl: './item-item.component.html',
  styleUrls: ['./item-item.component.css']
})
export class ItemComponent {

  @Input() item: Item;
  
  constructor() { }
}
```

```markup
<h1>{{ item.name }}</h1>
```

## Property Binding

Property binding is a way for angular to pass data to a property of an HTML element or component. Property binding is used by adding \[\] square brackets to the property you want to manipulate followed by the element you want to apply to it

Example:

```markup
<img [src]="imageUrl">
```

```markup
<app-recipe-item [recipe]="recipe"></app-recipe-item>
```

## Event Binding

Event binding is a way for angular to trigger an event that was received from the DOM.

It is represented by () parentheses on the event to bind to, and and equals sign telling the event what to trigger.

Example:

```markup
<button (click)="onSelect('clicked')">click me</button>
```

```typescript
onSelect(data: string){
    console.log(data); // prints 'clicked'
}
```

## Directives

There are two types of directive, attribute directives and structural directives.

### Attribute Directives

Attribute directives are tags that are used on HTML elements that effect attributes of that specific element. Here are some examples of the most commons ones:

#### \*ngClass

ngClass is an attribute directive that lets you set a CSS class to the element dynamically.

Example:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  toggleWarning = false;
}
```

```markup
<button (click)="toggleWarning = !toggleWarning">Toggle</button>
<div [ngClass]="{warning: toggleWarning === true}">My Message!</div>
```

```css
.warning {cs
  color: red
}
```

#### \*ngStyle

ngStyle lets you set a style directly on an element.

Example:

```markup
<button (click)="toggleWarning = !toggleWarning">Toggle</button>
<div ngStyle]="{ backgroundColor: toggleWarning === true ? 'blue' : 'transparent' }">My Message!</div>
```

#### Custom attribute directive

You can create your own custom attribute directives for your own specific cases.

You can add a new directive using the CLI:

```
ng g d directives/salmon
```

Basic Example:

```markup
<div appSalmon>I'm Salmon Color</div>
```

Example using **Renderer2**:

```typescript
import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appSalmon]",
})
export class SalmonDirective{
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}


  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "salmon");
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "transparent");
  }
}
```

Example using **@HostBinding**:

```markup
<div appSalmon [userColorPick]="'salmon'">I'm Salmon Color</div>
```

```typescript
import { Directive, HostBinding, HostListener, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appSalmon]",
})
export class salmonDirective implements OnInit {
  @Input() userColorPick: string = "transparent";
  @HostBinding("style.backgroundColor") backgroundColor: string;

  ngOnInit() {
    this.backgroundColor = "transparent";
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroundColor = this.userColorPick;
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroundColor = "transparent";
  }
}
```

And you must add it to you **app.module**:

```typescript
import { hoverDirective } from './directives/salmon.directive';

declarations: [
    AppComponent,
    SalmonDirective
  ]
```

### Structural Directives

Structural directive are are tags that are used on html elements that not only effect attributes of that element but also manipulate the DOM around them.

Note: You can't have more then one structural directives on an element.

All structural directive starting with \* are syntactic sugar, behind the scenes angular creates an <ng-template> element and renders it under the specified conditions (see ng-template).

#### \*ngFor

\*ngFor is a structural directive that lets you loop over an array and displays the items dynamically from the array.

Syntax is:

```markup
<div *ngFor="let <item> of <items>; let i = index"></div>
```

#### \*ngIf

\*ngIf is a conditional structural directive that display the element in the DOM depending on if the condition is met. If the expression interpreted to a Boolean is truthy, the element is display. If the expression is falsie, the element is removed from the DOM.

Example:

```markup
<app-item *ngIf="item === 'bestItem'"></app-item>
```

Using with else statement:

```markup
<app-item *ngIf="item === 'bestItem'; else noItem"></app-item>
<ng-template #noItem>
  <p>No item selected!</p>
</ng-template>
```

#### \*ngSwitch

Example of using ngSwitch:

```markup
<div [ngSwitch]="value">
 <p *ngSwitchCase="1">Option 01</p>
 <p *ngSwitchCase="2">Option 02</p>
 <p *ngSwitchCase="3">Option 03</p>
 <p *ngSwitchCase="4">Option 04</p>
 <p *ngSwitchDefault>Option Default</p>
</div>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = 2;
}
```

#### ng-template

ng-template is an Angular HTML element that by default is not rendered to the DOM. It will be rendered in the DOM only when instructed to do so.

Example:

```markup
<ng-template [ngIf]="item === 'bestItem'">
<p>this is a great paragraph</p>
</ng-template>
```

#### Custom Structural Directive

To create a structural directive you can add a new directive using the CLI:

```
ng g d directives/warning
```

```markup
<button (click)="toggleWarning = !toggleWarning">Toggle</button>
<div *appWarning="toggleWarning">Danger, Will Robinson!</div>
```

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appWarning]",
})
export class WarningDirective {
  @Input() set appWarning(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}
}
```

## Services

A service is simply a TypeScript class that executes tasks. It is instantiated in the class that calls it using dependency injection (DI). In order for angular to recognize it as a service to be injected, it must be listed in the providers part of the decorator.

Angular can use services in 3 different scopes:

1. AppModule - available to the entire project. (root injector) \[recommended!\]
2. AppComponent - available to all components and all its children. (component injector) \[use inly if service is relevant only to component and all it children\]
3. Eager Loaded Modules - Has same effect as adding to AppModule and is available to the entire project. (root injector) \[not recommended\]
4. Lazy Loaded Module - available only in loaded module and will get a separate instance of the service even if module is instantiated in AppModule as well. (child injector) \[use only if you want service to be scoped to this module\]

The service get propagated down to the children (not up to the parents).

Note: In Angular 6+ there is no need to add the service in the providers in AppModule. Instead the **@Injectable({ providedIn: 'root' })** decorator is used.

```typescript
import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemService]
})
export class AppComponent {
  constructor(private itemService: ItemService){}
  this.itemService.addNewItem()
}
```

```typescript
import { NgModule } from '@angular/core';
import { ItemService } from '../services/item.service';

@NgModule({
  declarations: [AppComponent],
  imports: [],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### How to create a new service

To create a new service:

```
ng g s services/item
```

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }
}
```

In order for a service to receive a DI from another service it must contain the **@Injectable** decorator (angular creates this by default with the CLI).

### Dependency Injection

Dependency Injection (DI) is a design pattern that instantiates a singleton class in the class that called it if it does not yet exist,

Examples:

#### Fetching data from the service

```typescript
export class ItemService {
    private items: number[] = [1,2,3,4]
    
      getItems() {
          return this.items.slice(); // sends a copy of the array and not a direct refrence
      }
}
```

```typescript
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {
  items: number[];
  
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }
}
```

#### Cross component communication

```typescript
import { EventEmitter } from "@angular/core";
export class ItemService {
  itemSelected = new EventEmitter<number>();
}
```

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: number

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.item = 2
  }

  onSelected(){
    this.itemService.itemSelected.emit(this.item)
  }

}
```

```typescript
import { Component, OnInit } from '@angular/core';
import { ItemService} from 'src/app/services/recipe.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ItemService]
})
export class ItemsComponent implements OnInit {

  selectedItem: number
  
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.itemSelected.subscribe((item: number) => {
      this.selectedItem = item      
    })
  }

}
```

#### Detecting changes

```typescript
import { EventEmitter } from "@angular/core";
export class ItemService {
  private items: number[] = [1, 2, 3, 4];
  itemsChanged = new EventEmitter<number[]>();

  getItems() {
    return this.items.slice(); // sends a copy of the array and not a direct refrence
  }

  addItems(item: number){
    this.items.push(item);
    this.itemsChanged.emit(this.items.slice());
  }
}
```

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: number

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.item = 2
  }

  onAddItem(){
    this.itemService.addItem(this.item)
  }

}
```

```typescript
import { Component, OnInit } from '@angular/core';
import { ItemService} from 'src/app/services/recipe.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ItemService]
})
export class ItemsComponent implements OnInit {
  items : number[];
  
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items= this.itemService.getItems();
    this.itemService.itemsChanged.subscribe(
      items=> {
        this.items = ingredientsitems
      }
    )
  }
}
```

## Routing

Routing is a way for angular to create a URL path that displays different "pages" (angular is actually a single page application).

Routes get chosen from top to bottom, the first match it finds will be selected. therefore wild cards should be last

Routes get displayd in the DOM by placing the **router-outler** tag.

Basic Example:

```typescript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ItemsComponent } from "./components/items.component";
import { SelectedItemsComponent } from "./components/selected-items.component";
import { NotFoundComponent } from "./components/not-found.component";


const appRoutes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  { path: "items", component: ItemsComponent },
  { path: "selected-items-list", component: SelectedItemsComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

```typescript
import { AppRoutingModule } from './app-routing.module';

imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
```

```markup
<router-outlet></router-outlet>
```

### Child Routes

To use paths as child of a main path (for example all paths that share a common base URL) you can configure it in the app routing module:

```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  { path: "items", component: ItemsComponent, children: [
    { path: ":id", component: SelectedItemsComponent },
  ]}  
];
```

And then add the **router-outlet** to the html of the parent component.

### Path Parameters

you can add parameters to path using ":" symbol in the path of the route.

Example:

```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  { path: "items", component: ItemsComponent },
  { path: "items/:id", component: ItemsComponent }
];
```

### Router Link

Router Link is an html tag you can use to change the URL path. There are several ways to use them:

1. Absolut Path
2. Relative Path

```markup
<!-- Full Path: localhost:4200/items -->
<a routerLink="/items"></a>
<a [routerLink]=['/items']></a>

<!-- Appends this path to current path: localhost:4200/<current-path>/items -->
<a routerLink="items"></a>
<a routerLink="./items"></a>

<!-- Goes up one path from current path and appends to it: localhost:4200/items -->
<a routerLink="../items"></a>
```

To add Style to the route selected (like in a header) use RouterLinkActive.

```markup
<a routerLink="/items" routerLinkActive="yourCssClass"></a

<!-- for exact path use like (and not partial path) -->
<a routerLink="/items" routerLinkActive="yourCssClass" [routerLinkOptions]="{exact: true}"></a
```

To add parameters you can use queryParams:

```markup
<!-- for path: localhost:4200/items/1/description?first=true&second=false#heading -->
a [routerLink]=['/items', 1, "description"] [queryParams]="{first: "true", second: "false"}" [fragment]="heading"></a>
```

### Routing programmatically

To change routes programmatically you must import Router from @angular/router

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router){}

  // naviagte to localhost:4200/items/1/description?firs=true&second=false#heading
  onSelect(id: number){
    this.router.navigate(['/items', id, 'description'], {queryParams: {myQuery: "true", second: "false"}, fragment: "heading"})
  }
}
```

To retrieve the data you can get the snapshot from ActivatedRoute.

#### Subscribe to route changes

To get changes on the route parameter you need to subscribe to it.

Example:

```typescript
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParams.first, this.route.snapshot.queryParams.second);
    console.log(this.route.snapshot.fragment);

    this.route.queryParams.subscribe((first) => {console.log(first)});
    this.route.fragment.subscribe((fragment) => {console.log(fragment)});
  }
}
```

#### Routing options

You can change configuration to the router property.

```typescript
constructor(
private route: ActivatedRoute,
 private router: Router) {}

this.router.navigate(['description', {relativeTo: this.route}] // makes the description path relative to the current path


this.router.navigate(['description', {queryParamsHandling: "preserve" /*"merge"*/}] // what to do with the query parameters
```

### Guards

#### CanActivate

To protect route access from users that are not authorized you can use angulars feature - guards.

a guard is a service that implements the CanActivate interface.

```typescript
import { AuthGuard } from './services/auth-gaurd.service';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
  ...
  providers: [AuthGuard, AuthService],
  ...
})
export class AppModule { }
```

```typescript
export class AuthService {
    private loggedIn = false;

    isAuthenticated(){
        const promise = new Promise(
            (resolve, rej) => { 
                setTimeout(() => {
                    resolve(this.login())
                }, 800)
            }
        )
        return promise;
    }

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }
}
```

```typescript
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
    .then(
        (authenticated : boolean) => {
            if (authenticated) {
                return true
            } else {
                this.router.navigate(['/'])
            }
        }
    )
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
  }
}

```

```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  { path: "items", canActivate: [AuthGuard] /*canActivateChild: [AuthGuard] for all children*/, children: [
    { path: "items/:id", component: ItemsComponent } 
  ]},
];
```

#### CanDeactivate

CanDeactivate works the same like CanActivate only it gets triggers when leaving the route.

```typescript
import { CanDeactivateGaurd } from "./services/can-deactivate-gaurd.service";

@NgModule({
  declarations: [
  ...
  providers: [CanDeactivateGaurd],
  ...
})
export class AppModule { }
```

```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  { path: "items", canDeactivate: [CanDeactivateGaurd], component: ItemsComponent},
];
```

```typescript
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGaurd
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) :  Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
```

```typescript
import { Component } from '@angular/core';
import { CanComponentDeactivate } from "src/app/services/can-deactivate-gaurd.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ItemsComponent implements CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
      return confirm("are you sure you want to leave?")
  }
}
```

#### Passing static data to route

You can pass data to routes using the data option in the route.

```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  { path: "items", component: ItemsComponent },
  { path: "items/:id", component: ItemsComponent, data: {errorMessage: "page not found"}}
];
```

```typescript
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.data["errorMessage"]);
  }
}
```

#### Resolve Guard

To load data before going to the routes components you can use a resolver in your route.

```typescript
import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { ItemService } from "./item.service";

interface Item {
  id: number;
  name: string;
  amount: number;
}

@Injectable()
export class itemResolver implements Resolve<Item> {
  
    constructor(private itemService: ItemService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
      return this.itemService.getItems();
    }
}
```

```typescript
import { itemResolver } from './services/item-resolve.service';

@NgModule({
  declarations: [
  ...
  providers: [itemResolver],
  ...
})
export class AppModule { }
```

```typescript
const appRoutes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  { path: "items", resolve: {item: itemResolver}, component: ItemsComponent},
];
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ItemsComponent implements OnInit {
  
    ngOnInit() {
      this.route.data["item"].subscribe(
        data => {
          console.log(data);        
        }
      )}
}
```

### Lazy Loading

When loading an Angular SPA app by default all modules components and services get loaded when the site is served. This can make the app size to be large and cause slow load time of the site. To help with that we can use Lazy Loading which makes the module be loaded only when we request it. This will make a separate .js file for each module and load it to memory only when the app requests to load it.

Each Module has to bring its own Routing module with it to work.

Example of using Lazy Loading:

```typescript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [{
    path: "items",
    loadChildren: () =>
      import("./components/recipes/items.module").then(
        (m) => m.ItemsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

```typescript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ItemComponent } from "./item.component";

const routes: Routes = [
    { path: "", component: ItemComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemsRoutingModule{

}
```

## Observables

Observables are are reactive functions that perform synchronous or asynchronous tasks for sending streams of data, and follow the observable pattern.

### Creating an observable

When subscribing to an observable you can listen to the **next** event, listen for the **error** event or listen for the **complete** event. When the complete or error event gets fires, the subscription gets unsubscribed automatically and will not listen to any more events from the subscription. If the subscription wasn't cancelled you need to manually cancel it when destroying the component. Otherwise it will keep listening and can cause a memory leak.

Example of creating an observable that fires the complete event after changes 2 seconds:

```typescript
rt { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  ngOnInit() {
    const customIntervalObservrable = new Observable<number>((observer) => {
      let count = 0;
      setInterval(() => {
        if (count === 2) { observer.complete() }
        if (count > 3) { observer.error(new Error("count is greater then 3")) }
        observer.next(count);
        count++;
      }, 1000);
    });

    // subscribe to the event and store it
    this.subscription = customIntervalObservrable.subscribe(
      (data) => {console.log(data)},
      (err) => {console.log(err.message)},
      (complete) => {console.log("completed")}
    );
  }

  // unsubscribe from event when component gets destroyed
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

### Operators

Observable have a pipe method which can be used to do more operations on observable data.

In this example we use 2 pipes, first pipe filters the data to return only positive numbers, that data is passed on to the map operator which loops over all elements in the array and concatenates the text "round: " before.

```typescript
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor() {}

  ngOnInit() {
    const customIntervalObservrable = new Observable<number>((observer) => {
      let count = 0;
      setInterval(() => {
        if (count === 10) { observer.complete()}
        if (count > 11) { observer.error(new Error("count is greater then 3"))}
        observer.next(count);
        count++;
      }, 1000);
    });

    this.subscription = customIntervalObservrable
      .pipe(
        filter((data) => {return data > 0}),
        map((data) => { return "Round: " + (data)})
      )
      .subscribe(
        (data) => { console.log(data)},
        (err) => { console.log(err.message)},
        () => { console.log("completed")}
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

For more operators visit: [https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer#operators](https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer#operators)

### Subjects

Subject is a way of emitting data. It is a recommended wat to use for passing data between components rather then the event emitter.

Example:

```typescript
import { Injectable } from "@angular/core";
import {Subject} from "rxjs"

@Injectable({providedIn: 'root'})
export class ItemService {
    activatedEmitter = new Subject<boolean>();
}
```

```typescript
import { Component} from "@angular/core";
import { ItemService } from "../item.service";

@Component({
  selector: "app-user",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent{

  constructor(private itemService: ItemService) {}

  onActivate() {
    this.itemService.activatedEmitter.next(true);
  }
}
```

```typescript
import { Component, OnInit } from "@angular/core";
import { ItemService } from "./item.service";

import { Subscription } from "rxjs"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isTriggerd = false;
  private sub: Subscription;
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.sub = this.itemService.activatedEmitter.subscribe(
    (didTrigger) => {
      this.isTriggerd = didTrigger;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

## Form

Angular gives us access to many features that make forms much easier to use. There are two approaches to for using forms in angular: **Template Driven** **Forms**, and **Reactive Forms**.

### Template Driven Forms

Template driven is used by putting all the data on the template, hardly any code is done in TypeScript.

Basic example:

```markup
<form (ngSubmit)="onSubmit()" #f="ngForm">
  <div id="user-data">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        class="form-control"
        ngModel
        name="username"
      />
    </div>
    <div class="form-group">
      <label for="email">Mail</label>
      <input
        type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
      />
    </div>
  </div>

  <button type="submit">Submit</button>
</form>
```

```typescript
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm: NgForm;


  onSubmit() {
    console.log(this.signupForm)
    console.log(this.signupForm.value.username);
  }
}
```

#### validation

You can add validator onto the html control using angulars built in validators ([see full list here](https://angular.io/api/forms/Validators)).

```markup
<form (ngSubmit)="onSubmit()" #f="ngForm">
   <div>
      <label for="email">Mail</label>
      <input
        type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
        required
        email
      />
    </div>
    <button type="submit" [disabled]="!f.valid">
       Submit
    </button>
    <span *ngIf="email.invalid && email.touched">email not valid</span>
</form>
```

```css
input.ng-invalid.ng-touched {
  border: 1px solid red;
}
```

#### Default value

You can add a 1 way binding for creating a default data by using square brackets \[\] on ngModel:

```markup
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        class="form-control"
        [ngModel]="'jake'"
        name="username"
      />
```

#### Two way binding

For using two way binding on an element you can use \[()\] on ngModel.

```markup
<label for="username">Username</label>
      <input
        type="text"
        id="username"
        class="form-control"
        [(ngModel)]="myName"
        name="username"
      />
      <label>Your name is: {{myName}}</label>
```

```typescript
export class AppComponent {
  myName = "jake"
}
```

#### Grouping controls

You can group controls together using ngModelGroup:

```markup
<form (ngSubmit)="onSubmit()" #f="ngForm">
  <div ngModelGroup="userData" #userData="ngModelGroup">
    <div >
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        class="form-control"
        ngModel
        name="username"
      />
      <label>Your name is: {{myName}}</label>
    </div>
    <div>
      <label for="email">Mail</label>
      <input
        type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
      />
    </div>
  </div>

  <button type="submit">Submit</button>
</form>
```

#### Setting, patching and reseting values

You can use the **setValue** function to change the entire forms value (including properties not specified):

```typescript
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm: NgForm;

  onClick() {
    this.signupForm.setValue({
      userName: 'jake',
    })
  }
}
```

Use **patchValue** only update values that were specified:

```typescript
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm: NgForm;


  onClick() {
    this.signupForm.form.patchValue({
      userName: 'jake',
    })
  }
}
```

To reset all values you can use the **reset** function:

```typescript
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm: NgForm;
  onReset() {
    this.signupForm.reset()
  }
}
```

### Reactive Forms

Reactive Forms are angular forms that get defined in TypeScript. The most basic building block is the **Form Control**. A form control handles an input field and extra options such as validation, initial values etc. You can group Form controls into a **From Group**, and then evaluate all values in the group together.

In order to use reactive form you need to import it into the appModule:

```typescript
import { ReactiveFormsModule } from '@angular/forms';

...

  imports: [
    ReactiveFormsModule
  ],

```

Basic Form Example:

```markup
<form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
  <input type="text" id="name" formControlName="name"/>
  <input type="number" id="amount" formControlName="amount"/>
</form>
```

```typescript
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl("Jake"),
      amount: new FormControl(5)
    })
  }

  onSubmit(){
    console.log(this.itemForm);
  }
 
}
```

#### Validation

You can add validation by using the second argument in the Form Control intialization:

```typescript
    this.itemForm = new FormGroup({
      name: new FormControl("Jake",[ Validators.required, Validators.max(999)]),
      amount: new FormControl(5, Validators.required),
    });
```

#### Arrays

To add arrays to a form for dynamically adding fields you can use the Form Array type.

```markup
<form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
  <input type="text" id="name" formControlName="name" />
  <input type="number" id="amount" formControlName="amount" />
  <div formArrayName="colors">
    <div *ngFor="let colorCtrl of colors; let i = index">
      <input type="text" [formControlName]="i">
    </div>
  </div>
</form>
```

```typescript
// ...
// same like basic example

import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

// ...

  this.itemForm = new FormGroup({
    name: new FormControl("Jake", [Validators.required, Validators.max(999)]),
    amount: new FormControl(5, Validators.required),
    colors: new FormArray([
      new FormControl("red"),
      new FormControl("green"),
      new FormControl("blue"),
    ]),
  });
```

#### Custom Validators

You can add your own custom validators. a validator is simply a function called by angular.

```typescript
badColors = ["orange"];

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      color: new FormControl("red", this.IllegalColors.bind(this)),
    });

  IllegalColors(control: FormControl): { [s: string]: boolean } {
    if (this.badColors.indexOf(control.value) !== -1) {
      return { badColor: true };
    }
    return null;
  }
```

For Async validators you need to use the third argument in the form control definition:

```typescript
  ngOnInit(): void {
    this.itemForm = new FormGroup({
      color: new FormControl("red", Validators.required, this.IllegalColors.bind(this)),
    });

  IllegalColors(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "orange") {
          resolve({"badColor": true});
        }
        else{
          return null
        }
      }, 3000);
    });
    return promise;
  }
```

#### listening to changes

You can subscribe to changes on the forms status and value changes. It can be applied to form groups and individual controls

```typescript
  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl("Jake", [Validators.required, Validators.max(999)]),
      amount: new FormControl(5, Validators.required)
    });
    this.itemForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
    this.itemForm.statusChanges.subscribe((state) => {
      console.log(state);
    })
  }
```

## Pipes

Pipes are angulars way of changing output of data to the DOM without changing the data itself. It is represented by the ' | ' symbol.

To learn more about pipes you can visit [https://angular.io/api/common#pipes](https://angular.io/api/common#pipes)

```markup
<h1>today is {{today | date }}</h1>
<h2>{{ title | uppercase }}</h2>
```

```typescript
today: Date = new Date();
title: string = "Pipes are the best";
```

For pipe chaining you can add the | after the first pipe

```markup
<h1>today is {{today | date | uppercase }}</h1>
```

### Custom Pipes

To create a new pipe you create a new pipe file you can use the command:

```powershell
ng g p <pipe-name>
```

```typescript
import { PipeTransform } from "@angular/core";

export class cutString implements PipeTransform {
    transform(value: any){
        return value.substr(0,10);
    }
}
```

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "cut"
})
export class CutPipe implements PipeTransform {
    transform(value: any){
        return value.toString().substr(0,3) + "..."
    }
}
```

```markup
<h1>today is {{today | cut }}</h1>
```

To add parameters to a custom pipe you can add the with the ' : ' symbol.

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cut",
})
export class CutPipe implements PipeTransform {
  transform(value: any, length: number) {
    return value.toString().substr(0, length) + " ... ";
  }
}
```

```markup
<h1>today is {{today | cut:5 }}</h1>
```

## filters

you can use pipes as a filter

```markup
<div *ngFor="let day of days | cut:'sun'" >today is {{day}}</div>
```

```typescript
  days: string[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
```

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cut",
})
export class CutPipe implements PipeTransform {
  transform(value: any, notAllowdDay: string) {
    if (value.lengh === 0) {
      return value;
    }

    const days = [];
    for (const day of value) {
      if (day !== notAllowdDay) {
        days.push(day);
      }
    }
    return days;    
  }
}
```

note: when dynamically adding values to the array angular wont automatically listen to the changes because of performance issues since it will calculate every change on the page. You can enforce it by making the pipe pure parameter false.

### Async

If you have data that is async, you can use the async pipe to display the data after the data returned from the promise or observable.

```markup
<div>today is {{day | async}}</div>
```

## Http Request

HttpClientModule is a built in module for angular for sending http requests. Angular sends the http request as an observable so you can subscribe to it.

To send Http requests you need to import it to the NgModule and inject it into the service

```typescript
import { HttpClientModule } from '@angular/common/http'

  imports: [
    HttpClientModule
  ],
```

Basic Service Example:

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ItemService {
  constructor(private http: HttpClient) {}

  postItem(item: Item) {
    this.http.post("https://your-url.com",item).subscribe((response) => {
        console.log(response);
      });
  }
}
```

Or you can return the Observable from the service to the components so that they can subscribe to the http event:

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ItemService {
  constructor(private http: HttpClient) {}

  fetchItems(item: Item): Observable<any>  {
    const itemObs = this.http.get("https://your-url.com",item)
    return itemObs;
  }
}
```

```typescript
 onFetchItem(){
    this.dataStorageService.fetchItems().subscribe((response) => {console.log(response)})
  }
```

## Modules

Modules are a package that includes features that are grouped together to build a angular project or features.

A module is created by adding the **@NgModule** decorator.

ngModule contains 4 key features:

- Declarations- Includes components, directives and custom pipes.
- Imports- Allows to import other modules to this module.
- Providers- Here we define all services to be injected into the module.
- Bootstrap- declares which component starts the app.
- Exports- Allows you to export components from the module so that other modules can communicate with it.

```typescript
@NgModule({
  declarations: [... ],
  imports: [...],
  providers: [...],
  bootstrap: [...],
})
export class AppModule {}
```

Every component is isolated from the other, so even though you import an a module to your main module the module you import will not have access to the main modules imports.

## Angular Cheat Sheet Conclusion

If you found this Angular Cheat Sheet useful please consider sharing, and reach out to me for any comments!

P.S This Angular Cheat Sheet is base on M
