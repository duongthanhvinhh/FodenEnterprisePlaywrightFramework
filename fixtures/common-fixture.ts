import { test as bastTest } from './pom-fixture'
import CommonUtils from '../utils/CommonUtils'
import CommonApiUtils from '../utils/CommonApiUtils'

type commonFixtureType = {
    commonUtils: CommonUtils,
    commonApiUtils: CommonApiUtils
}
export const test = bastTest.extend<commonFixtureType>({
    commonUtils: async ({}, use) => {
        use(new CommonUtils());
    },
    commonApiUtils: async ({request}, use) => {
        use(new CommonApiUtils(request));
    }
})