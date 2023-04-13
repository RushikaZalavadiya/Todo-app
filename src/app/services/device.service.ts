import { Injectable } from "@angular/core";
import { Device } from '@capacitor/device';
import { USER_ID } from "../constants/commonKeys";

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    constructor() {

    }
    async getInfo() {
        const info = await Device.getId();
        console.log(info);
        localStorage.setItem(USER_ID.deviceId, info.uuid);
    }
}