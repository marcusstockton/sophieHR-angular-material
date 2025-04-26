import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CompanyConfig, CompanyConfigClient } from '../../client';

@Component({
    selector: 'app-company-config',
    standalone: false,
    // imports: [RouterModule, MatButtonModule],
    templateUrl: './company-config.component.html',
    styleUrl: './company-config.component.scss'
})
export class CompanyConfigComponent {
    private _companyId: string;
    companyConfig: CompanyConfig;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private readonly companyConfigService: CompanyConfigClient) { }

    ngOnInit() {
        if (!this._companyId) {
            this.route.params.subscribe(params => {
                this._companyId = params['companyid'];
            });
        }
        this.companyConfigService.getCompanyConfig(this._companyId).subscribe({
            next: (result) => { this.companyConfig = result; },
            error: (err) => { console.error(err); }
        });
    }

    back() {
        this.location.back();
    }
}




