import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition(':enter', []),
  transition('* => Home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('0.5s', style({ left: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('0.5s', style({ left: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ right: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('0.5s', style({ right: '100%' }))]),
      query(':enter', [animate('0.5s', style({ right: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
