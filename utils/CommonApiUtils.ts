import { APIRequestContext } from "@playwright/test";
import routesApiData from '../data/api-data/routes-data.json'
import CommonUtils from "./CommonUtils";

export default class CommonApiUtils {
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    public async createToken(): Promise<string> {
        const commonUtils = new CommonUtils();
        const decryptedUserName: string = commonUtils.decryptData(commonUtils.getDataFromEnvFile('API_USER_NAME'));
        const decryptedPassword: string = commonUtils.decryptData(commonUtils.getDataFromEnvFile('API_PASSWORD'));
        const createTokenResp = await this.request.post(routesApiData.auth_path, {
            data: {
                "username": decryptedUserName,
                "password": decryptedPassword
            }
        })
        const createTokenJsonResp = await createTokenResp.json();
        return createTokenJsonResp.token;
    }
}