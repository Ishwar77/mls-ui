# Logix Insights

#### Previews
- [UI](http://13.127.115.135:8080/logix-insights/)
- [API](https://ilwms-api20210224205036.azurewebsites.net/index.html)

#### Application Environments and Configurations

> App environment variables can be found [here](./app/../src/environments/environment.ts)

Identified Environments:

1. **prod**: Production mode (API is pointed to remote instance)
2. **dev**: Development mode (API is pointed to remote instance)
3. **local**: Local mode (API is pointed to local instance)

#### Building the Project, for different environments

1. General build, verify the API URL defined in [environment.ts](./src/app/../environments/environment.ts)

   ```(shell)
   npm run build
   ```

2. Production friendly build, verify the API URL defined in [environment.prod.ts](./src/app/../environments/environment.prod.ts)

   ```(shell)
   npm run build:prod
   ```

3. Building for Local environment, verify the API URL defined in [environment.local.ts](./src/app/../environments/environment.local.ts)

   ```(shell)
   npm run build:local
   ```

4. Building for Development environment, verify the API URL defined in [environment.dev.ts](./src/app/../environments/environment.environment.dev.ts)

   ```(shell)
   npm run build:dev
   ```

#### How To

1. To update the API URL
   - Go to file [environment.ts](./src/app/../environments/environment.ts) and update the property *apiUrl*, to desired URL

   ```(shell)
   environment.apiUrl = "new_api_url"
   ```

#### Dev Comments
> Globally search of these patterns for more information

- **TODO**, Unfinished or Enhance-able works, that needs to completed before production deployment

- **EXPANDED_TABLE**, references to the implementation of Expanded Table

- **forkJoin**, To make multiple Http requests concurrently and returning all the responses at once, refer [learnrxjs.io](https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin)


#### References

- [UOM](https://www.namm.org/standards/implementation-guide-/codes-tables/unit-measurement-uom-codes)
