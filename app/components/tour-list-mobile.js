import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import Ember from 'ember';

export default Ember.Component.extend(RecognizerMixin, {
    recognizers: 'pan swipe',

    classBindings: ['isOpen:open'],
    up: true,

    actions: {
        open(tours, tour) {
            // Used to set the eirection for exiting.
            this.set('up', true);
            // If the tour clicked is opened, we need to close it.
            if (tour.get('open')) {
                tours.forEach((t) => {
                    // Math the tour that was clicked.
                    if (t === tour) {
                        this.set('up', false);
                        t.setProperties({
                            open: false,
                            classList: 'return'
                        });
                    } else {
                        if (this.get('up')) {
                            t.setProperties({
                                classList: 'return-down'
                            });
                        } else {
                            t.setProperties({
                                classList: 'return-up'
                            })
                        }
                    }
                });
            // Otherwise, we are opeing a tour's description.
            } else {
                tours.forEach((t) => {

                    if (t === tour) {
                        t.setProperties({
                            open: true,
                            classList: 'open'
                        })
                        this.set('up', false);
                    } else {
                        if (this.get('up')) {
                            t.setProperties({classList: 'out-up'});
                        } else {
                            t.setProperties({classList: 'out-down'});
                        }
                    }
                });
            }

        },

        expandBody(e) {
            console.log(e);
        }
    }
});
