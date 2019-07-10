# WatchMutual
steps to run this project
1. Install node.js 

2. Install npm
npm install npm@latest -g

3. Install angular
npm install -g @angular/cli

4. Install prompted dependencies
npm install -g [you dependencies here] --save

5. Ensure cordova is installed
npm install -g cordova ionic

6. nodemon is installed
npm install -g nodemon

7. download the 'cloud_sql_proxy_x64.exe'
and 'pure-pact-243600-4ae975370ed6.json'
and place in a directory easily accessable

8. Open up 2 powershells. in 1, navigate to the directory where 'cloud_sql_proxy_x64.exe' is located, then run the command './cloud_sql_proxy_x64.exe -instances=pure-pact-243600:us-east1:watch-mutual-database=tcp:3306 -credential_file=C:\xxx\xxx\xxx\xxx\pure-pact-243600-4ae975370ed6.json' where the xxx\xxx\xxx\xxx represents the director the 'pure-pact-243600-4ae975370ed6.json' is in. 

9. In the 2nd powershell, cd to the server directory and run the command 'nodemon app.js'. You should now be connected to the database.

10. In powershell, vscode, etc, cd to the WatchMutual directory, and run the 'command ionic serve --lab'

11.questions? 
Email: anthoycL701@aol.com
