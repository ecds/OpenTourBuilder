export default function(){
  // Add your transitions here, like:
  this.transition(
    // this.fromRoute('index'),
    this.toRoute('tour.overview'),
    this.use('toLeft'),
    this.reverse('toRight'),
    this.debug()
  );

  this.transition(
    this.fromRoute('tour.overview.index'),
    this.toRoute('tour.overview.map'),
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

  // this.transition(
  //   this.fromRoute('tour.overview.stops'),
  //   this.toRoute('tour.overview.stop'),
  //   this.use('toLeft'),
  //   this.reverse('toRight')
  // );

  this.transition(
    this.fromRoute('tour.overview'),
    this.toRoute('tour.stop'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
