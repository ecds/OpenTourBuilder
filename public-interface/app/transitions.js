export default function() {
  // Add your transitions here, like:
  this.transition(
    // this.onInitialRender(),
    this.fromRoute(),
    this.toRoute('tour.overview.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('tour.overview.index'),
    this.toRoute('tour.overview.map'),
    this.use('toUp'),
    this.reverse('toDown')
  );

  this.transition(
    this.fromRoute('tour.stop.index'),
    this.toRoute('tour.stop.map'),
    this.use('toUp'),
    this.reverse('toDown')
  );

  this.transition(
    this.fromRoute('tour.overview.index'),
    this.toRoute('tour.overview.stops'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('tour.overview.map'),
    this.toRoute('tour.overview.stops'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('tour.overview'),
    this.toRoute('tour.stop'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('tour.stop.map'),
    this.toRoute('tour.stop.map.directions'),
    this.use('toUp'),
    this.reverse('toDown')
  );
}
