import { dbService, userService } from './service';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

async function createDefaultUserIfNotExist() {
  try {
    let create = await userService.init();
    if (create) {
      console.log('Default user created.'); // eslint-disable-line no-console
    }
  } catch (err) {
    console.log('Initialize default user failed due to error: ' + err); // eslint-disable-line no-console
    process.exit(1);
  }
};

async function testDbConnection() {
  let retryCount = 0
  while (true) {
    try {
      console.log('Testing database connection...'); // eslint-disable-line no-console
      await dbService.testConnection();
      console.log('Database connection is ok'); // eslint-disable-line no-console
      break;
    } catch (err) {
      console.log('Database connection error: ' + err); // eslint-disable-line no-console
      if (retryCount++ > 5) {
        process.exit(1);
      }
      console.log('Wait 1 second and recheck database connection...');
      await delay(1000);
    }
  }
};

async function dbInit() {
  await testDbConnection()
  await createDefaultUserIfNotExist();
}

export default dbInit;
