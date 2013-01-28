# file battleofatlanta/apps/tour/admin.py

from django.contrib import admin

from django_admin_bootstrapped.admin.models import SortableInline, CollapsibleInline

from battleofatlanta.apps.tour.models import Tour, TourStop, TourStopMedia

class TourStopMediaInline(admin.TabularInline, SortableInline):
    model = TourStopMedia
    extra = 1

class TourStopMediaAdmin(admin.ModelAdmin):
    exclude = ('thumbnail',)

class TourStopInline(admin.StackedInline, SortableInline, CollapsibleInline):
    model = TourStop
    extra = 0
    start_collapsed = True

class TourStopAdmin(admin.ModelAdmin):
    inlines = ( TourStopMediaInline, )

class TourAdmin(admin.ModelAdmin):
    inlines = ( TourStopInline, )

admin.site.register(TourStopMedia, TourStopMediaAdmin)
admin.site.register(TourStop, TourStopAdmin)
admin.site.register(Tour, TourAdmin)