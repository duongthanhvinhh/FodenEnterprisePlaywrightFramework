import { test as bastTest } from './pom-fixture'
import CommonUtils from '../utils/common-util'


type commonFixtureType = {
    commonUtils: CommonUtils
}
export const test = bastTest.extend<commonFixtureType>({
    commonUtils: async ({}, use) => {
        use(new CommonUtils());
    }
})