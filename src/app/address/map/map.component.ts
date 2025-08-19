import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { Icon, icon, latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [LeafletDirective],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() lat: any;
  @Input() lng: any;

  private companyMap: L.Map | L.LayerGroup<any>;

  public options: any;

  private initMap(): void {

    let companyMap = L.map('companyMap').setView([this.lat, this.lng], 17);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(companyMap);
    const marker = L.marker([this.lat, this.lng]).addTo(companyMap);

  }

  constructor() {
    // Initialize companyMap with a base64 encoded image or fetch it from a service
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.companyMap = L.map('companyMap').setView([this.lat, this.lng], 13);

  }



}
