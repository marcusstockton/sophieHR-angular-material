import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
// using the core Leaflet API directly
import * as L from 'leaflet';
import { marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() lat: any;
  @Input() lng: any;

  private companyMap?: L.Map;
  private companyMarker?: L.Marker;

  public options: any;

  private initMap(): void {
    // create map instance and keep a reference so we can update it later
    this.companyMap = L.map('companyMap').setView([this.lat, this.lng], 17);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.companyMap);

    this.companyMarker = marker([this.lat, this.lng]).addTo(this.companyMap);

    // Force a layout recalculation when the map is created while its container may
    // be hidden or still being laid out (addressing the blank-on-reload issue).
    setTimeout(() => {
      try { this.companyMap?.invalidateSize(); } catch { /* ignore */ }
    }, 0);
  }

  constructor() {
    // Initialize companyMap with a base64 encoded image or fetch it from a service
  }

  ngAfterViewInit(): void {
    // only initialise now if coordinates are already available
    if (this.lat != null && this.lng != null) {
      this.initMap();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // handle late arrival of inputs: create or update map when coords change
    if ((changes['lat'] || changes['lng']) && this.lat != null && this.lng != null) {
      if (!this.companyMap) {
        this.initMap();
        return;
      }

      // update existing map and marker
      try {
        this.companyMap.setView([this.lat, this.lng], this.companyMap.getZoom());
        if (this.companyMarker) {
          this.companyMarker.setLatLng([this.lat, this.lng]);
        } else {
          this.companyMarker = marker([this.lat, this.lng]).addTo(this.companyMap);
        }
        setTimeout(() => this.companyMap?.invalidateSize(), 0);
      } catch { /* ignore transient update errors */ }
    }
  }

  ngOnDestroy(): void {
    if (this.companyMap) {
      this.companyMap.remove();
      this.companyMap = undefined;
    }
  }



}
